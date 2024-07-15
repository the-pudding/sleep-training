<script>
  import * as d3 from 'd3';
  import worldMap from "$data/world.geo.json";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import viewport from "$stores/viewport.js";

  export let data;

  let nodes = [];
  let pathGenerator;
  let projection;

  const colorMapping = {
        'Advocate': "#4FB477",
        'No Position': "#D69C2B",
        'Oppose': "#A34131"
    };

  $: positionColor = (position) => colorMapping[position] || "#000000";

  onMount(() => {
    projection = d3.geoEqualEarth()
      .fitSize([($viewport.width - 10), $viewport.height], worldMap);

    pathGenerator = d3.geoPath().projection(projection);

    // const simulation = d3.forceSimulation(data)
    //   .force('x', d3.forceX(d => {
    //     const countryCoordinates = {};
    //     worldMap.features.forEach(feature => {
    //       if (feature.properties.LABEL_X && feature.properties.LABEL_Y) {
    //         const [x, y] = projection([feature.properties.LABEL_X, feature.properties.LABEL_Y]);
    //         countryCoordinates[feature.properties.NAME] = [x, y];
    //       }
    //     });
    //     const coordinates = countryCoordinates[d.country];
    //     return coordinates ? coordinates[0] : 0;
    //   }).strength(0.5))
    //   .force('y', d3.forceY(d => {
    //     const countryCoordinates = {};
    //     worldMap.features.forEach(feature => {
    //       if (feature.properties.LABEL_X && feature.properties.LABEL_Y) {
    //         const [x, y] = projection([feature.properties.LABEL_X, feature.properties.LABEL_Y]);
    //         countryCoordinates[feature.properties.NAME] = [x, y];
    //       }
    //     });
    //     const coordinates = countryCoordinates[d.country];
    //     return coordinates ? coordinates[1] : 0;
    //   }).strength(0.5))
    //   .force('collide', d3.forceCollide(6))
    //   .on('tick', () => {
    //     nodes = simulation.nodes();
    //   });
    const simulation = d3.forceSimulation(data)
    .force('x', d3.forceX(d => {
      const countryCoordinates = {};
      worldMap.features.forEach(feature => {
        if (feature.properties.label_x && feature.properties.label_y) {
          const [x, y] = projection([feature.properties.label_x, feature.properties.label_y]);
          countryCoordinates[feature.properties.name] = [x, y];
        }
      });
      const coordinates = countryCoordinates[d.country];
      return coordinates ? coordinates[0] : 0;
    }).strength(0.5))
    .force('y', d3.forceY(d => {
      const countryCoordinates = {};
      worldMap.features.forEach(feature => {
        if (feature.properties.label_x && feature.properties.label_y) {
          const [x, y] = projection([feature.properties.label_x, feature.properties.label_y]);
          countryCoordinates[feature.properties.name] = [x, y];
        }
      });
      const coordinates = countryCoordinates[d.country];
      return coordinates ? coordinates[1] : 0;
    }).strength(0.5))
    .force('collide', d3.forceCollide(6))
    .on('tick', () => {
      nodes = simulation.nodes();
    });
  })
</script>

