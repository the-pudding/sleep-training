<script>
  import viewport from '$stores/viewport.js';
  export let data;
  export let width;

  export let x;
  export let y;
  import { fly, fade } from "svelte/transition";

  let tooltipWidth = width;

  // TOOLTIP POSITIONING
  let xNudge = 0;
  $: {
      if ((x + width) > $viewport.width) {
      xNudge = -width;
    } else {
      xNudge = 0;
    }
  }
  const yNudge = 15;

  $: xPosition = x + xNudge;
  $: yPosition = y + yNudge;

  // TOOLTIP CONTENT
  function truncateText(text, maxLength) {
      if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
      }
      return text;
  }
  let labelOne = '';
  let textOne = '';
  let labelTwo = '';
  let textTwo = '';
  let title = '';

  $: {
    switch (data.type) {
      case 'study':
        labelOne = 'AUTHORS';
        textOne = truncateText(data.authors, 60);
        labelTwo = 'PARTICIPANTS';
        textTwo = data.radius;
        title = truncateText(data.title.toUpperCase(), 70);
        break;
      case 'article':
        labelOne = 'PUBLISHER';
        textOne = data.publisher;
        labelTwo = 'BACKLINKS';
        textTwo = data.radius;
        title = truncateText(data.title.toUpperCase(), 70);
        break;
      case 'reddit':
        labelOne = 'UPVOTES';
        textOne = data.radius;
        labelTwo = 'COMMENT';
        textTwo = truncateText(data.comment, 140);
        title = truncateText(data.username.toUpperCase(), 40);
        break;
      case 'instagram':
        labelOne = 'FOLLOWERS';
        textOne = data.radius;
        labelTwo = '';
        textTwo = '';
        title = truncateText(data.username.toUpperCase(), 40);
        break;
      default:
        textTwo = '';
        labelTwo = '';
        break;
  }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class="tooltip" 
    in:fly={{ y: 10, duration: 200, delay: 200 }}
    out:fade
    style="left:{xPosition}px; top:{yPosition}px; width:{tooltipWidth}px;"
>
    <p class="tooltip-title">
    {title}
    </p>
    <!-- Additional info under the country name -->
    <div class='info'>
        <p class='info-element'>{labelOne}: {textOne}</p>
        {#if data.type != "instagram"}
        <p class='info-element'>{labelTwo}: {textTwo}</p>
        {/if}
    </div>
</div>


<style>
    .tooltip {
      position: absolute;
      pointer-events: none;
      padding: 1rem 1rem;
      background: #81A0DD;
      box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
      border-radius: 4px;
      transition: top 300ms ease, left 300ms ease;
    }
    .tooltip-title {
      margin: 0;
      font-size: 12px;
      font-weight: 700;
    }
    .info {
      font-size: 14px;
      display: inline-block;
    }
    .info-element {
      font-size: 12px;
      margin-bottom: 0px;
      padding-bottom: 0px;
    }
  </style>