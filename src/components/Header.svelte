<script>
	import wordmark from "$svg/bubble.svg";
	import { base } from "$app/paths";

</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html wordmark}</a
		>
	</div>
</header>

<style>
	.stickers {
		position: absolute;
		top: 0;
		max-width: 800px;
		margin: 0 auto;
		left: 0;
		right: 0;
		display: none;
	}
	.wordmark {
		max-width: 200px;
		margin: 0 auto;
		padding: 1em 0;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: #d4e0ee;
		fill: #fff;
	}
</style>
