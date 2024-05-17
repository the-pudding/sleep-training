<script>
    import * as d3 from 'd3';
    import {select} from 'd3';
    // import { geoPath, geoNaturalEarth1 } from 'd3-geo';
    // import { forceSimulation, forceX, forceY } from 'd3-force';
    import worldMap from "$data/world-geojson2.json";
    export let width;
    export let height;

    export let data;
    // CLEAN FOR ALL TO HAVE COUNTRY CODES OR NAMES
    // console.log(worldMap);

    const margin = { top: 0, right: 0, bottom: 20, left: 150 };
    let innerWidth = width - margin.right - margin.left;
    let innerHeight = height - margin.top - margin.bottom;

    const countryNameAccessor = d => d.properties["NAME"]; 

    const sphere = ({type: "Sphere"});
    const projection = d3.geoMercator()
      .fitWidth(innerWidth, sphere)

    const pathGenerator = d3.geoPath(projection);

  </script>
  
  <div class="map-container">
    <svg width={innerWidth} height={innerHeight}>
      <g class="bounds" transform={`translate(${margin.left}, ${margin.top})`}>
        <path class="earth" d={pathGenerator({ type: 'Sphere' })}></path>
        <!-- {#each worldMap.features as feature}
          <path class="country" d={pathGenerator(feature)}></path>
        {/each} -->
      </g>
    </svg>
  </div>
  
  <style>
    .map-container {
      width: 100%;
      height: 100%;
    }
  </style>