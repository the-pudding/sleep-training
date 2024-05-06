<script>
    import Scroll from "./Scroll.svelte";
    import Bubbles from "./Bubbles.svelte";
    import { currentStepStore } from "$components/currentStep";

    export let copy;
    export let data;

    let step;
    currentStepStore.subscribe(value => {
        step = value;
    });

    let scrollyActive = true;
    let renderedData = [];
    
    $: {
        switch (true) {
            case step >= 0 && step <= 1:
                renderedData = data.studies;
                break;
            case step > 2 && step <= 3:
                renderedData = data.articles;
            break;
            default:
                renderedData = data.studies;
        }
    }
</script>


<div class="sticky">
    <Bubbles data={renderedData} width={500} height={400}/>
</div>
<div class="steps">
    <Scroll {copy} />
</div>
<div class="current-step" class:scrollyActive={scrollyActive}>
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

    .current-step.scrollyActive {
		position: fixed;
		bottom: 0;
		right: 0;
	}
</style>