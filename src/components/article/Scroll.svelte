<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let copy;	
	export let startStep;

	let currentStep;
	let scrollyActive = true;

	$: {
		dispatch('currentStepChanged', currentStep);
		scrollyActive = currentStep !== undefined;
	}
</script>

<section id="scrolly">
	<Scrolly bind:value={currentStep} startStep={startStep}>
		{#each Object.values(copy) as p, i}
			{@const active = currentStep === i}
			<div class="step" class:active>
				<p class="step-content">{p}</p>
			</div>
		{/each}
	</Scrolly>
	<div class="current-step" class:scrollyActive={scrollyActive}>
        {currentStep}
    </div>
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

	.current-step.scrollyActive {
		position: fixed;
		bottom: 0;
		right: 0;
	}
</style>
