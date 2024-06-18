<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { hoveredCircle } from '$stores/misc.js';

    export let point;
    export let focusHover;
    export let color;
    export let animatedIn;

    let hovered;

    $: {
        if (focusHover) {
            if (point.data.info.url == focusHover.url) {
                $hoveredCircle = point
                hovered = $hoveredCircle === point;
            }
            else {
                hovered = null;
            }
        }
    }

    const radiusTween = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

    $: if(animatedIn == true) {
        radiusTween.set(point.r)
    }

    function handleMouseEnter() {
        $hoveredCircle = point
        hovered = true
    }

    function handleMouseLeave() {
        $hoveredCircle = null
        hovered = false
    }

</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<circle  on:mouseleave={() => handleMouseLeave()}
    cx={point.x}
    cy={point.y}
    r={$radiusTween}
    fill={hovered ? "#FFF" : color}
    on:mouseover={() => handleMouseEnter()}
    class="circle-element"
>
</circle>

<style>
    .circle-element {
        cursor: pointer;
    }
</style>