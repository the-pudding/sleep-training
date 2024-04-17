<script>
	// import Scrolly from "$components/article/Scrolly.svelte";
    import Bubbles from "$components/article/Bubbles.svelte"

    import { onMount } from 'svelte';
    import { csvParse } from 'd3';

    let data = [];

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
    });
</script>

<div id="article">
	<h1>Is sleep training harmful?</h1>
	<!-- <Scrolly /> -->
    <Bubbles {data} width={500} height={400}/>
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
</style>
