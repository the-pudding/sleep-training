<script>
	import Scroll from "$components/article/Scroll.svelte";
    import Bubbles from "$components/article/Bubbles.svelte"
    import Editorial from "$components/article/Editorial.svelte"
    import { onMount } from 'svelte';
    import { csvParse } from 'd3';
	import copy from '$data/copy.json';
	// import { getContext } from "svelte";
	// import Footer from "$components/Footer.svelte";

    // DATA IMPORT
    let data_studies = [];
    let data_articles = [];
	let renderedData = [];
	let advocateStudies = [];

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

		// DATA FILTERING
        console.log(data_articles);
		advocateStudies = data_studies.filter(d => d.position === "Advocate");
    });


	// COPY FILTERING
	let copy_1 = copy.copy_1[0];
	let copy_2 = copy.copy_2[0];

    // CURRENT STEP DISPATCHING
    let currentStep;
    function handleCurrentStepChanged(event) {
        currentStep = event.detail;
    }

	// CONDITIONAL RENDERING
    $: {
        switch (true) {
            case currentStep >= 0 && currentStep <= 1:
                renderedData = data_studies;
                break;
            case currentStep > 1 && currentStep <= 2:
                renderedData = data_studies;
                break;
            case currentStep > 2 && currentStep <= 3:
                renderedData = advocateStudies;
                break;
                case currentStep > 3 && currentStep <= 6:
                renderedData = data_articles;
                break;
            default:
                renderedData = data_studies;
        }
    }
</script>

<div id="article">
	<h1>Is sleep training harmful?</h1>
    <section>
        <div class="sticky">
            <Bubbles data={renderedData} width={500} height={400} {currentStep} />
        </div>
        <div class="steps">
            <Scroll startStep={0} copy={copy_1} on:currentStepChanged={handleCurrentStepChanged} />
        </div>
    </section>
	<section>
		<div class="editorial-container">
			<Editorial copy={copy_1} />
		</div>
	</section>
	<section>
        <div class="sticky">
            <Bubbles data={renderedData} width={500} height={400} {currentStep} />
        </div>
		<div class="steps">
            <Scroll startStep={4} copy={copy_2} on:currentStepChanged={handleCurrentStepChanged} />
        </div>
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
