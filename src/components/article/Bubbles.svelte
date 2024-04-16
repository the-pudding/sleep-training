<script>
    import { onMount } from 'svelte';
    import { forceSimulation, forceY, forceX, forceCollide } from 'd3-force';
    import { csvParse } from 'd3';
    import { scaleLinear, scaleBand, scaleSqrt } from 'd3-scale';
    import { extent } from 'd3-array';

    let width = 500;
    let height = 400;
    let data = [];
    let nodes = [];  
    const margin = {
        top: 0,
        right: 0,
        bottom: 20,
        left: 0
    };
    const innerWidth = width - margin.left - margin.right;
    // const innerHeight = height - margin.top - margin.bottom;
    let radiusScale = scaleSqrt().range([2, 50]);

    onMount(async () => {
        const response = await fetch('src/data/studies.csv'); 
        const csvText = await response.text();
        data = csvParse(csvText, d => {
            d.year = +d.year;
            d.participants = +d.participants || 0;
            d.citations = +d.citations || 0
            return d;
        });
        
        setupSimulation();
    });

    function setupSimulation() {
        const xScale = scaleLinear()
            .domain(extent(data, d => d.year))
            .range([0, innerWidth]);
        
        console.log(extent(data, d => d.year));
        // const yScale = scaleBand()
        //     .domain(data.map(d => d.position))
        //     .range([innerHeight, 0]);

        radiusScale.domain(extent(data, d => d.participants))

        const simulation = forceSimulation(data)
            .force("x", forceX().x(d => xScale(d.year)).strength(0.8))
            .force("y", forceY(height / 2).strength(1))
            .force("collide", forceCollide().radius(d => {
                let radius = radiusScale(d.participants);
                return radius;
            }))
            .on("tick", () => {
                nodes = [...simulation.nodes()];
            });


        nodes = simulation.nodes();
        console.log(nodes, "nodes");
    }
</script>

<div class="bubbles-container"
    bind:clientWidth={width}>
    <svg {width} {height}>
        <g class="inner-bubbles" transform="translate({margin.left}, {margin.top})">
            {#each nodes as node}
                <circle
                    cx={node.x}
                    cy={node.y}
                    r={radiusScale(node.participants)} 
                    fill='#404E4D'
                />
            {/each}
        </g>
    </svg>
</div>