<script>
    import { forceSimulation, forceY, forceX, forceCollide } from 'd3-force';
    import { scaleLinear } from 'd3-scale';
    import { extent } from 'd3-array';
    import { fade } from "svelte/transition";
    import { getContext } from 'svelte';
    import Tooltip from "$components/article/Tooltip.svelte";
  
    export let height;
    export let width;

    // TIMELINE DATA
    let dataContext = getContext("data").studies;
    let data = dataContext.map(d => Object.assign({}, d));

    let nodes = [];
    let hoveredPosition;
    let hovered;

    let margin = { top: 20, right: 20, bottom: 20, left: 40 };
  
    $: innerHeight = height - margin.top - margin.bottom;
    $: innerWidth = width - margin.left - margin.right;
  
    $: yScale = scaleLinear()
      .domain(extent(data, d => d.year))
      .range([innerHeight, 0]);

    const colorMapping = {
        Advocate: "#4FB477",
        Neutral: "#7D82B8",
        Oppose: "#404E4D"
    };

    $: positionColor = (position) => colorMapping[position] || "#000000";

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
<div class="timeline-container" bind:clientWidth={width}>
  <svg {width} {height} on:mouseleave={() => (hovered = null)}>
    <g transform="translate({margin.left},{margin.top})">
      <!-- <line x1={innerWidth / 2} y1="0" x2={innerWidth / 2} y2={innerHeight} stroke="black" /> -->
      {#if nodes}
        {#each nodes as node, index}
          <circle
            cx={node.x}
            cy={node.y}
            r="5"
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
        {#each yearsToShow as year}
          <g class="tick" transform="translate({innerWidth / 2},{yScale(year)})">
            <line x1="-8" y1="0" x2="8" y2="0" stroke="black" stroke-width="2px" />
            <text x="0" y="15" text-anchor="middle">{year}</text>
          </g>
        {/each}
      {/if}
    </g>
  </svg>
  {#if hovered}
      <Tooltip data={hovered} {width} />
  {/if}
</div>

<style>
    circle {
        transition: stroke 300ms ease, opacity 300ms ease, cx 100ms ease, cy 100ms ease;
        cursor: pointer;
    }
    text {
      font-family: "Atlas Grotesk";
      font-weight: 400;
      font-size: 12px;
    }
</style>