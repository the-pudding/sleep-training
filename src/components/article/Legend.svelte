<script>
    export let positionColor;
    export let data;
    export let hoveredPosition;

    $: positions = Array.from(new Set(data.map(d => d.position)));
</script>

<div class="legend">
    {#each positions as position}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <p
          on:mouseover={() => hoveredPosition = position}
          on:mouseleave={() => hoveredPosition = null}
          class:unhovered={hoveredPosition && hoveredPosition !== position} 
        >
            <span style="background-color: {positionColor(position)}"></span>
            {position}
        </p> 
    {/each}
</div>

<style>
    .legend {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 5px;
    margin-bottom: 0.25rem;
  }

  .legend p {
    margin: 0;
    font-size: 0.8rem;
    font-family: "Atlas Grotesk";
    text-transform: uppercase;
    display: flex;
    align-items: center;
    column-gap: 3px;
    transition: opacity 300ms ease-in-out;
    cursor: pointer;
  }

  span {
    width: 9px;
    height: 9px;
    display: inline-block;
    border-radius: 50%;
  }

  .unhovered {
    opacity: 0.3;
  }
</style>