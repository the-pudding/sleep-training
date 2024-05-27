<script>
    import Notification from "$components/article/Notification.svelte";
    export let notifications;

    let ready = false;
    setTimeout(() => {
        ready = true;
    }, 500)
</script>

<div class="hero-comments-container">
    {#each notifications as comment, index}
        <Notification {comment} {index} {ready} />
    {/each}
</div>

<style>
    .hero-comments-container {
        min-height: 85vh;
    }
</style>