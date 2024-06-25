<script>
  import viewport from '$stores/viewport.js';
  export let data;
  export let width;

  export let x;
  export let y;
  import { fade } from "svelte/transition";

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
        textOne = truncateText(data.authors, 60);
        textTwo = data.year;
        title = truncateText(data.title.toUpperCase(), 70);
        break;
      case 'article':
        textOne = data.publisher;
        textTwo = data.year;
        title = truncateText(data.title.toUpperCase(), 70);
        break;
      case 'reddit':
        textTwo = truncateText(data.comment, 140);
        title = truncateText(data.username.toUpperCase(), 40);
        break;
      case 'instagram':
        textOne = data.radius;
        title = truncateText(data.username.toUpperCase(), 40);
        break;
      case 'book':
        textOne = truncateText(data.authors, 60);
        textTwo = data.year;
        title = truncateText(data.title.toUpperCase(), 40);
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
    in:fade={{ duration: 200, delay: 0 }}
    out:fade
    style="left:{xPosition}px; top:{yPosition - 150}px; width:{tooltipWidth}px;"
>
  {#if data.type === "instagram"}
    <div class="tooltip-title">
      {title}
    </div>
  {:else if data.type === "reddit"}
    <div class="tooltip-title">
      {title}
      <div class='info'>
        <span class='info-element'>{textTwo}</span>
      </div>
    </div>
  {:else}
  <div class="tooltip-title">
    {title}
    <div class='info'>
      <span class='info-element'>Published in <span class="bold">{textOne}</span>, {textTwo}</span>
    </div>
  </div>
  {/if}
<!-- Additional info under the country name -->
    
</div>


<style>
    .tooltip {
      position: absolute;
      pointer-events: none;
      padding: 1rem 1rem;
      background: #1A2E3C;
      color: white;
      box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
      border-radius: 4px;
      transition: top 300ms ease, left 300ms ease;
    }
    .tooltip-title {
      margin: 0;
      font-size: 12px;
      line-height: 1.4;
      font-weight: 600;
    }
    .info {
      font-size: 12px;
      display: flex;
      flex-direction: column;

    }
    .info-element {
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 0px;
      padding-bottom: 0px;
    }
  </style>