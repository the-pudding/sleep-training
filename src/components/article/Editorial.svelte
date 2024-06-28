<script>
    import Notification from "$components/article/Notification.svelte";
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import Debunk from "$components/article/Debunk.svelte";
    import { fade } from 'svelte/transition';
    export let copy;
    export let notifications;
    export let spacer = null;
    export let title = null;
    export let debunk = null;

    let step;
    let comments;
    $: comments = notifications !== undefined ? notifications : undefined;
    let animationStarted = false;

    $: step, changeAnimationStarted();

    function changeAnimationStarted(){
        if(step == 0) {
            setTimeout(() => {
                animationStarted = true;
            }, 200)
        }
    }

    let noSpacer = false;
    if (spacer === "none") {
      noSpacer = true;
    }
</script>

<section id="scrolly" class="scrolly-editorial">
	<Scrolly bind:value={step} >
        <div class="editorial-wrapper">
            {#if title}
                <h3 class="sub-title">{title}</h3>
            {/if}
            {#if copy[0].subtitle}
                <h3>{copy[0].subtitle}</h3>
            {/if}
            <div class="editorial">
                {#each copy as p}
                    <p class:animationStarted class="editorial-paragraph">{@html p.text}</p>
                {/each}
            <div class="spacer" style="height: {noSpacer ? '0vh' : '3vh'}"/>
        </div>
        </div>
    </Scrolly>
</section>

<div class="editorial-comments">
    {#if comments}
        {#each comments as comment, index}
            <div class="notification-wrapper">
                <Notification {comment} {index} {animationStarted} />
            </div>
        {/each}
    {/if}
</div>

<div class="debunk">
    {#if animationStarted}
        {#if debunk}
            <Debunk target={debunk} />
        {/if}
    {/if}
</div>


<style>
    .editorial-comments {
        margin: 100px auto;
    }
    .editorial-paragraph {
        font-size: 18px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        line-height: 1.5;
        margin-top: 0;
        margin-bottom: 25px;
        letter-spacing: -.2px;
        opacity: 1;
        font-family: var(--serif);
    }
    .editorial {
        max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
    }
    .scrolly-editorial {
        padding-top: 0px !important;
        margin-top: 0px !important;
    }
    .sub-title {
        font-size: 28px;
        border-bottom: 1px solid currentColor;
        font-family: "Tiempos Text Web";
        font-weight: 700;
        color: #82BCBE;
        max-width: 40rem;
		padding: 16px;
		margin: 100px auto 0 auto;
        font-family: 'Atlas Grotesk';
        font-weight: 300;
        font-size: 24px;
        text-align: center;
        text-transform: uppercase;
        color: #c6f1f3;
        letter-spacing: 2px;
        border: none;
        margin-bottom: 20px;
    }
</style>