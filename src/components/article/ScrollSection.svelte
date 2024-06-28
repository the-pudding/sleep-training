<script>
    import ForceBubbles from '$components/article/ForceBubbles.svelte';
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import Timeline from "$components/article/Timeline.svelte";
    import Map from "$components/article/Map.svelte";
    import Pie from "$components/article/Pie.svelte";

    export let copy;
    export let switcher;
    export let dataMap;
    export let stepHandler;
    export let viewportHeight;

    let renderedData;
    let focusHover = null;
    let value;
    let newValues;
    let step;

    $: value, handleStepChange()

    function handleStepChange() {
        newValues = stepHandler(value);
        renderedData = newValues.renderedData;
        focusHover = newValues.focusHover;
        if ((step === Object.values(copy).length - 1) && value === undefined) {
            step = Object.values(copy).length - 1;
        } else {
            step = value;
        }
    }
</script>

{#if copy}
    <div class="scroll-section matt-scroll">

        <!-- switcher is now a class on sticky--use that to apply styles to this el like the top:20%; -->
        <div class="sticky" class:switcher style="">
            {#if renderedData}
                {#if switcher == "bubbles"}
                    <ForceBubbles {renderedData} {focusHover} groupedBy={"position"} step={value} />                
                {:else if switcher === "transitions"}
                    {#if step == undefined || step < 2}
                        <Timeline />
                    {:else if step >= 2 }    
                        <Map bind:data={dataMap} />
                    {/if}
                {:else if switcher === "instagram"}
                    {#if value == undefined || value < 2}
                        <ForceBubbles {renderedData} {focusHover} groupedBy={"position"} step={value} />
                    {:else if value >= 2 && value <= 3 }
                        <Pie data={renderedData} width={800} />
                    {/if}
                {/if}
            {/if}
            <!-- <div class="step-marker">
                <p>{value}</p>
            </div> -->
        </div>

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
    }
    .steps {
        position: relative;
        z-index: 2;
        max-width: 40rem;
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
		background-color: #1C3A4E;
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
		padding: 1.5rem 1rem;
	}

	.step.active {
		opacity: 1;
	}

    @media only screen and (max-width: 600px) {
		.step-content {
			font-size: 14px !important;
		}
    }
</style>