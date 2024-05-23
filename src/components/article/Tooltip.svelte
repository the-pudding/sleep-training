<script>
    export let data;
    export let width;

    import { fly, fade } from "svelte/transition";

    let tooltipWidth;

    const xNudge = 20;
    const yNudge = 15;

    $: xPosition =
        data.x + tooltipWidth + xNudge > width
        ? data.x - tooltipWidth - xNudge
        : data.x + xNudge;
    $: yPosition = data.y + yNudge;

    $: labelSize = data.type === 'study' ? 'PARTICIPANTS' : data.type === 'article' ? 'BACKLINKS' : null;
    $: labelAuthor = data.type === 'study' ? 'AUTHOR' : data.type === 'article' ? 'PUBLISHER' : null;

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
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
    {truncateText(data.title.toUpperCase(), 70)}
    </p>
    <!-- Additional info under the country name -->
    <div class='info'>
        <p class='info-element'>{labelSize}: {data.radius}</p>
        <p class='info-element'>
          {labelAuthor}: 
          {#if data.type === 'study'}
            {truncateText(data.authors.toUpperCase(), 60)}
          {:else if data.type === 'article'}
            {data.publisher.toUpperCase()}
          {/if}
        </p>
    </div>
</div>


<style>
    .tooltip {
      min-width: 130px;
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