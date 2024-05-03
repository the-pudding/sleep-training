<script>
    import Scroll from "./Scroll.svelte";
    import Bubbles from "./Bubbles.svelte";

    export let copy;
    export let data_studies;
    export let data_articles;
    export let currentStep;

    let renderedData = [];

    $: {
        switch (true) {
            case currentStep >= 0 && currentStep <= 1:
                renderedData = data_studies;
                break;
            case currentStep > 1 && currentStep <= 3:
                renderedData = data_studies;
                break;
            case currentStep > 3 && currentStep <= 6:
                renderedData = data_articles;
            break;
            default:
                renderedData = data_studies;
        }
        console.log('data', renderedData);
    }

    function handleCurrentStepChanged(event) {
        currentStep = event.detail;
    }
</script>


<div class="sticky">
    <Bubbles data={renderedData} width={500} height={400} {currentStep} />
</div>
<div class="steps">
    <Scroll startStep={0} {copy} on:currentStepChanged={handleCurrentStepChanged} />
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