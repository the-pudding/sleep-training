<script>
    import { stepStore } from "$components/stepStore";
    import { getContext } from 'svelte';

    import Scroll from "./Scroll.svelte";
    import Bubbles from "./Bubbles.svelte";

    export let copy;
    let data = getContext("data")

    let step;
    stepStore.subscribe(value => {
        step = value;
    });

    let renderedData;
    let focusHover;
    let focusMiddlemiss = data.studies.filter(d => d.authors === "Middlemiss")[0];
    
    $: {
        switch (true) {
            case step >= 0 && step <= 1:
                renderedData = data.studies;
                focusHover = null;
                break;
            case step >= 1 && step <= 2:
                renderedData = data.studies;
                focusHover = focusMiddlemiss;
            break;
            case step > 2 && step <= 3:
                focusHover = null;
                renderedData = data.articles;
                break;
            default:
                renderedData = data.studies;
    }
}
</script>


<div class="sticky">
    <Bubbles {focusHover} data={renderedData} width={500} height={400}/>
</div>
<div class="steps">
    <Scroll {copy} />
</div>
<div class="current-step">
    {step}
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