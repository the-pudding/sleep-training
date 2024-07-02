<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";

	export let copy;
	export let step;
</script>

<section id="scrolly">
	<Scrolly bind:value={step} >
		{#each Object.values(copy) as p, i}
			{@const active = step === i}
			<div class="step" class:active>
				<p class="step-content">{@html p.text}</p>
			</div>
		{/each}
	</Scrolly>
</section>

<style>
	.step {
		opacity: .3;
		transition: opacity 300ms ease;
		display: flex;
		place-items: center;
		justify-content: center;
	}

	.step p {
		padding: 1.5rem 1rem;
		color: white;
	}

	.step.active {
		opacity: 1;
	}

	@media only screen and (max-width: 600px) {
		.step-content p {
			font-size: 14px !important;
		}
	}
</style>
