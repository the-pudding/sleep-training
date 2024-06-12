<script>
    import ForceBubbles from '$components/article/ForceBubbles.svelte';
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import Bubbles from "$components/article/Bubbles.svelte";
    import Timeline from "$components/article/Timeline.svelte";
    import Map from "$components/article/Map.svelte";
    import Pie from "$components/article/Pie.svelte";

    export let copy;
    export let switcher;
    export let dataMap;
    export let stepHandler;

    let renderedData;
    let focusHover = null;
    let value;
    let newValues;

    $: value, handleStepChange()

    function handleStepChange() {
        newValues = stepHandler(value);
        renderedData = newValues.renderedData;
        focusHover = newValues.focusHover;
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
                    {#if value == undefined || value < 2}
                        <Timeline />
                    {:else if value >= 2 && value <= 3 }    
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
        </div>

        <div class="steps">
            <section id="scrolly">
                <Scrolly bind:value>
                    {#each Object.values(copy) as p, i}
                        {@const active = value === i}
                        <div class="step" class:active>
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

	.step-content {
		background-color: #ECE3DA;
		border-radius: 5px;
	}

	.step p {
		padding: 1.5rem 1rem;
	}

	.step.active {
		opacity: 1;
	}
</style>