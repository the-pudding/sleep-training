<script>
    import Section from "./article/Section.svelte";
    import Editorial from "$components/article/Editorial.svelte"
    import { onMount } from 'svelte';
    import { csvParse } from 'd3';
	import copy from '$data/copy.json';
	// import { getContext } from "svelte";
	// import Footer from "$components/Footer.svelte";

    // DATA IMPORT
    let data_studies = [];
    let data_articles = [];

    onMount(async () => {
        const response = await fetch('src/data/studies.csv');
        const csvText = await response.text();
        data_studies = csvParse(csvText, d => ({
            title: d.title,
            authors: d.authors, 
            position: d.position,
            url: d.url,
            country: d.country,
            year: +d.year,
            participants: +d.participants || 0,
            citations: +d.citations || 0
        }));

        const response_articles = await fetch('src/data/articles.csv');
        const csvArticles = await response_articles.text();
        data_articles = csvParse(csvArticles, d => ({
            title: d.title,
            authors: d.authors, 
            position: d.position,
            url: d.url,
            country: d.country,
            year: +d.year,
            backlinks: +d.backlinks || 0
        }));
    });


	// COPY FILTERING
	let copy_1 = copy.copy_1[0];
	let copy_2 = copy.copy_2[0];

    // CURRENT STEP DISPATCHING
    let currentStep;
    function handleCurrentStepChanged(event) {
        currentStep = event.detail;
    }
</script>

<div id="article">
	<h1>Is sleep training harmful?</h1>
    <section>
        <Section {data_articles} {data_studies} {currentStep} copy={copy_1} on:currentStepChanged={handleCurrentStepChanged} />
    </section>
	<section>
		<div class="editorial-container">
			<Editorial copy={copy_1} />
		</div>
	</section>
	<section>
        <Section {data_articles} {data_studies} {currentStep} copy={copy_2} on:currentStepChanged={handleCurrentStepChanged} />
	</section>
	<!-- <Footer /> -->
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
    }
</style>
