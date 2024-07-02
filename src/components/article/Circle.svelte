<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { hoveredCircle } from '$stores/misc.js';

    export let point;
    export let focusHover;
    export let color;
    export let animatedIn;
    export let i;
    export let nodesLength;

    let hovered;
    let focusHoverPoint;

    $: {
        if (focusHover) {
            if (point.data.info.url == focusHover.url) {
                focusHoverPoint = point;
                $hoveredCircle = focusHoverPoint;
                
                // hovered = $hoveredCircle === point;
            }
        }
        else {
            hovered = false;
        }
    }

    $: {
        if(focusHoverPoint && $hoveredCircle){
            if (point.data.info.url == $hoveredCircle.data.info.url) {
                hovered = true;
            }
            else {
                hovered = false;
            }
        }
    }

    

    let outlineColor = {
        "Advocate": "#0d381f",
        "Neutral":"#4f3a0f",
        "Oppose":"#54241c"
    }   

    const radiusTween = tweened(0, {
		duration: 400,
		easing: cubicOut,
        delay:1000+(i/nodesLength)*400
	});

    const opacityTween = tweened(0, {
		duration: 400,
		easing: cubicOut,
        delay:1000+(i/nodesLength)*400
	});

    $: if(animatedIn == true) {
        radiusTween.set(point.r, {duration:400,delay:400+(i/nodesLength)*1000})
        opacityTween.set(.8, {duration:400,delay:400+(i/nodesLength)*1000})

    } else {
        radiusTween.set(0, {duration:500, easing: cubicOut, delay: 0});
        opacityTween.set(0, {duration:400,delay:0})

    }

    function handleMouseEnter() {
        // console.log(point)
        focusHoverPoint = point;
        $hoveredCircle = point
        hovered = true
    }

    function handleMouseLeave() {
        if(focusHover){
            $hoveredCircle = focusHoverPoint;
        } else {
            $hoveredCircle = null
        }
        
        hovered = false
    }

</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<circle  on:mouseleave={() => handleMouseLeave()}
    cx={point.x}
    cy={point.y}
    data-r={point.data.info.radius}
    r={$radiusTween}
    fill={hovered ? "#FFF" : color}
    fill-opacity={$opacityTween}
    on:mouseover={() => handleMouseEnter()}
    class="circle-element"
>
</circle>

<style>
    .circle-element {
        cursor: pointer;
        stroke: #1A2E3C;
        stroke-width: 3px;
    }
</style>