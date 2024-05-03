<script>
    export let data = [];
  
    function getIcon(platform) {
      switch (platform) {
        case 'reddit':
          return '🎺';
        case 'instagram':
          return '🐦';
        default:
          return '⚠️';
      }
    }
  
    function getBgColor(platform) {
      switch (platform) {
        case 'reddit':
          return '#ff4500';
        case 'instagram':
          return '#1da1f2';
        // Add more cases for other platforms as needed
        default:
          return '#808080';
      }
    }
  </script>
  
  <style>
    .notification {
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: var(--bg-color);
      color: white;
      border-radius: 5px;
      margin-bottom: 10px;
    }
  
    .icon {
      font-size: 1.5rem;
      margin-right: 10px;
    }
  </style>
  
  {#each data as notification (notification.id)}
    <div class="notification" style="--bg-color: {getBgColor(notification.platform)}">
      <span class="icon">{getIcon(notification.platform)}</span>
      {notification.description}
    </div>
  {/each}