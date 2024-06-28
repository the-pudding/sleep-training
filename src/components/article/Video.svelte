<script>
    export let video = 'cbum';
  
    let videoUrl = '';
    let isPlaying = false;
  
    const getVideoUrl = (video) => {
      if (video === 'cbum') {
        return 'assets/videos/cbum.mp4';
      } 
      return 'assets/videos/sleep.mp4';
    };
  
    const togglePlayPause = () => {
      const videoElement = document.getElementById('video');
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      isPlaying = !isPlaying;
    };
  
    $: videoUrl = getVideoUrl(video);
</script>
  
<div class="video-container">
  <!-- svelte-ignore a11y-media-has-caption -->
  <!-- autoplay loop -->
  <video id="video" src={videoUrl} on:click={togglePlayPause}>
    <p>Your browser does not support the video element.</p>
  </video>
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
</style>