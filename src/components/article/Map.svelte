<script>
  import * as d3 from 'd3';
  import worldMap from "$data/world-geojson2.json";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import Tooltip from "$components/article/Tooltip.svelte";
  import viewport from "$stores/viewport.js";

  export let width;
  export let data;

  const margin = { top: 0, right: 0, bottom: 20, left: -2 };
  $: innerWidth = $viewport.width - margin.right - margin.left;
  $: innerHeight = $viewport.height - margin.top - margin.bottom;
  let nodes = [];
  let hoveredPosition;
  let hovered;
  let pathGenerator;
  let projection;

  $: console.log("map height", innerHeight)

  const colorMapping = {
        Advocate: "#4FB477",
        Neutral: "#7D82B8",
        Oppose: "#404E4D"
    };

  $: positionColor = (position) => colorMapping[position] || "#000000";


    onMount(() => {
      projection = d3.geoMercator()
        .fitSize([innerWidth, innerHeight], worldMap);

      pathGenerator = d3.geoPath().projection(projection);

      const simulation = d3.forceSimulation(data)
        .force('x', d3.forceX(d => {
          const countryCoordinates = {};
          worldMap.features.forEach(feature => {
            if (feature.properties.LABEL_X && feature.properties.LABEL_Y) {
              const [x, y] = projection([feature.properties.LABEL_X, feature.properties.LABEL_Y]);
              countryCoordinates[feature.properties.NAME] = [x, y];
            }
          });
          const coordinates = countryCoordinates[d.country];
          return coordinates ? coordinates[0] : 0;
        }).strength(0.5))
        .force('y', d3.forceY(d => {
          const countryCoordinates = {};
          worldMap.features.forEach(feature => {
            if (feature.properties.LABEL_X && feature.properties.LABEL_Y) {
              const [x, y] = projection([feature.properties.LABEL_X, feature.properties.LABEL_Y]);
              countryCoordinates[feature.properties.NAME] = [x, y];
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

<div class="map-container" style="width: 100%; height: {$viewport.height}px;">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <svg 
    width={$viewport.width}
    height={$viewport.height} 
    on:mouseleave={() => (hovered = null)}
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
            fill={hovered === node ? "#81A0DD" : positionColor(node.position)}
            opacity={hovered || hoveredPosition
                ? hovered === node || hoveredPosition === node.position
                    ? 1
                    : 0.3
                : 1}
            on:mouseover={() => (hovered = node)}
            on:focus={() => (hovered = node)}
            in:fade={{ delay: index * 10 }}
          />
        {/each}
      {/if}
    </g>
  </svg>
  {#if hovered}
    <Tooltip data={hovered} {width} />
  {/if}
</div>

<style>
  .map-container {
    background-color: #F4F4F9;
  }
  .earth {
    fill: #F4F4F9;
  }
  .country {
    fill: #F4F4F9;
    stroke: black;
    stroke-width: 0.5px;
    pointer-events: none;
  }
  circle {
    transition: stroke 300ms ease, opacity 300ms ease, cx 100ms ease, cy 100ms ease;
    cursor: pointer;
  }
</style>
