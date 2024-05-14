<script>
    import { onMount } from 'svelte';
    import { select } from 'd3-selection';
    import { geoPath, geoNaturalEarth1 } from 'd3-geo';
    import { forceSimulation, forceX, forceY } from 'd3-force';
    import { getContext } from 'svelte';

    export let width;
    export let height;

    let data = getContext("data").studies
    let worldMap;
  
    onMount(async () => {
      const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      worldMap = await response.json();
  
      const svg = select('.map-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
  
      const projection = geoNaturalEarth1()
        .fitSize([width, height], worldMap);
  
      const pathGenerator = geoPath().projection(projection);
  
      svg.selectAll('path')
        .data(worldMap.objects.countries.geometries)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .attr('fill', '#ccc')
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5);
  
      const countryPositions = {};
      data.forEach(d => {
        const countryPath = svg.selectAll('path').filter(country => country.properties.name === d.country);
        if (!countryPath.empty()) {
          const centroid = pathGenerator.centroid(countryPath.datum());
          countryPositions[d.country] = centroid;
        }
      });
  
      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => countryPositions[d.country][0])
        .attr('cy', d => countryPositions[d.country][1])
        .attr('r', 5)
        .attr('fill', 'steelblue');
    });
  </script>
  
  <div class="map-container"></div>
  
  <style>
    .map-container {
      width: 100%;
      height: 100%;
    }
  </style>