<div class="map-container" style="width: {$viewport.width}; height: {$viewport.height}px;">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <svg 
    width={$viewport.width}
    height={$viewport.height}
  >
    <g>
      {#if pathGenerator}
        <path class="earth" d={pathGenerator({ type: 'Sphere' })} />
        {#each worldMap.features as feature}
          <path class="country" d={pathGenerator(feature)}>
          </path>
        {/each}
        {#each nodes as node, index}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <circle
            class="node"
            r="5"
            cx={node.x}
            cy={node.y}
            fill={positionColor(node.position)}
            opacity=1
            in:fade={{ delay: index * 10 }}
          />
        {/each}
      {/if}
    </g>
  </svg>
  <div class="chart-title">
    <h4>Sleep training studies by country of publication</h4>
  </div>
</div>

<style>
  .map-container {
    background-color: #1A2E3C;
  }
  .earth {
    fill: #1A2E3C;
  }
  .country {
    stroke: #1A2127;
    fill: white;
    stroke-width: 0px;
    fill-opacity: .2;
    pointer-events: none;
  }
  circle {
    transition: stroke 300ms ease, opacity 300ms ease, cx 100ms ease, cy 100ms ease;
    pointer-events: none;
  }
  .chart-title {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .chart-title h4 {
    font-size: 22px;
    text-align: center;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    text-shadow: -3px -3px 1px rgba(25, 46, 60, 0.4), -3px -2px 1px rgba(25, 46, 60, 0.4), -3px -1px 1px rgba(25, 46, 60, 0.4), -3px 0px 1px rgba(25, 46, 60, 0.4), -3px 1px 1px rgba(25, 46, 60, 0.4), -3px 2px 1px rgba(25, 46, 60, 0.4), -3px 3px 1px rgba(25, 46, 60, 0.4), -2px -3px 1px rgba(25, 46, 60, 0.4), -2px -2px 1px rgba(25, 46, 60, 0.4), -2px -1px 1px rgba(25, 46, 60, 0.4), -2px 0px 1px rgba(25, 46, 60, 0.4), -2px 1px 1px rgba(25, 46, 60, 0.4), -2px 2px 1px rgba(25, 46, 60, 0.4), -2px 3px 1px rgba(25, 46, 60, 0.4), -1px -3px 1px rgba(25, 46, 60, 0.4), -1px -2px 1px rgba(25, 46, 60, 0.4), -1px -1px 1px rgba(25, 46, 60, 0.4), -1px 0px 1px rgba(25, 46, 60, 0.4), -1px 1px 1px rgba(25, 46, 60, 0.4), -1px 2px 1px rgba(25, 46, 60, 0.4), -1px 3px 1px rgba(25, 46, 60, 0.4), 0px -3px 1px rgba(25, 46, 60, 0.4), 0px -2px 1px rgba(25, 46, 60, 0.4), 0px -1px 1px rgba(25, 46, 60, 0.4), 0px 1px 1px rgba(25, 46, 60, 0.4), 0px 2px 1px rgba(25, 46, 60, 0.4), 0px 3px 1px rgba(25, 46, 60, 0.4), 1px -3px 1px rgba(25, 46, 60, 0.4), 1px -2px 1px rgba(25, 46, 60, 0.4), 1px -1px 1px rgba(25, 46, 60, 0.4), 1px 0px 1px rgba(25, 46, 60, 0.4), 1px 1px 1px rgba(25, 46, 60, 0.4), 1px 2px 1px rgba(25, 46, 60, 0.4), 1px 3px 1px rgba(25, 46, 60, 0.4), 2px -3px 1px rgba(25, 46, 60, 0.4), 2px -2px 1px rgba(25, 46, 60, 0.4), 2px -1px 1px rgba(25, 46, 60, 0.4), 2px 0px 1px rgba(25, 46, 60, 0.4), 2px 1px 1px rgba(25, 46, 60, 0.4), 2px 2px 1px rgba(25, 46, 60, 0.4), 2px 3px 1px rgba(25, 46, 60, 0.4), 3px -3px 1px rgba(25, 46, 60, 0.4), 3px -2px 1px rgba(25, 46, 60, 0.4), 3px -1px 1px rgba(25, 46, 60, 0.4), 3px 0px 1px rgba(25, 46, 60, 0.4), 3px 1px 1px rgba(25, 46, 60, 0.4), 3px 2px 1px rgba(25, 46, 60, 0.4), 3px 3px 1px rgba(25, 46, 60, 0.4);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 18px;
    font-family: var(--serif);
    font-weight: 400;
  }
  @media only screen and (max-width: 600px) {
    .chart-title {
      width: 100%;
    }
  }
</style>
