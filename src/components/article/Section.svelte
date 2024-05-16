<script>
    import Scroll from "./Scroll.svelte";
    import Bubbles from "./Bubbles.svelte";

    export let copy;
    export let stepHandler;

    let step = 0;
    let renderedData = [];
    let focusHover = null;

    $: {
      let newValues = stepHandler(step);
      renderedData = newValues.renderedData;
      focusHover = newValues.focusHover;
    }

</script>


<div class="sticky">
    <Bubbles {focusHover} bind:data={renderedData} width={500} height={400}/>
</div>
<div class="steps">
    <Scroll {copy} bind:step={step} />
</div>
<div class="current-step">
    {#if step !== undefined}
        <p>Step: {step}</p>
    {/if}
</div>

<style>
    .sticky {
        position: sticky;
        z-index: 1;
        top: 35%;
    }
    .steps {
        position: relative;
        z-index: 2;
		pointer-events: none;
    }
    .current-step {
		position: fixed;
		bottom: 0;
		right: 0;
	}
</style>