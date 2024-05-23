<script>
  import { fade } from 'svelte/transition';
  export let comment;
  export let index;

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
  
<div class="notification" in:fade={{ duration: 200, delay: index * 100 }} >
  <div class="notification-content">
    <div class="notification-likes">
      <img class="icon" src="{getPlatformDetails(comment.platform).icon}" alt="reddit or instagram icon" />
      {comment.likes} Likes
    </div>
    <p>{comment.comment}</p>
  </div>
  <div class="notification-source">
    <a href="{comment.url}">SOURCE</a>
  </div>
</div>

<style>
  .notification {
    font-family: "National 2 Web";
    display: flex-column;
    background-color: #404E4D;
    padding: 10px;
    color: white;
    border-radius: 5px;
    margin-bottom: 10px;
    transition: transform 300ms ease;
  }
  .notification p {
    font-size: 12px;
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
    font-weight: lighter;
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
</style>