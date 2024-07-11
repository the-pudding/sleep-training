<script>
  export let video;
  export let caption;

  let videoUrl = '';
  let isPlaying = false;
  let videoElement;

  const getVideoUrl = (video) => {
    if (video === 'cbum') {
      return 'assets/videos/cbum.mp4';
    } 
    return 'assets/videos/sleep.mp4';
  };
  
  const togglePlayPause = () => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      isPlaying = !isPlaying;
    }
  };
  
  $: videoUrl = getVideoUrl(video);

  function handleVideoPlay() {
    isPlaying = true;
  }

  function handleVideoPause() {
    isPlaying = false;
  }
</script>
  
<div class="video-container">
   <!-- svelte-ignore a11y-media-has-caption -->
  <video 
  bind:this={videoElement}
  src={videoUrl} 
  on:click={togglePlayPause}
  on:play={handleVideoPlay}
  on:pause={handleVideoPause}
>
  <p>Your browser does not support the video element.</p>
</video>
<div class="caption">
  Source: {caption}
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="play-pause-icon" on:click={togglePlayPause}>
    {#if isPlaying}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M8 5v14l11-7z"/>
      </svg>
    {/if}
  </div>
</div>

<style>
  .video-container {
    margin: 4vh 0;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 60vh;
  }
  
  video {
    max-width: 100%;
    max-height: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  
  .play-pause-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .caption {
    margin-top: 10px;
    font-family: "Atlas Grotesk";
    font-size: 10px;
  }
</style>