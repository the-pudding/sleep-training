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
				<p class="step-content">{p.text}</p>
			</div>
		{/each}
	</Scrolly>
</section>

<style>
	.step {
		height: 60vh;
		opacity: .3;
		transition: opacity 300ms ease;
		display: flex;
		place-items: center;
		justify-content: center;
	}

	.step-content {
		background-color: #ECE3DA;
		border-radius: 5px;
	}

	.step p {
		padding: 1.5rem 1rem;
	}

	.step.active {
		opacity: 1;
	}
</style>
