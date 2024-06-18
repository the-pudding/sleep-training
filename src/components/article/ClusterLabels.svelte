<script>
    import { groups } from "d3";

    export let nodes;
    export let animatedIn;

    let data;
    $: {
        data = groups(nodes, d => d.data.info.position)
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
    {#each data as position}
        {@const center = centroid(position[1])}
        {@const textWidth = getTextWidth(position[0])}
        <rect x={center.x - 6} y={center.y - 17} width={textWidth + 30} height={25} fill="#1C3A4E" rx="5" ry="5" />
        <text x={center.x} y={center.y} class="cluster-label" fill="white">{position[0]}</text>
    {/each}
{/if}

<style>
.cluster-label {
    color: white;
    font-size: 0.8rem;
    font-family: "Atlas Grotesk";
    font-weight: bold;
}
</style>