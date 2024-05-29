<script>
    import { getContext, onMount } from 'svelte';
    import Scroll from "$components/article/Scroll.svelte";
    import Bubbles from "$components/article/Bubbles.svelte";
    import Timeline from "$components/article/Timeline.svelte";
    import Map from "$components/article/Map.svelte";
    import Pie from "$components/article/Pie.svelte";

    export let copy;
    export let stepHandler;
    export let switcher;

    let step = 0;
    let mounted = false;
    let renderedData = [];
    let focusHover = null;

    $: {
      let newValues = stepHandler(step);
      renderedData = newValues.renderedData;
      focusHover = newValues.focusHover;
    }

    let data = getContext("data").studies;
    // TIMELINE DATA
    let dataTimeline = data.map(d => Object.assign({}, d));
    // MAP DATA
    let dataMap = data.map(d => Object.assign({}, d));

    onMount(() => {
        mounted = true;
    })

</script>


{#if mounted}
    {#if switcher === "bubbles"}
        <div class="sticky" style="top: 25%;">
            <Bubbles {switcher} {focusHover} bind:data={renderedData} width={400} height={400}/>
        </div>
        <div class="steps">
            <Scroll {copy} bind:step={step} />
        </div>
    {:else if switcher === "transitions"}
        {#if step == undefined || step < 2}
            <div class="sticky" style="top: 10%; display: flex;">
                <Timeline bind:data={dataTimeline} width={500} height={800} />
            </div>
        {:else if step >= 2 && step <= 3 }
            <div class="sticky" style="top: 20%;">
                <Map bind:data={dataMap} width={700} height={600} />
            </div>
        {/if}
        <div class="steps">
            <Scroll {copy} bind:step={step} />
        </div>
    {:else if switcher === "instagram"}
        {#if step == undefined || step < 2}
            <div class="sticky" style="top: 25%;">
                <Bubbles {switcher} {focusHover} bind:data={renderedData} width={800} height={400}/>
            </div>
        {:else if step >= 2 && step <= 3 }
            <div class="sticky" style="top: 25%;">
                <Pie data={renderedData} width={800} />
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
{/if}
<style>
    .sticky {
        position: sticky;
        z-index: 1;
        display: flex;
        justify-content: center;
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