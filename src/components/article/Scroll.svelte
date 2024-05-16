<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { createEventDispatcher } from 'svelte';
	// import { stepStore } from "$components/stepStore";

	export let copy;
	export let step;

	// let step;
	// const dispatch = createEventDispatcher();

	// $: {
	// 	dispatch('stepChanged', step);
	// }

	// $: stepStore.updateStep(tep);
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
		background-color: white;
		padding: 0.75rem 1rem;
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
