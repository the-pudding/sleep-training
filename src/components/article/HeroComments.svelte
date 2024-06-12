<script>
    import Notification from "$components/article/Notification.svelte";
    import Scrolly from "$components/helpers/Scrolly.svelte";
    export let notifications;

    let step;
    let animationStarted = false;

    $: step, changeAnimationStarted();

    function changeAnimationStarted(){
        if(step == 0) {
            setTimeout(() => {
                animationStarted = true;
            }, 1000)
        }
    }
</script>

<section id="scrolly" class="scrolly-editorial">
	<Scrolly bind:value={step} >
        <div class="hero-comments-container">
            {#each notifications as comment, index}
                <div class="notification-wrapper">
                    <Notification {comment} {animationStarted} {index} />
                </div>
            {/each} 
        </div>
    </Scrolly>
</section>


<style>
    .hero-comments-container {
        min-height: 85vh;
    }
</style>

<!-- in:fade={{ duration: 4000, delay: index * 1000 }} -->