<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { hoveredCircle } from '$stores/misc.js';

    export let point;
    export let animatedIn;
    export let i;
    export let nodesLength;

    let hovered;
    let focusHoverPoint;


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
        opacityTween.set(.04, {duration:400,delay:400+(i/nodesLength)*1000})

    } else {
        radiusTween.set(0, {duration:500, easing: cubicOut, delay: 0});
        opacityTween.set(0, {duration:400,delay:0})
    }


</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<circle 
    cx={point.x}
    cy={point.y}
    r={$radiusTween}
    fill='#FFFFFF'
    fill-opacity={$opacityTween}
    class="circle-element"
>
</circle>

<style>
    .circle-element {
        cursor: pointer;
        pointer-events: none;
        stroke: #1A2E3C;
        stroke-width: 3px;
    }
</style>