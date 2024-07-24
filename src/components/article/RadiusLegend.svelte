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
      <p>Circles Sized by {scaleData.label}</p>
    </div>
    <div class="container">


    <p class="scale-label">Fewer {scaleData.label}</p>
    <div class="scale-container">
      {#each scaleData.scales as scale, i}
        <div class="scale-item">
          <div class="circle-container">
            <div class="circle" style="width: {(i * 5) + 10}px; height: {(i * 5) + 10}px;"></div>
          </div>
          <!-- <div class="label">{scale.domain}+</div> -->
        </div>
      {/each}
    </div>
    <p class="scale-label">More {scaleData.label}</p>
    </div>
  {/if}
</div>
   
<style>
  .container {
    display: flex;
    justify-content: center;
  }
  .scale-label {
    font-size: 12px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    font-family: var(--sans);
    margin: 0;
  }
  .radius-label p{
    font-family: var(--sans);
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    margin-bottom: 10px;
  }

  .circle-container {
    display: flex;
  }
  .radius-scale {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .scale-container {
    width: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .scale-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    background-color: white;
    border-radius: 50%;
    opacity: .7;

  }
  .label {
    color: white;
    margin-top: 10px;
    text-align: center;
    font-family: var(--sans);
  }
  </style>
