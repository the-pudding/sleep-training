<script>
    import Notification from "$components/article/Notification.svelte";
    export let copy;
    export let notifications;

    let comments;
    $: comments = notifications !== undefined ? notifications : undefined;
</script>

<div class="editorial">
    <div class="spacer" />
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
    <div class="spacer" />
</div>

<style>
    .spacer {
		height: 5vh;
	}

    .editorial-paragraph {
        font-size: 14px;
        color: black
    }
</style>