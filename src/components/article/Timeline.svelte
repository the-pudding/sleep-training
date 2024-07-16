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

    let paddingY = 75;

    let yScale = scaleLinear()
      .domain(extent(data.filter(d => d.year > 1980), d => d.year))
      .range([$viewport.height -50, 75]).clamp(true);

    const colorMapping = {
        'Advocate': "#4FB477",
        'No Position': "#D69C2B",
        'Oppose': "#A34131"
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
          yearsToShow = years.filter((year, index) => {
            if (year >= 2000) {
              return year % 2 === 0;
            } else if (year >= 1990) {
              return year % 4 === 0;
            } else {
              return year % 10 === 0;
            }
          });
          }
      })

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="timeline-container" style="width: {$viewport.width}px; height: {$viewport.height}px;">
  <svg height={$viewport.height} width={$viewport.width} >
    <g >
      <line x1={$viewport.width / 2} y1={75} x2={$viewport.width / 2} y2={$viewport.height -50} stroke="white" />
      {#if nodes.length > 0}
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
  <div class="chart-title">
    <h4>Sleep training studies by year of publication</h4>
  </div>
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  .chart-title {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .chart-title h4 {
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