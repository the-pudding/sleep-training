<script>

    import { max, scaleOrdinal, range, schemeCategory10, group, hierarchy, pack, rollup, quadtree, forceSimulation, scaleLinear } from "d3";
    import { onMount } from "svelte";
    import { hoveredCircle } from '$stores/misc.js';

    import Tooltip from "$components/article/Tooltip.svelte";
    import Circle from "$components/article/Circle.svelte";
    import ClusterLabels from "$components/article/ClusterLabels.svelte";
    import viewport from "$stores/viewport.js";
    // import Legend from "$components/article/Legend.svelte";

    export let renderedData;
    export let groupedBy;
    export let step;
    export let focusHover;

    let dataToSimulate;
    let nodes = [];

    let animatedIn = false;

    let ordinalGroup = {
        "Oppose":0,
        "Advocate":1,
        "Neutral":2
    }

    $: console.log("focushover", focusHover);

    let color = scaleOrdinal(range(Object.keys(ordinalGroup).length), ["#4FB477","#7D82B8","#404E4D"]);


    //your bubbles were really big, so tried to tone it down here, keeping them between 3 and 10px;
    let radiusScale = scaleLinear().domain([1,20]).range([3,10]).clamp(true)

    $: step, doStuff();

    function doStuff(){
        if(step >= 0){
            showBubbles();
        }
        if(step == 1){
            //do stuff here!
        }
    }

    function showBubbles(){
        console.log("showing bubbles")
        animatedIn = true;
    }

    onMount(() => {
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
            .size([$viewport.width, $viewport.height])
            .padding(1)
            (hierarchy(data)
            .sum(d => d.value)
            )

        dataToSimulate = packing().leaves();

        nodes = dataToSimulate;

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
</script>
<div class="bubbles">
    <!-- <Legend positionColor={color} data={renderedData} /> -->
<svg
    width={$viewport.width}
    height={$viewport.height}>
    <g>
        {#if nodes}
            {#each nodes as point,i}
                <Circle {point} {i} color={color(point.data.group)} {animatedIn} {focusHover} />
            {/each}
            <ClusterLabels {nodes} />
        {/if}
    </g>
</svg>
{#if $hoveredCircle != undefined}
    <Tooltip data={$hoveredCircle.data.info} x={$hoveredCircle.x} y={$hoveredCircle.y} width={200} />
{/if}
</div>

<style>
    .bubbles {
        width: 100vw;
        height: 100vh;
        position: relative;
    }
</style>