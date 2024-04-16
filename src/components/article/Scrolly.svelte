<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import copy from '../../data/copy.json';
	let value;
</script>

<section id="scrolly">
	<div class="spacer" />
	<Scrolly bind:value>
		{#each Object.keys(copy) as key}
			{@const active = value === key}
			<div class="step" class:active>
				<p>{copy[key]}</p>
			</div>
		{/each}
	</Scrolly>
	<div class="spacer" />
</section>

<style>
	.spacer {
		height: 75vh;
	}

	.step {
		height: 80vh;
		background: var(--color-gray-100);
		text-align: center;
	}

	.step p {
		padding: 1rem;
	}
</style>
