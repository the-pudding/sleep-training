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
</script>

{#if animatedIn}
    {#each data as position}
        {@const center = centroid(position[1])}
        <rect x={center.x - 3} y={center.y - 17} width={position[0].length * 10} height={25} fill="white"/>
        <text x={center.x} y={center.y} class="cluster-label">{position[0]}</text>
    {/each}
{/if}

<style>
.cluster-label {
    color: white;
    font-size: 0.8rem;
    font-family: "Atlas Grotesk";
    text-transform: uppercase;
}
</style>