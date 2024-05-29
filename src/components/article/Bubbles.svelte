<script>
    import { forceSimulation, forceY, forceX, forceCollide } from 'd3-force';
    import { scaleSqrt, scaleBand, scaleLinear } from 'd3-scale';
    import { extent } from 'd3-array';
    import { fade } from "svelte/transition";
    import { getContext, onMount } from 'svelte';
    import { fly } from 'svelte/transition'
    
    import Legend from "$components/article/Legend.svelte";
    import Tooltip from "$components/article/Tooltip.svelte";

    // SVG WIDTH ASSIGNMENT NOT WORKING, G CENTERING NOT WORKING

    // IMPORT FROM PARENT
    export let data;
    export let height;
    export let focusHover;

    let viewportWidth;

    $: width = viewportWidth * 0.75;
    
    // SETUP
    let nodes = [];
    let hoveredPosition;
    let hovered;
    let mounted = false;;
    let positions;
    let xScaleGrouped;
    let dataLength = 0;
    $: if (focusHover !== undefined) {
        hovered = focusHover;
    }

    function getRange(data){
        if(data[0].type == "reddit"){
            return [5,20]
        } else if (data[0].type == "study" || data[0].type == "article") {
            return [6,30];
        }
        else if (data[0].type == "instagram") {
            return [8,40];
        }
        return [6,22];
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

    $: radiusScale = scaleLinear()
                .domain(extent(data, d => d.radius)) 
                .range(getRange(data)).clamp(true);
    

    function positionColor(position){
        return colorMapping[position] || "#000000";
    }

    $: data, rerunSimulation();

    function rerunSimulation(){
        if(mounted && dataLength !== data.length){

            console.log("re-running simulation")

            let dataToSimulate = data.map(d => d);
            dataLength = dataToSimulate.length;

            positions = Array.from(new Set(dataToSimulate.map(d => d.position)));

            let simulation = forceSimulation(dataToSimulate)
                .on("tick", () => {
                    nodes = simulation.nodes();
                });

            xScaleGrouped = scaleBand()
                .domain(positions)
                .range([0, innerWidth])
                .paddingInner(0.3)
                .paddingOuter(0.4);

            simulation.nodes(dataToSimulate)
                .force("x", forceX().x(d => {
                    return xScaleGrouped(d.position)
                }))
                .force("y", forceY(height / 2).strength(1))
                .force("collide", forceCollide().radius(d => radiusScale(d.radius) + 1))
                .alpha(1)
                .restart();
        }
    }

    onMount(() => {
        mounted = true;
    })
</script>


<svelte:window bind:innerWidth={viewportWidth} />
<!-- <h1 transition:fly>re-entering</h1> -->
<div class="chart-container">
    <Legend {positionColor} {colorMapping} {data} bind:hoveredPosition />
    <div class="bubbles-container" style="width: {width}px; margin: 0 auto;">
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
</div>

<style>
    .bubbles-container {
        overflow: visible;
    }
    circle {
        transition: stroke 300ms ease, opacity 300ms ease, cx 100ms ease, cy 100ms ease;
        cursor: pointer;
    }
</style>