<script>
    import { forceSimulation, forceY, forceX, forceCollide } from 'd3-force';
    import { scaleLinear } from 'd3-scale';
    import { extent } from 'd3-array';
    import { fade } from "svelte/transition";
    import { getContext, onMount } from 'svelte';
    import viewport from "$stores/viewport.js";

    // TIMELINE DATA
    let dataContext = getContext("data").studies;
    let data = dataContext.map(d => Object.assign({}, d));

    let nodes = [];
    let years;
    let yearsToShow;

    // let margin = { top: 20, right: 20, bottom: 20, left: 40 };
    // $: innerHeight = $viewport.height - margin.top - margin.bottom;
    // $: innerWidth = $viewport.width - margin.left - margin.right;

    let yScale = scaleLinear()
      .domain(extent(data.filter(d => d.year > 1990), d => d.year))
      .range([$viewport.height, 0]);

    const colorMapping = {
        Advocate: "#4FB477",
        Neutral: "#D69C2B",
        Oppose: "#A34131"
    };
    $: positionColor = (position) => colorMapping[position] || "#000000";

    onMount(() => {
        if (data) {
          let simulation = forceSimulation(data)
          .on("tick", () => {
              nodes = simulation.nodes();
          });

        simulation.nodes(data)
          .force('x', forceX(($viewport.width / 2) - 50))
          .force('y', forceY(d => yScale(d.year)).strength(0.5))
          .force('collide', forceCollide(6))
          .alpha(1)
          .restart();

          years = [...new Set(data.map(d => d.year))];
          yearsToShow = years.filter((year) => year % 2 === 0);
        }
    })

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="timeline-container" style="width: {$viewport.width}; height: {$viewport.height}px;">
  <svg height={$viewport.height} width={$viewport.width} >
    <g  style="margin-top: 20px;">
      <line x1={$viewport.width / 2} y1="0" x2={$viewport.width / 2} y2={$viewport.height} stroke="white" />
      {#if nodes.length > 80}
        {#each nodes as node, index}
          <circle
            cx={node.x}
            cy={node.y}
            r="5"
            fill={positionColor(node.position)}
            opacity=1
            in:fade={{ delay: index * 10 }}
          />
        {/each}
        {#each yearsToShow as year}
          <g class="tick" transform="translate({$viewport.width / 2},{yScale(year)})">
            <line x1="-8" y1="0" x2="8" y2="0" stroke="white" stroke-width="2px" />
            <text x="40" y="5" fill="white" text-anchor="middle">{year}</text>
          </g>
        {/each}
      {/if}
    </g>
  </svg>
</div>

<style>
    circle {
      transition: stroke 300ms ease, opacity 300ms ease, cx 100ms ease, cy 100ms ease;
      pointer-events: none;
    }
    text {
      font-family: "Atlas Grotesk";
      font-weight: 400;
      font-size: 12px;
    }
</style>