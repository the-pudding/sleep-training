<script>
    import { forceSimulation, forceY, forceX, forceCollide } from 'd3-force';
    import { scaleLinear, scaleOrdinal } from 'd3-scale';
    import { extent } from 'd3-array';
    import { fade } from "svelte/transition";
    import Tooltip from "$components/article/Tooltip.svelte";
  
    export let height;
    export let width;
    export let data;

    let nodes = [];
    let hoveredPosition;
    let hovered;
    // $: if (focusHover !== undefined) {
    //     hovered = focusHover;
    // }
    let margin = { top: 20, right: 20, bottom: 20, left: 40 };
  
    $: innerHeight = height - margin.top - margin.bottom;
    $: innerWidth = width - margin.left - margin.right;
  
    $: yScale = scaleLinear()
      .domain(extent(data, d => d.year))
      .range([innerHeight, 0]);

    const colorRange = [
        "#4FB477",
        "#404E4D",
        "#7D82B8"
    ];
    $: positionCategories = Array.from(new Set(data.map(d => d.position)));

    $: colorScale = scaleOrdinal()
        .domain(positionCategories)
        .range(colorRange);


    // FORCE SIMULATION
    let simulation = forceSimulation(data)
        .on("tick", () => {
            nodes = simulation.nodes();
        });

    
    $: {
        simulation.nodes(data)
            .force('x', forceX((innerWidth / 2) - 50))
            .force('y', forceY(d => yScale(d.year)).strength(0.5))
            .force('collide', forceCollide(6))
            .alpha(1)
            .restart();
    }

    $: years = [...new Set(data.map(d => d.year))];
    $: yearsToShow = years.filter((year) => year % 2 === 0);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg {width} {height} on:mouseleave={() => (hovered = null)}>
  <g transform="translate({margin.left},{margin.top})">
    <!-- <line x1={innerWidth / 2} y1="0" x2={innerWidth / 2} y2={innerHeight} stroke="black" /> -->
    {#each nodes as node, index}
      <circle
        cx={node.x}
        cy={node.y}
        r="5"
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
    {#each yearsToShow as year}
      <g class="tick" transform="translate({innerWidth / 2},{yScale(year)})">
        <line x1="-8" y1="0" x2="8" y2="0" stroke="black" stroke-width="2px" />
        <text x="0" y="15" text-anchor="middle">{year}</text>
        <!-- <line x1={0} x2={10} />
        <text x={15} y={5}>{year}</text> -->
      </g>
    {/each}
  </g>
</svg>
{#if hovered}
    <Tooltip data={hovered} {colorScale} {width} />
{/if}

<style>
    circle {
        transition: stroke 300ms ease, opacity 300ms ease, cx 100ms ease, cy 100ms ease;
        cursor: pointer;
    }
    text {
      font-family: "National 2 Web";
      font-weight: 400;
      font-size: 12px;
    }
</style>