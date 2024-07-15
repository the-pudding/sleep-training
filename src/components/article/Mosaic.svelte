<script>
  import { fly } from 'svelte/transition';
	import Scrolly from "$components/helpers/Scrolly.svelte";

  export let album = 'articles';
  export let viewportHeight;
  let value;
  let altTag;

  // let animationStarted = false;

  $: album, images = getImageUrls(album);

  let images = [];

  function getPos(count){
    if(count == 0){
      return ["40%","40%","-2"]
    }
    let deg = count % 2 == 0 ? Math.random()*3 : Math.random()*5*-1;
    let sign = count % 2 == 0 ? -1 : 1;

    let left = Math.random()*20*sign;
    let bottom = Math.random()*20*sign;
    return [JSON.stringify(50+left).concat("%"),JSON.stringify(50+bottom).concat("%"),deg];
  }
  const getImageUrls = (album) => {
    if (album === 'articles') {
      altTag = "Image carrousel of article headlines on sleep training.";
      return [
        { url: 'assets/images/articles/article_1.jpg' },
        { url: 'assets/images/articles/article_2.jpg' },
        { url: 'assets/images/articles/article_3.jpg' },
        { url: 'assets/images/articles/article_4.jpg' },
        { url: 'assets/images/articles/article_5.jpg' },
        { url: 'assets/images/articles/article_6.jpg' },
      ];
    } else if (album === 'social') {
      altTag = "Image carrousel of article headlines on the sleep training debate.";
      return [
        { url: 'assets/images/social/social_1.png' },
        { url: 'assets/images/social/social_2.png' }
      ];
    } else if (album === 'posts') {
      altTag = "Social media post images on anti-sleep training narratives.";
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
    } 
    return [];
  };
</script>


<section id="">
    <div class="image-mosaic" style="height:{viewportHeight}px;">
      {#each images as image, i}
        {@const pos = getPos(i)}
        {#if i <= value}
            <div
              class="image-container fading {album === 'posts' ? 'image-container-posts' : ''}"
              style="
                transform: translate(-50%, 50%) rotate({pos[2]}deg);
                transform-origin: 50% 100%;
                left:{pos[0]};
                bottom:{pos[1]};
                border-radius: 5px;
              "
            >
              <img
                transition:fly={{y:50, duration:500}}
                src={image.url} alt={altTag} style="border-radius: 5px;" />
            </div>
        {/if}
      {/each}
    </div>

    <section id="scrolly" style="margin-top:{-viewportHeight*.5}px;">
      <Scrolly bind:value>
        {#each images as text, i}
          {@const active = value === i}
          {@const last = i === images.length - 1}
          <div class="step" class:last style="{viewportHeight*.5}px;" class:active>
          </div>
        {/each}
      </Scrolly>
    </section>
</section>


<style>

  h1 {
    color: black;
  }

.steps {
    position: relative;
    z-index: 100;
		pointer-events: none;
    max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
    
}
.step {
		height: 50vh;
    background-color: white;
		opacity: 0;
    margin-bottom: 100px;
    z-index: 100;
		transition: opacity 300ms ease;
		display: flex;
		place-items: center;
		justify-content: center;
}

.last {
  margin-bottom: 0;
}

  .image-mosaic {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .image-container {
    position: absolute;
    top: auto;
    max-width: 60vw;
    box-shadow: 0px 1px 2px rgba(117, 117, 117, 0.10), -2px 3px 3px rgba(117, 117, 117, 0.09), -3px 6px 4px rgba(117, 117, 117, 0.05), -6px 10px 5px rgba(117, 117, 117, 0.01), -10px 16px 5px rgba(117, 117, 117, 0.00);
  }
  .image-container-posts {
    position: absolute;
    top: auto;
    max-width: 20vw;
    box-shadow: 0px 1px 2px rgba(117, 117, 117, 0.10), -2px 3px 3px rgba(117, 117, 117, 0.09), -3px 6px 4px rgba(117, 117, 117, 0.05), -6px 10px 5px rgba(117, 117, 117, 0.01), -10px 16px 5px rgba(117, 117, 117, 0.00);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  @media only screen and (max-width: 600px) {
		.image-container {
      width: 75vw;
      max-width: 80vw;
		}
		.image-container-posts {
      width: 50vw;
      max-width: 80vw;
		}
  }
</style>