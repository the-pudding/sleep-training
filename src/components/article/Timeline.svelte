<script>
    import { forceSimulation, forceY, forceX, forceCollide } from 'd3-force';
    import { scaleLinear } from 'd3-scale';
    import { extent } from 'd3-array';
    import { fade } from "svelte/transition";
    import { getContext, onMount } from 'svelte';
  
    export let height;
    export let width;

    let data = getContext("data").studies
    let nodes = [];
    let margin = { top: 20, right: 20, bottom: 20, left: 40 };
  
    $: innerHeight = height - margin.top - margin.bottom;
    $: innerWidth = width - margin.left - margin.right;
  
    $: yScale = scaleLinear()
      .domain(extent(data, d => d.year))
      .range([innerHeight, 0]);

   // FORCE SIMULATION
   let simulation;
    onMount(() => {
    setTimeout(() => {
        // FORCE SIMULATION
        simulation = forceSimulation(data)
        .on("tick", () => {
            nodes = simulation.nodes();
        });

        simulation.nodes(data)
        .force('x', forceX(innerWidth / 2))
        .force('y', forceY(d => yScale(d.year)).strength(0.5))
        .force('collide', forceCollide(10))
        .alpha(1)
        .restart();
    }, 3000); // Adjust the timeout duration as needed
    });

    $: years = [...new Set(data.map(d => d.year))];
</script>

<svg {width} {height}>
  <g transform="translate({margin.left},{margin.top})">
    <line x1={innerWidth / 2} y1="0" x2={innerWidth / 2} y2={innerHeight} stroke="black" />
    {#each nodes as node, index}
      <circle
        cx={node.x}
        cy={node.y}
        r="5"
        fill="steelblue"
        in:fade={{ delay: index * 10 }}
      />
    {/each}
    {#each years as year}
      <g class="tick" transform="translate({innerWidth / 2},{yScale(year)})">
        <line x1={0} x2={10} />
        <text x={15} y={5}>{year}</text>
      </g>
    {/each}
  </g>
</svg>