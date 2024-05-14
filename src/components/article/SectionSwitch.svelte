<script>
    import { stepStore } from "$components/stepStore";

    import Scroll from "./Scroll.svelte";
    import Bubbles from "./Bubbles.svelte";
    import Timeline from "./Timeline.svelte";
    import Map from "$components/article/Map.svelte";

    export let copy;
    let focusHover = null;

    let step;
    stepStore.subscribe(value => {
        step = value;
    });

</script>


<div class="sticky">
    <Timeline width={500} height={800} />
</div>
<div class="steps">
    <Scroll {copy} />
</div>
<div class="spacer"></div>
<!-- <div class="sticky">
    <Map width={500} height={800} />
</div>
<div class="steps">
    <Scroll {copy} />
</div> -->
<div class="current-step">
    {step}
</div>

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