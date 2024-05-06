<script>
    export let copy;
</script>

<div class="editorial">
    <div class="spacer" />
    {#each copy as p}
        <p class="editorial-paragraph">{p.text}</p>
    {/each}
    <div class="spacer" />
</div>

<style>
    .spacer {
		height: 15vh;
	}

    .editorial-paragraph {
        font-size: 12px;
        color: black
    }
</style>