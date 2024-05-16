<script>
    import { getContext } from 'svelte';

    import Scroll from "./Scroll.svelte";
    // import Bubbles from "./Bubbles.svelte";
    import Timeline from "./Timeline.svelte";
    // import Map from "$components/article/Map.svelte";

    export let copy;
    let step;
    let focusHover = null;
    let data = getContext("data").studies

    data = data.map(d => Object.assign({}, d))
</script>


<div class="sticky">
    <Timeline {focusHover} bind:data={data} width={500} height={800} />
</div>
<div class="steps">
    <Scroll {copy} bind:step={step} />
</div>
<div class="current-step">
    {#if step !== undefined}
        <p>Step: {step}</p>
    {/if}
</div>
<div class="spacer"></div>

<style>
    .spacer {
		height: 5vh;
	}
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