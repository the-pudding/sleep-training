<script>
    import Scroll from "./Scroll.svelte";
    import Bubbles from "./Bubbles.svelte";

    export let copy;
    export let step = 0;
    export let data;
    export let focusHover;
</script>


<div class="sticky">
    <Bubbles {focusHover} {data} width={500} height={400}/>
</div>
<div class="steps">
    <Scroll {copy} bind:step on:stepChanged />
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