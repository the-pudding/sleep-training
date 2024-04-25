<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import copy from '../../data/copy.json';
	let value;
	$: console.log({ value })
</script>

<section id="scrolly">
	<!-- <div class="spacer" /> -->
	<Scrolly bind:value>
		{#each Object.values(copy) as text, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p class="step-content">{text}</p>
			</div>
		{/each}
	</Scrolly>
	<!-- <div class="spacer" /> -->
</section>

<style>
	/* .spacer {
		height: 75vh;
	} */

	.step {
		height: 60vh;
		opacity: .3;
		/* background: var(--color-gray-100); */
		text-align: center;
		transition: opacity 300ms ease;
	}

	.step-content {
		background-color: white;
		border-radius: 5px;
		border: 1px solid black;
	}

	.step p {
		padding: 1rem;
	}

	.step.active {
		opacity: 1;
	}
</style>
