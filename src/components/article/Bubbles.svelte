<script>
    import { forceSimulation, forceY, forceX, forceCollide } from 'd3-force';
    import { scaleLinear, scaleSqrt, scaleOrdinal, scaleBand } from 'd3-scale';
    import { extent } from 'd3-array';
    import { fade } from "svelte/transition";
    import Legend from "$components/article/Legend.svelte";
    import Tooltip from "$components/article/Tooltip.svelte";

    // IMPORT FROM PARENT
    export let data;
    export let width;
    export let height;
    export let currentStep;
    
    // VARIABLES
    const margin = { top: 0, right: 0, bottom: 20, left: 0 };
    $: innerWidth = width - margin.right - margin.left;
    // let innerHeight = height - margin.top - margin.bottom;
    let nodes = [];
    let hovered;
    let hoveredPosition;
    let groupByPosition = false;

    // FORCE SIMULATION SETUP
    let simulation = forceSimulation(data)
        .on("tick", () => {
            nodes = simulation.nodes();
        });

    $: radiusScale = scaleSqrt()
        .domain(extent(data, d => d.participants))
        .range(width < 568 ? [2, 20] : [8, 40]);

    // Width adjustment for radii
    $: maxRadius = Math.max(...data.map(d => radiusScale(d.participants)));
    $: adjustedWidth = innerWidth - maxRadius * 2;

    $: xScale = scaleLinear()
        .domain(extent(data, d => d.year))
        .range([maxRadius, adjustedWidth]);

    $: xScaleGrouped = scaleBand()
        .domain(["Advocate", "Neutral", "Oppose"])
        .range([maxRadius, adjustedWidth])
        .paddingInner(0)
        .paddingOuter(0);

    const colorRange = [
        "#4FB477",
        "#404E4D",
        "#7D82B8"
    ];

    let colorScale = scaleOrdinal()
        .domain(["Advocate", "Neutral", "Oppose"])
        .range(colorRange);

    $: {
        simulation.nodes(data)
            .force("x", forceX().x(d => (groupByPosition ?  xScaleGrouped(d.position) : xScale(d.year))).strength(0.8))
            .force("y", forceY(height / 2).strength(1))
            .force("collide", forceCollide().radius(d => radiusScale(d.participants) + 1))
            .alpha(1) // Reset alpha when data changes to ensure movement
            .restart();
    }

    $: {
        if (currentStep >= 0 && currentStep <= 1) {
        groupByPosition = false;
        hovered = null;
        } else if (currentStep > 1 && currentStep <= 2) {
        groupByPosition = true;
        hovered = null;
        } else {
        groupByPosition = false;
        setTimeout(() => {
            hovered = data[13];
        }, 1000);
        }
    }

</script>

<Legend {colorScale} bind:hoveredPosition />
<div class="bubbles-container" bind:clientWidth={width}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <svg {width} {height}
    on:mouseleave={() => 
        (hovered = null)}
    >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <g 
            class="inner-bubbles" 
            transform="translate({margin.left}, {margin.top})"
        >
            {#each nodes as node, index}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <circle
                    cx={node.x}
                    cy={node.y}
                    r={radiusScale(node.participants)} 
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
        </g>
    </svg>
    {#if hovered}
        <Tooltip data={hovered} {colorScale} {width}
        />
    {/if}
</div>

<style>
    circle {
    transition: stroke 300ms ease, opacity 300ms ease, cx 100ms ease, cy 100ms ease;
    cursor: pointer;
  }
</style>

<!-- BIN -->
<!-- <div class="sorting"
on:click={() => {groupByPosition = !groupByPosition}} 
>
SORT
</div> -->