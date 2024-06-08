<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';

    export let point;
    export let color;
    export let animatedIn;

    const radiusTween = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

    $: if(animatedIn == true) {
        radiusTween.set(point.r)
    }
    

</script>

<circle
    cx={point.x}
    cy={point.y}
    r={$radiusTween}
    fill={color}
>
</circle>