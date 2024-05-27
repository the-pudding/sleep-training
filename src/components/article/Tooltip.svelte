<script>
  export let data;
  export let width;

  import { fly, fade } from "svelte/transition";

  let tooltipWidth;

  // TOOLTIP POSITIONING
  const xNudge = 20;
  const yNudge = 15;

  $: xPosition =
      data.x + tooltipWidth + xNudge > width
      ? data.x - tooltipWidth - xNudge
      : data.x + xNudge;
  $: yPosition = data.y + yNudge;

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
        labelOne = 'AUTHOR:';
        textOne = truncateText(data.authors.toUpperCase(), 60);
        labelTwo = 'PARTICIPANTS';
        textTwo = data.radius;
        title = truncateText(data.title.toUpperCase(), 70);
        break;
      case 'article':
        labelOne = 'PUBLISHER:';
        textOne = data.publisher.toUpperCase();
        labelTwo = 'BACKLINKS';
        textTwo = data.radius;
        title = truncateText(data.title.toUpperCase(), 70);
        break;
      case 'reddit':
        labelOne = 'UPVOTES';
        textOne = data.radius;
        labelTwo = 'COMMENT';
        textTwo = data.comment;
        title = truncateText(data.username.toUpperCase(), 40);
        break;
      case 'instagram':
        labelOne = 'FOLLOWER COUNT';
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
    style="left:{xPosition}px; top:{yPosition}px;"
    bind:clientWidth={tooltipWidth}
>
    <p class="tooltip-title">
    {title}
    </p>
    <!-- Additional info under the country name -->
    <div class='info'>
        <p class='info-element'>{labelOne}: {textOne}</p>
        <p class='info-element'>{labelTwo}: {textTwo}</p>
    </div>
</div>


<style>
    .tooltip {
      min-width: 250px;
      max-width: 40%;
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
      font-size: 1rem;
      font-weight: 700;
    }
    .info {
      font-size: 0.8rem;
      display: inline-block;
    }
    .info-element {
      margin-bottom: 0px;
      padding-bottom: 0px;
    }
  </style>