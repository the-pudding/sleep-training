<script>
  export let scaleValues;
  export let data;

  const radiusScaleValues = [
      { label: 'Smallest', label_value: scaleValues.smallest_domain, value: scaleValues.smallest_range },
      { label: 'Median', label_value: scaleValues.median_domain, value: scaleValues.median_range },
      { label: 'Largest',label_value: scaleValues.largest_domain, value: scaleValues.largest_range },
  ];
</script>

<div class="radius-scale">
  <div class="radius-label">
    {#if data[0].type == "study"}
    <p>Total citations</p>
    {:else if data[0].type == "article"}
    <p>Total links referencing the work</p>
    {:else if data[0].type == "reddit"}
    <p>Total upvotes</p>
    {:else if data[0].type == "instagram"}
    <p>Total followers</p>
    {:else if data[0].type == "book"}
    <p>Library holdings</p>
    {:else}
    <p>Total citations</p>
    {/if}
  </div>
    
  <div class="scale-container">
    {#each radiusScaleValues as scale, index}
      <div class="scale-item">
        <div class="circle-container">
          <div class="circle" style="width: {scale.value * 5}px; height: {scale.value * 5}px;"></div>
        </div>
        <div class="label">{Math.floor(scale.label_value)}+</div>
      </div>
    {/each}
  </div>    
</div>
   
<style>
  .circle-container {
    height: 60px; /* Adjust this value based on your largest circle */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .radius-scale {
    display: flex;
    align-items: center;
  }
  .radius-scale p {
    margin-right: 20px;
    font-size: 14px;
  }

  .scale-container {
    min-width: 180px;
    min-height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }

  .scale-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .circle {
    border: 1px solid white;
    border-radius: 50%;
  }

  .label {
    color: white;
    margin-top: 10px;
    text-align: center;
    font-family: var(--sans);
  }

  text {
    font-family: var(--sans);
    font-size: 14px;
  }
  </style>
