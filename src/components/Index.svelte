<script>
    import Section from "./article/Section.svelte";
    import Editorial from "$components/article/Editorial.svelte";
    import { onMount } from 'svelte';
    import { csvParse } from 'd3';
	import copy from '$data/copy.json';

    // DATA IMPORT
    let data = {
        studies: [],
        articles: []
    };

    onMount(async () => {
        const response = await fetch('src/data/studies.csv');
        const csvText = await response.text();
        data.studies = csvParse(csvText, d => ({
            title: d.title,
            authors: d.authors, 
            position: d.position,
            url: d.url,
            country: d.country,
            type: d.type,
            year: +d.year,
            radius: +d.participants || 0,
            citations: +d.citations || 0
        }));

        const response_articles = await fetch('src/data/articles.csv');
        const csvArticles = await response_articles.text();
        data.articles = csvParse(csvArticles, d => ({
            title: d.title,
            authors: d.authors, 
            position: d.position,
            url: d.url,
            type: d.type,
            country: d.country,
            year: +d.year,
            radius: +d.backlinks || 0
        }));
    });

	// COPY FILTERING
	let copy_1 = copy.copy_1[0];
	let copy_2 = copy.copy_2[0];

</script>

<div id="article">
	<h1>Is sleep training harmful?</h1>
    <section>
        <Section {data} copy={copy_1} />
    </section>
	<section>
		<div class="editorial-container">
			<Editorial copy={copy_1} />
		</div>
	</section>
	<section>
        <Section {data} copy={copy_2} />
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
