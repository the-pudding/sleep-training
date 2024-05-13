<script>
  import { fly, fade } from 'svelte/transition';
  export let comment;
  export let index;

  console.log(index);

    function getPlatformDetails(platform) {
      let iconUrl;
      switch (platform) {
        case 'reddit':
          iconUrl = '🎺';
          break;
        case 'instagram':
          iconUrl = '🎺';
          break;
        default:
          iconUrl = '⚠️';
          break;
      }
      return { icon: iconUrl };
    }
  </script>
  
  <div class="notification" in:fade={{ duration: 200, delay: index * 100 }} >
    <span class="icon">{getPlatformDetails(comment.platform).icon}</span>
    {comment.comment}
  </div>

  <style>
    .notification {
      display: flex;
      align-items: center;
      font-size: 14px;
      background-color: #404E4D;
      padding: 10px;
      color: white;
      border-radius: 5px;
      margin-bottom: 10px;
      /* transform: translateY(-20px); */
      transition: transform 300ms ease;
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 10px;
    }
  </style>