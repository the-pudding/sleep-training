<script>
    import Notification from "$components/article/Notification.svelte";
    export let copy;
    export let notifications;

    let comments;
    $: comments = notifications !== undefined ? notifications : undefined;
</script>

<div class="editorial">
    {#each copy as p}
        <p class="editorial-paragraph">{p.text}</p>
    {/each}
    <div class="spacer" />
    {#if comments !== undefined}
        <div>
            {#each comments as comment, index}
                <Notification {comment} {index} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .editorial {
        margin-top: 4vh;
        margin-bottom: 4vh;
    }
    .spacer {
		height: 5vh;
	}
</style>