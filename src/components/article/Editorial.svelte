<script>
    import Notification from "$components/article/Notification.svelte";
    import Scrolly from "$components/helpers/Scrolly.svelte";
    export let copy;
    export let notifications;
    export let spacer = null;
    export let methods = false;
    export let first = false;

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
        <div class="editorial-wrapper" class:methods>
            {#if copy[0].subtitle}
                <h3>{copy[0].subtitle}</h3>
            {/if}
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <div class="editorial" tabindex="0">
                {#each copy as p, i}
                    <p class:animationStarted class:first={first && i === 0} class="editorial-paragraph">{@html p.text}</p>
                {/each}
                <div class="spacer" style="height: {noSpacer ? '0vh' : '3vh'}"/>
            </div>
        </div>
    </Scrolly>
</section>

<!-- style="font-size:{first && i == 0 ? '24px' : ''};" -->

{#if comments}
<div class="editorial-comments">
    {#each comments as comment, index}
        <div class="notification-wrapper">
            <Notification {comment} {index} {animationStarted} />
        </div>
    {/each}
</div>
{/if}


<style>
    .first {
        font-size: 24px !important;
    }
    .editorial-comments {
        margin: 75px auto;
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
    @media only screen and (max-width: 600px) {
		.editorial-paragraph {
            font-size: 16px;
        }
        .first {
        font-size: 20px !important;
        }
    }
</style>