<script>
    import Section from "$components/article/Section.svelte";
    import Editorial from "$components/article/Editorial.svelte";
    import HeroComments from "$components/article/HeroComments.svelte";
    import { onMount, setContext } from 'svelte';
    import { csvParse } from 'd3';
	import copy from '$data/copy.json';

    // DATA IMPORT
    let data = {
        studies: [],
        articles: [],
        comments: []
    };
    setContext("copy", copy);

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
        const response_comments = await fetch('src/data/comments.csv');
        const csvComments = await response_comments.text();
        data.comments = csvParse(csvComments, d => ({
            comment: d.comment,
            category: d.category,
            platform: d.platform,
            url: d.url
        }));
    });

</script>

<div id="article">
    <section class="spacer">
        <HeroComments data={data.comments} />
    </section>
    <section>
        <h1>Is sleep training harmful?</h1>
        <Section {data} copy={copy.intro} />
    </section>
	<section>
		<div class="editorial-container">
			<Editorial copy={copy.part_2} />
		</div>
	</section>
	<section>
        <Section {data} copy={copy.part_3} />
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
    .spacer {
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
</style>
