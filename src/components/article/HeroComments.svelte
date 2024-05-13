<script>
    import Notification from "$components/article/Notification.svelte";
    export let data;

    let comments = [];

    $: {
        comments = data.filter(d => d.category === "divided");
    }
</script>

<div class="hero-comments-container">
    {#each comments as comment, index}
        <Notification {comment} {index} />
    {/each}
</div>