<script>
	import Scrolly from "$components/article/Scrolly.svelte";
    import Bubbles from "$components/article/Bubbles.svelte"
    import { onMount } from 'svelte';
    import { csvParse } from 'd3';
	import copy from '$data/copy.json';
	// import { getContext } from "svelte";
	// import Footer from "$components/Footer.svelte";

    // DATA IMPORT
    let data = [];
	let renderedData = [];
	let advocateStudies = [];

    onMount(async () => {
        const response = await fetch('src/data/studies.csv');
        const csvText = await response.text();
        data = csvParse(csvText, d => ({
            title: d.title,
            authors: d.authors, 
            position: d.position,
            url: d.url,
            country: d.country,
            year: +d.year,
            participants: +d.participants || 0,
            citations: +d.citations || 0
        }));

		// DATA FILTERING
		advocateStudies = data.filter(d => d.position === "Advocate");
    });


	// COPY FILTERING
	let copy_1 = copy;
	// let copy_2 = copy;

    // CURRENT STEP DISPATCHING
    let currentStep;
    function handleCurrentStepChanged(event) {
        currentStep = event.detail;
    }

	// CONDITIONAL RENDERING
    $: {
		if (currentStep >= 0 && currentStep <= 1) {
			renderedData = data;
		} else if (currentStep > 1 && currentStep <= 2) {
		  	renderedData = data;
		} else {
			renderedData = advocateStudies;
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
            <Scrolly copy={copy_1} on:currentStepChanged={handleCurrentStepChanged} />
        </div>
    </section>
	<!-- <section>
		<div class="steps">
            <Scrolly copy={copy_2} on:currentStepChanged={handleCurrentStepChanged} />
        </div>
	</section> -->
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
