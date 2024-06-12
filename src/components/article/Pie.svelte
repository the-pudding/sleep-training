<script>
    import * as d3 from 'd3';
    import viewport from "$stores/viewport.js";
  
    export let data;
    export let width;
    
    let height = 400;
    let radius = Math.min(width, height) / 2;
  
    let arc;
    let pie;
    let color;
    let pieData = [];

    const colorMapping = {
        Advocate: "#4FB477",
        Neutral: "#7D82B8",
        Oppose: "#404E4D"
    };
  
    $: {
      // Group data points by position and calculate the sum of radius for each position
      const groupedData = d3.group(data, d => d.position);
      pieData = Array.from(groupedData, ([position, points]) => ({
        position,
        value: d3.sum(points, d => d.radius)
      }));
  
      // Define the arc generator
      arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
  
      // Define the pie layout
      pie = d3.pie()
        .sort(null)
        .value(d => d.value);
  
      // Define the color scale
      color = d3.scaleOrdinal(d3.schemeCategory10);
    }
  </script>
  
  <div class="pie">
    <svg width={$viewport.width} height={$viewport.height}>
      <g>
        {#each pie(pieData) as d, i}
          <g class="arc">
            <path d={arc(d)} fill={colorMapping[d.data.position]} />
          </g>
        {/each}
        {#each pie(pieData) as d, i}
          <g class="arc">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <text class="label" transform={`translate(${arc.centroid(d)})`}
                  dy=".35em" text-anchor="middle"
                  dx={d.data.position === 'Neutral' ? '-1.5em' : '1.5em'}
                  >
              {d.data.position}
            </text>
          </g>
        {/each}
      </g>
    </svg>
  </div>

  <style>
    .pie {
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    .label {
      font-family: "Atlas Grotesk";
      fill: #ffffff;
    }
    .tooltip {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.8);
      color: #ffffff;
      padding: 5px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
  }
  </style>