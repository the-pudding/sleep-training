<script>
    import Notification from "$components/article/Notification.svelte";
    export let copy;
    export let notifications;
    export let spacer = null;

    let noSpacer = false;
    if (spacer === "none") {
      noSpacer = true;
    }

    let comments;
    $: comments = notifications !== undefined ? notifications : undefined;

    let ready = false;
    setTimeout(() => {
        ready = true;
    }, 600)
</script>

<div class="editorial">
    {#each copy as p}
        <p class="editorial-paragraph">{@html p.text}</p>
    {/each}
    <div class="spacer" style="height: {noSpacer ? '0vh' : '3vh'}"/>
    {#if comments !== undefined}
        <div>
            {#each comments as comment, index}
                <Notification {comment} {index} {ready} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .editorial {
        margin-top: 4vh;
        margin-bottom: 4vh;
    }
</style>