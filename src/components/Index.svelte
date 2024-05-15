<script>
    import { setContext, getContext } from 'svelte';
    import Section from "$components/article/Section.svelte";
    import SectionSwitch from "$components/article/SectionSwitch.svelte";
    import Editorial from "$components/article/Editorial.svelte";
    import HeroComments from "$components/article/HeroComments.svelte";

    // COPY CONTEXT SETTING
    import copy from '$data/copy.json';
    setContext("copy", copy);

    // DATA IMPORT
    let data = getContext("data");
	let dataCopy = { studies: [] };
    dataCopy.studies = data.studies;
    console.log(dataCopy);
    
    // STEP LOGIC
    let step;
    function handleStepChanged(event) {
        step = event.detail;
    }

    // DATA FILTERING
    // let renderedData;
    let focusHover;

    // FOCUSED TOOLTIPS
    let focusMiddlemiss = data.studies.filter(d => d.authors === "Middlemiss")[0];

    // NOTIFICATION LOADING
    let commentsConfused = data.comments.filter(d => d.category === "confused");
    let commentsDivided = data.comments.filter(d => d.category === "divided");
    let commentsCortisol = data.comments.filter(d => d.category === "brain damage");

    // DATA LOADING
    // function dataLogic(step) {
    //     switch (true) {
    //     case step >= 0 && step <= 1:
    //         renderedData = data.studies;
    //         focusHover = null;
    //         break;
    //     case step >= 1 && step <= 2:
    //         renderedData = data.studies;
    //         focusHover = focusMiddlemiss;
    //         break;
    //     case step > 2 && step <= 3:
    //         focusHover = null;
    //         renderedData = data.articles;
    //         break;
    //     default:
    //         renderedData = data.studies;
    //     }
    // }

</script>

<div id="article">
    <section>
        <HeroComments notifications={commentsDivided} />
        <div class="editorial-container">
            <h1>Is sleep training harmful?</h1>
			<Editorial copy={copy.editorial_intro} />
		</div>
    </section>
    <section>
        <Section data={data.studies} {focusHover} copy={copy.viz_all} on:stepChanged={handleStepChanged} />
    </section>
	<section>
        <Section data={data.articles} {focusHover} copy={copy.viz_reddit} on:stepChanged={handleStepChanged} />
	</section>
	<section>
        <div class="editorial-container">
			<Editorial copy={copy.mosaic_cortisol} notifications={commentsCortisol} />
		</div>
        <!-- <Section copy={copy.part_3} on:stepChanged={handleStepChanged} /> -->
	</section>
    <section>
        <SectionSwitch data={dataCopy.studies} {focusHover} copy={copy.viz_studies} />
    </section>
	<!-- <Footer /> -->
    <div class="current-step">
        {step}
    </div>
</div>

<style>
	#article {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
	}

	:global(#article section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#article h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}
    section {
        position: relative;
        margin-top: 1.5vh;
        margin-bottom: 1.5vh;
    }
    .current-step {
		position: fixed;
		bottom: 0;
		right: 0;
	}
</style>
