<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
	import Scrolly from "$components/helpers/Scrolly.svelte";
  import viewport from "$stores/viewport.js";

  export let album = 'articles';
  export let height;
  let step;

  let animationStarted = false;

  $: step, changeAnimationStarted();

  function changeAnimationStarted(){
    if(step == 0){
      animationStarted = true;
    }
    
  }

  let images = [];

  const getImageUrls = (album) => {
    if (album === 'articles') {
      return [
        { url: 'assets/images/articles/article_1.jpg' },
        { url: 'assets/images/articles/article_2.jpg' },
        { url: 'assets/images/articles/article_3.jpg' },
        { url: 'assets/images/articles/article_4.jpg' },
        { url: 'assets/images/articles/article_5.jpg' },
        { url: 'assets/images/articles/article_6.jpg' },
      ];
    } else if (album === 'social') {
      return [
        { url: 'assets/images/social/social_1.png' },
        { url: 'assets/images/social/social_2.png' }
      ];
    } else if (album === 'posts') {
      return [
        { url: 'assets/images/posts/post_1.jpg' },
        { url: 'assets/images/posts/post_2.jpg' },
        { url: 'assets/images/posts/post_3.jpg' },
        { url: 'assets/images/posts/post_4.jpg' },
      ];
    } else if (album === 'debunk') {
      return [
        { url: 'assets/images/debunk/narvaez.jpg' },
        { url: 'assets/images/debunk/sears.jpg' },
      ];
    } else if (album === 'products') {
      return [
        { url: 'assets/images/products/products_1.jpg' },
        { url: 'assets/images/products/products_2.jpg' },
        { url: 'assets/images/products/products_4.jpg' },
      ];
    }
    return [];
  };

  onMount(() => {
    images = getImageUrls(album);
  });
</script>


<section id="scrolly">
	<Scrolly bind:value={step} >
    <div class="image-mosaic" style="min-height: {height}vh;">
      {#each images as image, i}
        {#if $viewport.width < 600}
          <div
          class="image-container"
          in:fade={{ duration: 1000, delay: (i*300), easing: cubicInOut }}
        >
          <img src={image.url} alt="Image {i}" />
        </div>
        {:else}
          {#if animationStarted && album === "social"}
            <div
              class="image-container"
              style="z-index: {i}; transform: translate({i % 2 === 0 ? '10%' : '90%'}, {i * 14}vh); max-width: 50%;"
              in:fade={{ duration: 1000, delay: (i*300), easing: cubicInOut }}
            >
              <img src={image.url} alt="Image {i}" />
            </div>
          {:else if animationStarted && album === "products"}
            <div
            class="image-container"
            style="z-index: {i}; transform: translate({i % 2 === 0 ? '40%' : '130%'}, {i * 14}vh); max-width: 30%;"
            in:fade={{ duration: 1000, delay: (i*300), easing: cubicInOut }}
            >
              <img src={image.url} alt="Image {i}" />
            </div>
          {:else}
            <div
              class="image-container"
              style="z-index: {i}; transform: translate({i % 2 === 0 ? '0%' : '30%'}, {i * 9}vh); max-width: 75%;"
              in:fade={{ duration: 1000, delay: (i*300), easing: cubicInOut }}
            >
              <img src={image.url} alt="Image {i}" />
            </div>
          {/if}
        {/if}
      {/each}
    </div>
	</Scrolly>
</section>




<style>
  .image-mosaic {
    position: relative;
    width: 80%;
    max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
  }

  .image-container {
    position: absolute;
    top: 0;
    transform-origin: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  @media only screen and (max-width: 600px) {
    .image-mosaic {
      position: relative;
      width: 90%;
      margin: 0 auto;
    }
      .image-container {
        padding-top: 10px;
        position: initial;
      }
    }
</style>