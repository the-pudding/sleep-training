<script>
    import { getContext } from 'svelte';
    import Scroll from "$components/article/Scroll.svelte";
    import Bubbles from "$components/article/Bubbles.svelte";
    import Timeline from "$components/article/Timeline.svelte";
    import Map from "$components/article/Map.svelte";

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

    // TIMELINE DATA
    let data = getContext("data").studies;
    data = data.map(d => Object.assign({}, d));

    // MAP DATA
    let dataMap = getContext("data").studies;
    dataMap = data.map(d => Object.assign({}, d));

</script>

{#if switcher === "bubbles"}
<div class="sticky" style="top: 25%;">
    <Bubbles {focusHover} bind:data={renderedData} width={800} height={400}/>
</div>
<div class="steps">
    <Scroll {copy} bind:step={step} />
</div>
{:else if switcher === "other"}
    {#if step >= 2 }
    <div class="sticky" style="top: 20%;">
        <Map bind:data={dataMap} width={700} height={600} />
    </div>
    {:else}
    <div class="sticky" style="top: 10%; display: flex;">
        <Timeline bind:data={data} width={500} height={800} />
    </div>
    {/if}
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