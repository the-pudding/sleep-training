<script>
    import Notification from "$components/article/Notification.svelte";
    export let copy;
    export let notifications;

    let comments = null;
    $: comments = notifications !== null ? notifications : null;
    console.log("editorial", comments);
</script>

<div class="editorial">
    <div class="spacer" />
    {#each copy as p}
        <p class="editorial-paragraph">{p.text}</p>
    {/each}
    {#if comments !== null}
        <div>
            {#each comments as comment, index}
                <Notification {comment} {index} />
            {/each}
        </div>
    {/if}
    <div class="spacer" />
</div>

<style>
    .spacer {
		height: 3vh;
	}

    .editorial-paragraph {
        font-size: 12px;
        color: black
    }
</style>