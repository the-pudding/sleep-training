<!-- 
<script>
  // import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import worldMap from "$data/world-geojson2.json";
  import { scaleOrdinal } from 'd3-scale';
  import { extent } from 'd3-array';
  import { fade } from "svelte/transition";
  import Tooltip from "$components/article/Tooltip.svelte";

  export let width;
  export let height;
  export let data;
  // export let focusHover;

  const margin = { top: 0, right: 0, bottom: 20, left: -2 };
  let innerWidth = width - margin.right - margin.left;
  let innerHeight = height - margin.top - margin.bottom;

  let nodes = [];
  let hoveredPosition;
  let hovered;
    // $: if (focusHover !== undefined) {
    //     hovered = focusHover;
    // }

  const countryNameAccessor = d => d.properties["NAME"];

  let projection = d3.geoMercator()
      .fitSize([innerWidth, innerHeight], worldMap);

  let pathGenerator = d3.geoPath().projection(projection);

  const colorRange = [
      "#4FB477",
      "#404E4D",
      "#7D82B8"
  ];
  $: positionCategories = Array.from(new Set(data.map(d => d.position)));

  $: colorScale = scaleOrdinal()
      .domain(positionCategories)
      .range(colorRange);

  const simulation = d3.forceSimulation(data)
    .force('x', d3.forceX(d => {
      const [x, y] = pathGenerator.centroid(worldMap.features.find(f => f.properties.NAME === d.country));
      return x;
    }).strength(0.5))
    .force('y', d3.forceY(d => {
      const [x, y] = pathGenerator.centroid(worldMap.features.find(f => f.properties.NAME === d.country));
      return y;
    }).strength(0.5))
    .force('collide', d3.forceCollide(6))
    .on('tick', () => {
      nodes = simulation.nodes();
    });
</script> -->

<script>
  import * as d3 from 'd3';
  import worldMap from "$data/world-geojson2.json";
  import { scaleOrdinal } from 'd3-scale';
  import { extent } from 'd3-array';
  import { fade } from "svelte/transition";
  import Tooltip from "$components/article/Tooltip.svelte";

  export let width;
  export let height;
  export let data;

  const margin = { top: 0, right: 0, bottom: 20, left: -2 };
  let innerWidth = width - margin.right - margin.left;
  let innerHeight = height - margin.top - margin.bottom;
  let nodes = [];
  let hoveredPosition;
  let hovered;

  const countryNameAccessor = d => d.properties["NAME"];

  let projection = d3.geoMercator()
    .fitSize([innerWidth, innerHeight], worldMap);

  let pathGenerator = d3.geoPath().projection(projection);

  const colorRange = [
    "#4FB477",
    "#404E4D",
    "#7D82B8"
  ];

  $: positionCategories = Array.from(new Set(data.map(d => d.position)));
  $: colorScale = scaleOrdinal()
    .domain(positionCategories)
    .range(colorRange);

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
</script>

<div class="map-container" style="width: 100%; height: {height}px;">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <svg width="100%" {height} on:mouseleave={() => (hovered = null)}>
    <g class="map-bounds" transform="translate({margin.left}, {margin.top})">
      {#if pathGenerator}
        <path class="earth" d={pathGenerator({ type: 'Sphere' })} />
        {#each worldMap.features as feature}
          <path class="country" d={pathGenerator(feature)}>
            <title>{countryNameAccessor(feature)}</title>
          </path>
        {/each}
        {#each nodes as node, index}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <circle
            class="node"
            r="5"
            cx={node.x}
            cy={node.y}
            fill={colorScale(node.position)}
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
    <Tooltip data={hovered} {colorScale} {width} />
  {/if}
</div>

<style>
  .map-container {
    background-color: white;
  }

  .earth {
    fill: white;
  }

  .country {
    fill: #ccc;
    stroke: black;
    stroke-width: 0.5px;
  }

  .country:hover {
    fill: #999;
  }

  circle {
        transition: stroke 300ms ease, opacity 300ms ease, cx 100ms ease, cy 100ms ease;
        cursor: pointer;
    }
</style>
