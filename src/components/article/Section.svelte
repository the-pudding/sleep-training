<script>
    import { getContext, onMount } from 'svelte';
    import ScrollSection from './ScrollSection.svelte';

    export let copy;
    export let stepHandler;
    export let switcher;
    export let viewportHeight;

    let mounted = false;

    let data = getContext("data").studies;
    let dataMap = data.map(d => Object.assign({}, d));

    onMount(() => {
        mounted = true;
    })

</script>


{#if mounted && stepHandler}
    <!-- THIS FEELS CLEANER TO ME -->
    <ScrollSection {viewportHeight} {switcher} {stepHandler} {copy} {dataMap} />
{/if}
