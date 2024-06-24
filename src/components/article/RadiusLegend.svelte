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
    <p>Influence: total citations</p>
    {:else if data[0].type == "article"}
    <p>Influence: total links referencing the work</p>
    {:else if data[0].type == "reddit"}
    <p>Influence: total upvotes</p>
    {:else if data[0].type == "instagram"}
    <p>Influence: total followers</p>
    {:else}
    <p>Influence</p>
    {/if}
    <svg width="300" height="100">
      {#each radiusScaleValues as scale, index}
        <g transform="translate({50 + index * 100}, 40)">
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
      /* position: absolute;
      bottom: 10px;
      left: 30%; */
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .radius-scale p {
      margin: none !important;
      font-size: 14px;
    }
    @media only screen and (max-width: 600px) {
      .radius-scale {
        left: 0px;
      }
    }
   </style>
