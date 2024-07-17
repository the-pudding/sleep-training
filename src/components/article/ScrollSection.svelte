<script>
    import ForceBubbles from '$components/article/ForceBubbles.svelte';
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import Timeline from "$components/article/Timeline.svelte";
    import Map from "$components/article/Map.svelte";

    export let copy;
    export let dataMap;
    export let stepHandler;
    export let viewportHeight;

    let renderedData;
    let focusHover = null;
    let caption = null;
    let value;
    let newValues;
    let step;

    $: value, handleStepChange()

    function handleStepChange() {

        if ((step === Object.values(copy).length - 1) && value === undefined) {
            step = Object.values(copy).length - 1;
        } else {
            step = value;
        }

        newValues = stepHandler(step);
        renderedData = newValues.renderedData;
        focusHover = newValues.focusHover;
        caption = newValues.caption
    }
</script>

{#if copy}
    <div class="scroll-section matt-scroll">

        <!-- switcher is now a class on sticky--use that to apply styles to this el like the top:20%; -->
        <div class="sticky" style="min-height:{viewportHeight}px;">
            {#if renderedData}
                {#if step < 16}
                    <ForceBubbles {renderedData} {focusHover} {caption} groupedBy={"position"} {step} /> 
                {:else if step >= 16 && step < 17}             
                    <Timeline {caption} />
                {:else if step >= 17 && step < 18}    
                    <Map bind:data={dataMap} {caption} />
                {:else if step >= 18}
                    <ForceBubbles {renderedData} {focusHover} {caption} groupedBy={"position"} {step} /> 
                {/if}  
            {/if}
        </div>

        <!-- INSTAGRAM -->
        <!-- <ForceBubbles {renderedData} {focusHover} groupedBy={"position"} {step} /> -->

        <div class="steps">
            <section id="scrolly">
                <Scrolly bind:value>
                    {#each Object.values(copy) as p, i}
                        {@const active = value === i}
                        {@const last = i == Object.values(copy).length - 1 ? true : false}
                        {@const first = i == 0 ? true : false}

                        <div class="step" class:active class:last class:first
                            style="
                                height: {viewportHeight}px;
                                margin-top:{first ? -viewportHeight*.5 : 0}px;
                            "
                        >
                            <p class="step-content">{@html p.text}</p>
                        </div>
                    {/each}
                </Scrolly>
            </section>
        </div>
    </div>
{/if}


<style>
    .sticky {
        position: sticky;
        z-index: 1;
        display: flex;
        justify-content: center;
        top: 0;
        /* display: none; */
    }
    .steps {
        position: relative;
        z-index: 2;
        max-width: 2000px;
		padding: 16px;
		margin: 0 auto;
        pointer-events: none;
    }
    .step {
		height: 60vh;
		opacity: .3;
		transition: opacity 300ms ease;
		display: flex;
		place-items: center;
		justify-content: center;
        max-width: 400px;
	}
    .step-marker {
        position: absolute;
        bottom: 0px;
        left: 10px;
    }
    .first {
        margin-top: -50vh;
    }

	.step-content {
		background-color: rgba(17,17,17,.95);
		border-radius: 5px;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        line-height: 1.5;
        letter-spacing: -.2px;
        margin-top: 0;
        margin-bottom: 25px;
        pointer-events: auto;
	}

    .last {
        margin-bottom: 50vh;
    }

	.step p {
        padding: 15px 20px;
	}

	.step.active {
		opacity: 1;
	}

    @media only screen and (max-width: 600px) {
		.step-content {
			/* font-size: 14px !important; */
		}
    }
</style>