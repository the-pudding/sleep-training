<script>
    import { groups } from "d3";

    export let nodes;
    export let animatedIn;
    export let label = '';

    let data;
    // $: {
    //     data = groups(nodes, d => d.data.info.position)
    // }


    let outlineColor = {
        "Advocate": "#0d381f",
        "No Position":"#4f3a0f",
        "Oppose":"#54241c"
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

    function getTextWidth(text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const metrics = context.measureText(text);
        return metrics.width;
    }
</script>

{#if animatedIn}
    {#each nodes as position}
        {@const center = centroid(position)}
        <!-- <rect x={center.x - ((textWidth + 30)/2)} y={center.y - 17} width={textWidth} height={25} fill="#1C3A4E" rx="5" ry="5" /> -->
        <text x={center.x} y={center.y+5} class="cluster-label cluster-label-stroke" fill="white" style="stroke:#1A2E3C;">{label}</text>
        <text x={center.x} y={center.y+5} class="cluster-label" fill="white">{label}</text>
        

    {/each}
{/if}

<style>
.cluster-label {
    color: white;
    pointer-events: none;
    font-size: 17px;
    font-family: "Atlas Grotesk";
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-anchor: middle;
}

.cluster-label-stroke {
    stroke-width: 5px;
    stroke-linecap: round;
    stroke-opacity: .8;
    pointer-events: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
}
</style>