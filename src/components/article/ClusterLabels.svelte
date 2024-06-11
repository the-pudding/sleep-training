<script>
    export let nodes;
    import { groups } from "d3";

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

{#each data as position}
    {@const center = centroid(position[1])}
    <text x={center.x} y={center.y}>{position[0]}</text>
{/each}