<script>
    import Notification from "$components/article/Notification.svelte";
    export let notifications;
</script>

<div class="hero-comments-container">
    {#each notifications as comment, index}
        <Notification {comment} {index} />
    {/each}
</div>

<style>
    .hero-comments-container {
        min-height: 95vh;
    }
</style>