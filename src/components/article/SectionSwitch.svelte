<script>
    import { stepStore } from "$components/stepStore";

    import Scroll from "./Scroll.svelte";
    // import Bubbles from "./Bubbles.svelte";
    import Timeline from "./Timeline.svelte";
    // import Map from "$components/article/Map.svelte";

    export let copy;
    // export let focusHover;
    export let data;
</script>


<div class="sticky">
    <Timeline {data} width={500} height={800} />
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
</style>