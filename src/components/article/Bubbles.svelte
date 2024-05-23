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
    export let focusHover;
    
    // SETUP
    let nodes = [];
    let hoveredPosition;
    let hovered;
    $: if (focusHover !== undefined) {
        hovered = focusHover;
    }

    const margin = { top: 0, right: 0, bottom: 20, left: 150 };
    $: innerWidth = width - margin.right - margin.left;
    // let innerHeight = height - margin.top - margin.bottom;

    // AXES
    const colorMapping = {
        Advocate: "#4FB477",
        Neutral: "#7D82B8",
        Oppose: "#404E4D"
    };

    $: positionColor = (position) => colorMapping[position] || "#000000";
    $: positions = Array.from(new Set(data.map(d => d.position)));

    $: radiusScale = scaleSqrt()
        .domain(extent(data, d => d.radius)) 
        .range([Math.min(innerWidth / 20, 4), Math.min(innerWidth / 12, 18)]);
    
    $: xScaleGrouped = scaleBand()
        .domain(positions)
        .range([0, innerWidth])
        .paddingInner(0.2)
        .paddingOuter(0);

    // FORCE SIMULATION
    let simulation = forceSimulation(data)
        .on("tick", () => {
            nodes = simulation.nodes();
        });

    $: {
        simulation.nodes(data)
            .force("x", forceX().x(d => (xScaleGrouped(d.position))))
            .force("y", forceY(height / 2).strength(1))
            .force("collide", forceCollide().radius(d => radiusScale(d.radius) + 1))
            .alpha(1)
            .restart();
    }
</script>

<Legend {positionColor} {colorMapping} {data} bind:hoveredPosition />
<div class="bubbles-container" bind:clientWidth={width}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <svg {width} {height} on:mouseleave={() => (hovered = null)}>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <g class="inner-bubbles" transform="translate({margin.left}, {margin.top})">
        {#each nodes as node, index}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <circle
                cx={node.x}
                cy={node.y}
                r={radiusScale(node.radius)}
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
</style>