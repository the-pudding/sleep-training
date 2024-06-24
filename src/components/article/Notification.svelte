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
      {comment.likes} Likes
    </div>
    <p>{@html comment.comment}</p>
  </div>
  <div class="notification-source">
    <a href="{comment.url}">Source</a>
  </div>
</div>

<style>
  .notification {
    font-family: "Atlas Grotesk";
    display: flex-column;
    background-color: #1C3A4E;
    max-width: 40rem;
		margin: 0 auto 20px auto;
    padding: 15px;
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
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .notification-content {
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  .notification-likes {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  .icon {
    height: 15px;
    margin-right: 10px;
  }
  .notification-source {
    text-align: right;
    font-size: 10px;
    font-weight: lighter;
  }
  .notification-source a {
    color: white;
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