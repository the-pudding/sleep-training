<script>
    import { getContext, onMount } from 'svelte';
    import ScrollSection from './ScrollSection.svelte';

    export let copy;
    export let stepHandler;
    export let switcher;

    let mounted = false;

    let data = getContext("data").studies;
    // TIMELINE DATA
    let dataTimeline = data.map(d => Object.assign({}, d));
    // MAP DATA
    let dataMap = data.map(d => Object.assign({}, d));

    onMount(() => {
        mounted = true;
    })

</script>


{#if mounted && stepHandler}
    <!-- THIS FEELS CLEANER TO ME -->
    <ScrollSection {switcher} {stepHandler} {copy} {dataTimeline} {dataMap} />
{/if}
