<script>
    export let copy;
</script>

{#if copy != undefined}
    <div class="footnote">
        <p>{copy}</p>
    </div>
{/if}

<style>
    .footnote {
        font-size: 12px;
        font-weight: 200;
        opacity: 0.8;
    }
</style>