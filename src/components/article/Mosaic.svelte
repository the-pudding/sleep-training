<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  export let album = 'articles';

  let images = [];
  let visible = false;

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
        { url: 'assets/images/social/post_1.jpg' },
        { url: 'assets/images/social/post_2.jpg' },
        { url: 'assets/images/social/post_3.jpg' },
        { url: 'assets/images/social/post_4.jpg' },
      ];
    }
    return [];
  };

  onMount(() => {
    images = getImageUrls(album);
    visible = true;
  });
</script>

<div class="image-mosaic">
  {#each images as image, i}
    {#if visible}
      <div
        class="image-container"
        in:fly={{
          x: i % 2 === 0 ? -200 : 200,
          y: -200,
          duration: 1000,
          delay: i * 100,
          easing: cubicInOut
        }}
      >
        <img src={image.url} alt="Image {i}" />
      </div>
    {/if}
  {/each}
</div>

<style>
  .image-mosaic {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }

  .image-container {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>