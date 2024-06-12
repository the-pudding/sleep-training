<script>
    import { forceSimulation, forceY, forceX, forceCollide } from 'd3-force';
    // import { forceCluster } from 'd3-force-cluster'
    import { scaleBand, scaleLinear } from 'd3-scale';
    import { extent } from 'd3-array';
    import { fade } from "svelte/transition";
    import { onMount } from 'svelte';
    
    import Legend from "$components/article/Legend.svelte";
    import RadiusLegend from '$components/article/RadiusLegend.svelte';
    import Tooltip from "$components/article/Tooltip.svelte";

    // SVG WIDTH ASSIGNMENT NOT WORKING, G CENTERING NOT WORKING

    // IMPORT FROM PARENT
    export let data;
    export let height;
    export let focusHover;
    
    // SETUP
    let viewportWidth;
    $: width = viewportWidth * 0.75;
    let nodes = [];
    let hoveredPosition;
    let hovered;
    let mounted = false;;
    let positions;
    let scaleValues;
    let xScaleGrouped;
    let dataLength = 0;

    const margin = { top: 0, right: 0, bottom: 20, left: 150 };
    $: innerWidth = width - margin.right - margin.left;
    // let innerHeight = height - margin.top - margin.bottom;

    $: if (focusHover !== undefined) {
        hovered = focusHover;
    }

    // SCALES
    // RADIUS SCALE
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

    $: radiusScale = scaleLinear()
                .domain(extent(data, d => d.radius)) 
                .range(getRange(data)).clamp(true);

    $: if (radiusScale) {
        scaleValues = {
            largest: radiusScale.range()[1],
            smallest: radiusScale.range()[0],
            median: (radiusScale.range()[1] + radiusScale.range()[0]) / 2
        };
    }
    
    // COLOR SCALE
    const colorMapping = {
        Advocate: "#4FB477",
        Neutral: "#7D82B8",
        Oppose: "#404E4D"
    };
    
    function positionColor(position){
        return colorMapping[position] || "#000000";
    }


    // const clusterCenters = positions.map((position, index) => {
    //     const angle = (index / positions.length) * Math.PI * 2;
    //     const radius = Math.min(innerWidth, height) / 3;
    //     const x = Math.cos(angle) * radius + innerWidth / 2;
    //     const y = Math.sin(angle) * radius + height / 2;
    //     return { x, y };
    // });

    $: data, rerunSimulation();

    function rerunSimulation(){
        if(mounted && dataLength !== data.length){

            let dataToSimulate = data.map(d => d);
            dataLength = dataToSimulate.length;

            positions = Array.from(new Set(dataToSimulate.map(d => d.position)));

            // scaleValues = {
            //     largest: radiusScale.range()[1],
            //     smallest: radiusScale.range()[0],
            //     median: (radiusScale.range()[1] + radiusScale.range()[0]) / 2
            // };
            // console.log("in simulation", scaleValues)

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
                
                .force("collide", forceCollide()
                    .radius(d => radiusScale(d.radius) + 1)
                )
                
                // .force("cluster", forceCluster()
                //     .centers(clusterCenters)
                //     .strength(0.5)
                // )

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
    <RadiusLegend {scaleValues} {data} />
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