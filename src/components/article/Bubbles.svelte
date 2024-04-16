<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import studies from "$data/studies.csv"

    let data = [];
    let xScale;
    let width = 400;
    let height = 400;

    onMount(async () => {
        const response = await fetch({studies});
        const text = await response.text();
        
        data = d3.csvParse(text, d => {
            d.participants = +d.participants;
            return d;
        });

        xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.participants)])
        .range([0, width]);
    });
</script>


<svg {width} {height}>
    {#each data as d}
        <circle
            cx={xScale(d.participants)}
            cy={height / 2}
            r={10}
            fill="black"
        />
    {/each}
</svg>