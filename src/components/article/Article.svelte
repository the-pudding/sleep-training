<script>
	import Scrolly from "$components/article/Scrolly.svelte";
    import Bubbles from "$components/article/Bubbles.svelte"
</script>

<div id="article">
	<h1>Is sleep training harmful?</h1>
	<!-- <Scrolly /> -->
    <Bubbles />
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
