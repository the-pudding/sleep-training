<script>
  export let comment;
  export let index;
  export let animationStarted;

  function getPlatformDetails(platform) {
    const iconUrl =
      platform === 'reddit'
        ? 'assets/icons/reddit.webp'
        : platform === 'instagram'
        ? 'assets/icons/instagram.webp'
        : 'assets/icons/instagram.webp';

    return { icon: iconUrl };
  }
</script>
  
<div class="notification" class:animationStarted style="--delay:{index};">
  <div class="notification-content">
    <div class="notification-likes">
      <img class="icon" src="{getPlatformDetails(comment.platform).icon}" alt="reddit or instagram icon" />
    </div>
    <p class="notification-text">{@html comment.comment}</p>
  </div>
  <div class="notification-source">
    {#if comment.platform === "reddit"}
      Comment / {comment.likes} Votes / <a href="{comment.url}">Source</a>
    {:else}
      Comment / {comment.likes} Likes / <a href="{comment.url}">Source</a>
    {/if}
  </div>
</div>

<style>
  .notification-content {
    display: flex;
  }
  .notification {
    font-family: "Atlas Grotesk";
    display: flex-column;
    background: linear-gradient(5deg, rgba(185,177,219,.10), rgba(226,226,226,.14));
    max-width: 550px;
		margin: 0 auto 20px auto;
    padding: 10px;
    color: white;
    border-radius: 5px;
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) calc(var(--delay) * 0.2s), transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) calc(var(--delay) * 0.2s);
  }
  .notification.animationStarted {
    opacity: 1;
    transform: translateY(0);
  }

  .notification p {
    font-size: 16px;
    letter-spacing: -.2px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    margin: 0;
    margin-bottom: 5px;
  }
  .notification-likes {
    min-width: 20px;
    max-width: 20px;
    margin-right: 10px;

  }
  .icon {
    width: 100%;
    width: 20px;
    margin-top: 3px;
  }
  .notification-source {
    text-align: left;
    font-size: 10px;
    font-weight: lighter;
    margin-top: 5px;
    margin-left: 30px;
  }
  .notification-source a {
    color: white;
    font-weight: 400;
    opacity: .7;
  }
  @media only screen and (max-width: 600px) {
      .notification p {
      font-size: 16px;
    }
    .notification {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
</style>