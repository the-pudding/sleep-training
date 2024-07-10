<script>

    import { extent, max, scaleOrdinal, range, group, hierarchy, pack, rollup, quadtree, quantile, scaleLinear } from "d3";
    import { onMount } from "svelte";
    import { hoveredCircle } from '$stores/misc.js';
    import { fly } from "svelte/transition";

    import Tooltip from "$components/article/Tooltip.svelte";
    import Circle from "$components/article/Circle.svelte";
    import ClusterLabels from "$components/article/ClusterLabels.svelte";
    import RadiusLegend from "$components/article/RadiusLegend.svelte";
    import viewport from "$stores/viewport.js";

    export let renderedData;
    export let groupedBy;
    export let step;
    export let focusHover;

    let dataToSimulate;
    let nodes = [];
    let scaleValues;

    let animatedIn = false;

    let ordinalGroup = {
        "Oppose":0,
        "Advocate":1,
        "No Position":2
    }

    let color = scaleOrdinal(range(Object.keys(ordinalGroup).length), ["#A34131", "#4FB477","#D69C2B"]);

    let radiusScale = scaleLinear().domain(extent(renderedData, d => d.radius)).range([1,10]).clamp(true)

    $: if (radiusScale && renderedData.length > 0) {
        const sortedRadii = renderedData.map(d => d.radius).sort((a, b) => a - b);
        const q30 = quantile(sortedRadii, 0.3);
        const q60 = quantile(sortedRadii, 0.6);
        const q90 = quantile(sortedRadii, 0.9);

        const [minRange, maxRange] = radiusScale.range();
        const rangeSpread = maxRange - minRange;

        scaleValues = {
            smallest_range: minRange + rangeSpread * 0.3,
            median_range: minRange + rangeSpread * 0.6,
            largest_range: minRange + rangeSpread * 0.9,
            smallest_domain: q30,
            median_domain: q60,
            largest_domain: q90
        };
    }

    $: step, doStuff();
    $: renderedData, runSimulation();

    function doStuff(){

        if(step >= 0){
            showBubbles();
        }
        if(step == 1){
            //do stuff here!
        }
    }

    function showBubbles(){

    }


    function runSimulation(){
        $hoveredCircle = null;

        if(nodes.length !== renderedData.length){
            // console.log("runningSimulation",step,renderedData.length)
            animatedIn = false;

            radiusScale = scaleLinear().domain(extent(renderedData, d => d.radius)).range([3,10]).clamp(true)

            let data = ({
                children: Array.from(
                    group(renderedData.map(d => {
                        return {
                            value:radiusScale(d.radius),
                            
                            // YOU NEED THE GROUP TO HAVE A #, SO THAT'S WHY I MAP EACH POSITION TO 0,1,2
                            group:ordinalGroup[d[groupedBy]], info:d}
                    }), d => d["group"]),
                    ([, children]) => ({children})
                )
            })

            let packing = () => pack()
                .size([$viewport.width*0.9, $viewport.height*0.9])
                .padding(1)
                (hierarchy(data)
                .sum(d => d.value)
                )

            dataToSimulate = packing().leaves();


            setTimeout(() => {
                nodes = dataToSimulate;
                animatedIn = true;
            }, 500)
        }
    }


    onMount(() => {
        
        runSimulation();
        // YOU ACTUALLY DON'T NEED THE SIMULATION TO RUN, but it's here if you do!

        // const simulation = forceSimulation(dataToSimulate)
        //     // .force('charge', forceManyBody().strength(2))
        //     .force("x", forceX($viewport.width / 2).strength(0.01))
        //     .force("y", forceY($viewport.height/3).strength(0.01))
            // .force("cluster", forceCluster())
        //     .force("collide", forceCollide())
            // .on("tick", () => {
            //      nodes = simulation.nodes();
            //  })
    })


    function forceCluster() {
        const strength = 0.2;
        let nodes;

        function force(alpha) {
            const centroids = rollup(nodes, centroid, d => d.data.group);
            const l = alpha * strength;
            for (const d of nodes) {
            const {x: cx, y: cy} = centroids.get(d.data.group);
            d.vx -= (d.x - cx) * l;
            d.vy -= (d.y - cy) * l;
            }
        }

        force.initialize = _ => nodes = _;

        return force;
    }

    function centroid(nodes) {
        let x = 0;
        let y = 0;
        let z = 0;
        for (const d of nodes) {
            let k = d.r ** 2;
            x += d.x * k;
            y += d.y * k;
            z += k;
        }
        return {x: x / z, y: y / z};
    }

    function forceCollide() {
        const alpha = 0.4; // fixed for greater rigidity!
        const padding1 = 2; // separation between same-color nodes
        const padding2 = 6; // separation between different-color nodes
        let nodes;
        let maxRadius;

        function force() {
            const quadtreed = quadtree(nodes, d => d.x, d => d.y);
            for (const d of nodes) {
            const r = d.r + maxRadius;
            const nx1 = d.x - r, ny1 = d.y - r;
            const nx2 = d.x + r, ny2 = d.y + r;
            quadtreed.visit((q, x1, y1, x2, y2) => {
                if (!q.length) do {
                if (q.data !== d) {
                    const r = d.r + q.data.r + (d.data.group === q.data.data.group ? padding1 : padding2);
                    let x = d.x - q.data.x, y = d.y - q.data.y, l = Math.hypot(x, y);
                    if (l < r) {
                    l = (l - r) / l * alpha;
                    d.x -= x *= l, d.y -= y *= l;
                    q.data.x += x, q.data.y += y;
                    }
                }
                } while (q = q.next);
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
            }
        }

        force.initialize = _ => maxRadius = max(nodes = _, d => d.r) + Math.max(padding1, padding2);

        return force;
    }

    let legendText = {
        "reddit":"Reddit comments",
        "book":"Books",
        "review":"Literature reviews",
        "study":"Clinical studies",
        "instagram":"Instagram profiles",
        "article":"Articles"
    }

</script>
<div class="bubbles">
    {#key renderedData[0].type}
        <p in:fly={{y:20, duration:500, delay:500}} class="bubbles-title"><span>{legendText[renderedData[0].type]}</span></p>
    {/key}
    <svg
        width={$viewport.width*0.9}
        height={$viewport.height*0.9}>
        <g style="transform: translate(0,0);">
            {#if nodes}
                {#each nodes as point,i}
                    <Circle {point} nodesLength={nodes.length} {i} color={color(point.data.group)} {animatedIn} {focusHover} />
                {/each}
                <ClusterLabels {nodes} {animatedIn} />
            {/if}
        </g>
    </svg>

{#if $hoveredCircle}
    <Tooltip data={$hoveredCircle.data.info} x={$hoveredCircle.x} y={$hoveredCircle.y} width={300} />
{/if}

    <div class="legend">
        <div class="">
            <RadiusLegend {scaleValues} data={renderedData} />
        </div>
    </div>
</div>

<style>
    .bubbles {
        width: 100vw;
        height: 100vh;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .legend {
        position: absolute;
        bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .legend-container {
        display: flex;
        flex-direction: column;
    }
    .bubbles-title {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        text-shadow: -3px -3px 1px rgba(25, 46, 60, 0.4), -3px -2px 1px rgba(25, 46, 60, 0.4), -3px -1px 1px rgba(25, 46, 60, 0.4), -3px 0px 1px rgba(25, 46, 60, 0.4), -3px 1px 1px rgba(25, 46, 60, 0.4), -3px 2px 1px rgba(25, 46, 60, 0.4), -3px 3px 1px rgba(25, 46, 60, 0.4), -2px -3px 1px rgba(25, 46, 60, 0.4), -2px -2px 1px rgba(25, 46, 60, 0.4), -2px -1px 1px rgba(25, 46, 60, 0.4), -2px 0px 1px rgba(25, 46, 60, 0.4), -2px 1px 1px rgba(25, 46, 60, 0.4), -2px 2px 1px rgba(25, 46, 60, 0.4), -2px 3px 1px rgba(25, 46, 60, 0.4), -1px -3px 1px rgba(25, 46, 60, 0.4), -1px -2px 1px rgba(25, 46, 60, 0.4), -1px -1px 1px rgba(25, 46, 60, 0.4), -1px 0px 1px rgba(25, 46, 60, 0.4), -1px 1px 1px rgba(25, 46, 60, 0.4), -1px 2px 1px rgba(25, 46, 60, 0.4), -1px 3px 1px rgba(25, 46, 60, 0.4), 0px -3px 1px rgba(25, 46, 60, 0.4), 0px -2px 1px rgba(25, 46, 60, 0.4), 0px -1px 1px rgba(25, 46, 60, 0.4), 0px 1px 1px rgba(25, 46, 60, 0.4), 0px 2px 1px rgba(25, 46, 60, 0.4), 0px 3px 1px rgba(25, 46, 60, 0.4), 1px -3px 1px rgba(25, 46, 60, 0.4), 1px -2px 1px rgba(25, 46, 60, 0.4), 1px -1px 1px rgba(25, 46, 60, 0.4), 1px 0px 1px rgba(25, 46, 60, 0.4), 1px 1px 1px rgba(25, 46, 60, 0.4), 1px 2px 1px rgba(25, 46, 60, 0.4), 1px 3px 1px rgba(25, 46, 60, 0.4), 2px -3px 1px rgba(25, 46, 60, 0.4), 2px -2px 1px rgba(25, 46, 60, 0.4), 2px -1px 1px rgba(25, 46, 60, 0.4), 2px 0px 1px rgba(25, 46, 60, 0.4), 2px 1px 1px rgba(25, 46, 60, 0.4), 2px 2px 1px rgba(25, 46, 60, 0.4), 2px 3px 1px rgba(25, 46, 60, 0.4), 3px -3px 1px rgba(25, 46, 60, 0.4), 3px -2px 1px rgba(25, 46, 60, 0.4), 3px -1px 1px rgba(25, 46, 60, 0.4), 3px 0px 1px rgba(25, 46, 60, 0.4), 3px 1px 1px rgba(25, 46, 60, 0.4), 3px 2px 1px rgba(25, 46, 60, 0.4), 3px 3px 1px rgba(25, 46, 60, 0.4);
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-size: 22px;
        font-weight: 600;
        font-family: var(--serif);
        font-weight: 400;
        position: absolute;
        top: 30px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    .bubbles-title span {
        border-bottom: 1px solid rgba(255,255,255,.8);
        padding-bottom: 10px;
    }
    @media only screen and (max-width: 600px) {
        .legend {
            justify-content: center;
        }
  }
</style>