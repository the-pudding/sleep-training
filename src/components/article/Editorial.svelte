<script>
    export let copy;
</script>

<div class="editorial">
    <div class="spacer" />
    {#each Object.entries(copy) as [key, value]}
        <p class="editorial-paragraph">{value}</p>
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