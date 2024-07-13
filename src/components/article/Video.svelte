<script>
  export let video;
  export let caption;

  let videoUrl = '';
  let posterUrl = '';
  let videoElement;

  const getVideoData = (video) => {
    if (video === 'cbum') {
      return {
        videoUrl: 'assets/videos/cbum.mp4',
        posterUrl: 'assets/posters/poster_1.webp'
      };
    } 
    return {
      videoUrl: 'assets/videos/sleep.mp4',
      posterUrl: 'assets/posters/poster.webp'
    };
  };

  $: ({ videoUrl, posterUrl } = getVideoData(video));
</script>
  
<div class="video-container">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video 
    bind:this={videoElement}
    src={videoUrl} 
    poster={posterUrl}
    controls
  >
    <p>Your browser does not support the video element.</p>
  </video>
  <div class="caption">
    Source: {caption}
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
</style>