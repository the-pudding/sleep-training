<script>
    import Notification from "$components/article/Notification.svelte";
    import { fade } from 'svelte/transition';
    export let notifications;

    let ready = false;
    setTimeout(() => {
        ready = true;
    }, 100)
</script>

{#if ready}
<div class="hero-comments-container">
    {#each notifications as comment, index}
        <div class="notification-wrapper" in:fade={{ duration: 1000, delay: 2000 + index * 100 }}>
            <Notification {comment} {index} />
        </div>
    {/each} 
</div>
{/if}

<style>
    .hero-comments-container {
        min-height: 85vh;
    }
</style>