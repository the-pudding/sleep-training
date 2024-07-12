<script>
  export let scaleValues;
  export let data;

  const radiusScaleValues = {
    study: {
      label: "Citations",
      scales: [
        { domain: 10, range: scaleValues.smallest_range },
        { domain: 50, range: scaleValues.median_range },
        { domain: 100, range: scaleValues.largest_range },
      ]
    },
    review: {
      label: "Citations",
      scales: [
        { domain: 20, range: scaleValues.smallest_range },
        { domain: 40, range: scaleValues.median_range },
        { domain: 100, range: scaleValues.largest_range },
      ]
    },
    article: {
      label: "Referring links",
      scales: [
        { domain: 5, range: scaleValues.smallest_range },
        { domain: 20, range: scaleValues.median_range },
        { domain: 50, range: scaleValues.largest_range },
      ]
    },
    reddit: {
      label: "Upvotes",
      scales: [
        { domain: 5, range: scaleValues.smallest_range },
        { domain: 15, range: scaleValues.median_range },
        { domain: 50, range: scaleValues.largest_range },
      ]
    },
    instagram: {
      label: "Followers",
      scales: [
        { domain: "75k", range: scaleValues.smallest_range },
        { domain: "130k", range: scaleValues.median_range },
        { domain: "250k", range: scaleValues.largest_range },
      ]
    },
    book: {
      label: "Library holdings",
      scales: [
        { domain: 60, range: scaleValues.smallest_range },
        { domain: 200, range: scaleValues.median_range },
        { domain: 400, range: scaleValues.largest_range },
      ]
    },
  };

  const getScaleData = (type) => radiusScaleValues[type];
</script>

<div class="radius-scale">
  {#if data[0].type}
    {@const scaleData = getScaleData(data[0].type)}
    <div class="radius-label">
      <p>{scaleData.label}</p>
    </div>
    
    <div class="scale-container">
      {#each scaleData.scales as scale}
        <div class="scale-item">
          <div class="circle-container">
            <div class="circle" style="width: {scale.range * 5}px; height: {scale.range * 5}px;"></div>
          </div>
          <div class="label">{scale.domain}+</div>
        </div>
      {/each}
    </div>
  {/if}
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
  </style>
