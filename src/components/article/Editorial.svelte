<script>
    import Notification from "$components/article/Notification.svelte";
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import { fade } from 'svelte/transition';
    export let copy;
    export let notifications;
    export let spacer = null;

    let noSpacer = false;
    if (spacer === "none") {
      noSpacer = true;
    }

    let step;
    let animationStarted = false;

    $: step, changeAnimationStarted();

    function changeAnimationStarted(){
        if(step == 0){
        console.log("notification animation started");
        animationStarted = true;
        }
    }

    let comments;
    $: comments = notifications !== undefined ? notifications : undefined;
</script>

<section id="scrolly">
	<Scrolly bind:value={step} >
        <div class="editorial-wrapper">
        {#if animationStarted}
            <div class="editorial" in:fade={{ duration: 1000, delay: 200 }}>
                    {#each copy as p}
                        <p class="editorial-paragraph">{@html p.text}</p>
                    {/each}
                <div class="spacer" style="height: {noSpacer ? '0vh' : '3vh'}"/>
            </div>
        {/if}
        </div>
    </Scrolly>
</section>
<div class="editorial-comments">
    {#if animationStarted && comments !== undefined}
        <div>
            {#each comments as comment, index}
                <div class="notification-wrapper" in:fade={{ duration: 1000, delay: 2000 + index * 100 }}>
                    <Notification {comment} {index} {step} />
                </div>
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