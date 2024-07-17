<script>
  import viewport from '$stores/viewport.js';
  export let data;
  export let width;

  export let x;
  export let y;
  import { fade } from "svelte/transition";

  let tooltipWidth = width;

  // TOOLTIP POSITIONING
  let xNudge = 10;
  const yNudge = -$viewport.height * 0.05;
  let isMobile = $viewport.width <= 600;
  let xPosition;
  let yPosition;

  // $: console.log(x,width)
  
  $: {
    if (isMobile) {
      xPosition = ($viewport.width / 2 ) - (tooltipWidth / 2);
      yPosition = $viewport.height / 2;
    } else {
      if ((x + width + ($viewport.width*.1)) > $viewport.width) {
        xNudge = -width;
      } else {
        xNudge = $viewport.width * 0.04;
        xPosition = x + xNudge;
        yPosition = y + yNudge;
      }
    }
  }

  // TOOLTIP CONTENT
  function truncateText(text, maxLength) {
      if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
      }
      return text;
  }
  let type = '';
  let textOne = '';
  let textTwo = '';
  let title = '';

  $: {
    switch (data.type) {
      case 'study':
        title = truncateText(data.title.toUpperCase(), 70);
        type = "Study";
        textOne = truncateText(data.authors, 60);
        textTwo = data.year;
        break;
        case 'review':
          title = truncateText(data.title.toUpperCase(), 70);
          type = "Study";
          textOne = truncateText(data.authors, 60);
          textTwo = data.year;
          break;
      case 'article':
        title = truncateText(data.title.toUpperCase(), 70);
        type = "Article";
        textOne = data.publisher;
        textTwo = data.year;
        break;
      case 'reddit':
        title = truncateText(data.username.toUpperCase(), 40);
        type = "Reddit comment";
        textTwo = truncateText(data.short, 200);
        break;
      case 'instagram':
        title = truncateText(data.username.toUpperCase(), 40);
        type = "Instagram profile";
        textOne = data.radius;
        break;
      case 'book':
        title = truncateText(data.title.toUpperCase(), 40);
        type = "Book";
        textOne = truncateText(data.authors, 60);
        textTwo = data.year;
        break;
      default:
        textTwo = '';
        labelTwo = '';
        break;
  }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div 
    class="tooltip" 
    in:fade={{ duration: 200, delay: 0 }}
    out:fade
    style="left:{isMobile ? xPosition + 'px' : xPosition + 'px'}; top:{isMobile ? yPosition + 'px' : yPosition - 150 + 'px'}; width:{tooltipWidth}px;"
    class:isMobile
    tabindex="0"
>
  {#if data.type === "instagram"}
    <div style="margin-top: 0px; margin-bottom: 10px; padding-top: 0px;"><span class="tooltip-type">{type}</span></div>
    <div class="tooltip-title">
      {title}
    </div>
  {:else if data.type === "reddit"}
    <div style="margin-top: 0px; margin-bottom: 10px; padding-top: 0px;"><span class="tooltip-type">{type}</span></div>
    <div class="tooltip-title">
      Username: {title}
    </div>
    <div class='info'>
      <span class='info-element'>{textTwo}</span>
    </div>
  {:else}
    <div style="margin-top: 0px; margin-bottom: 10px; padding-top: 0px;"><span class="tooltip-type">{type}</span></div>
    <div class="tooltip-title">
      {title}
    </div>
    <div class='info'>
      <span class='info-element'>Published in <span class="bold">{textOne}</span>, {textTwo}</span>
    </div>
  {/if}
<!-- Additional info under the country name -->
    
</div>


<style>
    .tooltip {
      position: absolute;
      pointer-events: none;
      font-family: "Atlas Grotesk";
      padding: 1rem 1rem;
      background: #273239;
      color: white;
      border-radius: 4px;
      transition: top 300ms ease, left 300ms ease;
      transform: translate(0,100%);
      z-index: 100;
    }
    .tooltip-title {
      margin-bottom: 10px;
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
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 0px;
      padding-bottom: 0px;
    }
    .tooltip-type {
      border-radius: 3px;
      background: rgba(255,255,255,.16);
      color: white;
      padding: 1px 5px;
      font-weight: 600;
      font-size: 14px;
      margin-top: 2px;
      margin-bottom: 10px;
   }
   .tooltip.isMobile {
    position: fixed;
    transform: translateY(0%);
  }
  </style>