<script>
    import Scroll from "./Scroll.svelte";
    import Bubbles from "./Bubbles.svelte";
	  import { getContext } from "svelte";

    export let copy;
    export let handleStepChanged;

    let data = getContext("data");

    $: step = 0;
    $: renderedData = [];
    $: focusHover = null;

    $: {
      const newValues = handleStepChanged(step);
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
</style>