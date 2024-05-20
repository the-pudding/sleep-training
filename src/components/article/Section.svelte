<script>
    import Scroll from "./Scroll.svelte";
    import Bubbles from "./Bubbles.svelte";
    import Timeline from "./Timeline.svelte";
    import Map from "$components/article/Map.svelte";
    import { getContext } from 'svelte';

    export let copy;
    export let stepHandler;
    export let switcher;

    let step = 0;
    let renderedData = [];
    let focusHover = null;

    $: {
      let newValues = stepHandler(step);
      renderedData = newValues.renderedData;
      focusHover = newValues.focusHover;
    }

    // TO REMOVE
    let data = getContext("data").studies
    data = data.map(d => Object.assign({}, d))

    // Re-assigned to avoid force conflicts
    let dataMap = getContext("data").studies
    dataMap = data.map(d => Object.assign({}, d))

</script>

{#if switcher === "bubbles"}
<div class="sticky">
    <Bubbles {focusHover} bind:data={renderedData} width={500} height={400}/>
</div>
<div class="steps">
    <Scroll {copy} bind:step={step} />
</div>
{:else if switcher === "timeline"}
<div class="sticky">
    <Timeline bind:data={data} width={500} height={800} />
</div>
<div class="steps">
    <Scroll {copy} bind:step={step} />
</div>
{:else if switcher === "map"}
<div class="sticky">
    <Map bind:data={dataMap} width={700} height={600} />
</div>
<div class="steps">
    <Scroll {copy} bind:step={step} />
</div>
{/if}
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