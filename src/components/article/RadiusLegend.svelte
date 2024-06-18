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
    <p>Number of citations</p>
    {:else if data[0].type == "article"}
    <p>Number of backlinks</p>
    {:else if data[0].type == "reddit"}
    <p>Number of upvotes</p>
    {:else if data[0].type == "instagram"}
    <p>Number of followers</p>
    {:else}
    <p>Number of citations or backlinks</p>
    {/if}
    <svg width="300" height="100">
      {#each radiusScaleValues as scale, index}
        <g transform="translate({50 + index * 100}, 40)">
          <circle
            cx="0"
            cy="0"
            r={scale.value}
            fill="none"
            stroke="black"
            stroke-width="1"
          />
          <text x="0" y="40" text-anchor="middle">{scale.value}</text>
        </g>
      {/each}
    </svg>
   </div>
   
   <style>
    .radius-scale {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .radius-scale p {
      margin: none !important;
      font-size: 14px;
    }
    /* @media only screen and (max-width: 600px) { */
   </style>
