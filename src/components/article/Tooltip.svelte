<script>
    export let data;
    export let colorScale;
    export let width;

    import { fly, fade } from "svelte/transition";

    let tooltipWidth;

    const xNudge = 5;
    const yNudge = 5;

    // If the x position + the tooltip width exceeds the chart width, offset backward to prevent overflow
    $: xPosition =
        data.x + tooltipWidth + xNudge > width
        ? data.x - tooltipWidth - xNudge
        : data.x + xNudge;
    $: yPosition = data.y + yNudge;

    $: {
      console.log(data.authors);
    }

    $: label = data.type === 'study' ? 'participants' : data.type === 'article' ? 'backlinks' : null;

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
    <h1>
    {truncateText(data.title, 50)}
    </h1>
    <!-- Additional info under the country name -->
    <div class='info'>
        <p>
          {label}
          {data.radius}
        </p>
        <p class="author">
          Authors
        {truncateText(data.authors, 50)}
        </p>
        <a class="link" href="{data.url}" style="background: {colorScale(data.position)}">
            Link
        </a> 
    </div>
</div>


<style>
    .tooltip {
      max-width: 40%;
      position: absolute;
      pointer-events: none;
      padding: 8px 6px;
      background: white;
      box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
      border-radius: 3px;
      min-width: 130px;
      transition: top 300ms ease, left 300ms ease;
    }
  
    h1 {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 3px;
    }
  
    .info {
      display: flex;
      justify-content: space-between;
      column-gap: 8px;
    }
  
    .author {
      font-size: 0.8rem;
      color: black;
    }
  
    .link {
      font-size: 0.65rem;
      height: 25px;
      padding: 3px 4px 2px 4px;
      border-radius: 3px;
      text-transform: uppercase;
      white-space: nowrap;
    }
  </style>