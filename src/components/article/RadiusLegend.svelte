<script>
  export let scaleValues;
  export let data;

  const radiusScaleValues = [
      { label: 'Smallest', value: scaleValues.smallest },
      { label: 'Median', value: scaleValues.median },
      { label: 'Largest', value: scaleValues.largest }
  ];
</script>

<div class="radius-scale">
    {#if data[0].type == "study"}
    <p>Total citations</p>
    {:else if data[0].type == "article"}
    <p>Total links referencing the work</p>
    {:else if data[0].type == "reddit"}
    <p>Total upvotes</p>
    {:else if data[0].type == "instagram"}
    <p>Total followers</p>
    {:else}
    <p>Total citations</p>
    {/if}
    <svg width="180" height="100">
      {#each radiusScaleValues as scale, index}
        <g transform="translate({30 + index * 50}, 40)">
          <circle
            cx="0"
            cy="0"
            r={scale.value}
            fill="none"
            stroke="white"
            stroke-width="1"
          />
          <text x="0" y="40" fill="white" text-anchor="middle">{scale.value}+</text>
        </g>
      {/each}
    </svg>
   </div>
   
   <style>
    .radius-scale {
      display: flex;
      align-items: center;
    }
    .radius-scale p {
      margin: none !important;
      font-size: 14px;
    }

    text {
      font-family: var(--sans);
      font-size: 14px;
    }
   </style>
