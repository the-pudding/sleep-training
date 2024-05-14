<script>
    import { setContext, getContext } from 'svelte';
	import copy from '$data/copy.json';

    import Section from "$components/article/Section.svelte";
    import SectionSwitch from "$components/article/SectionSwitch.svelte";
    import Editorial from "$components/article/Editorial.svelte";
    import HeroComments from "$components/article/HeroComments.svelte";

    // DATA IMPORT
    let data = getContext("data")

    // COPY CONTEXT SETTING
    setContext("copy", copy);

    // DATA FILTERING
    let commentsConfused = data.comments.filter(d => d.category === "confused");
    let commentsDivided = data.comments.filter(d => d.category === "divided");
</script>

<div id="article">
    <section>
        <HeroComments notifications={commentsDivided} />
    </section>
    <section>
        <h1>Is sleep training harmful?</h1>
        <Section copy={copy.intro} />
    </section>
	<section>
		<div class="editorial-container">
			<Editorial copy={copy.part_2} notifications={commentsConfused} />
		</div>
	</section>
	<section>
        <Section copy={copy.part_3} />
	</section>
    <section>
        <SectionSwitch copy={copy.part_3} />
    </section>
	<!-- <Footer /> -->
</div>

<style>
	#article {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
	}

	:global(#article section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#article h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}
    section {
        position: relative;
        margin-top: 1.5vh;
        margin-bottom: 1.5vh;
    }
</style>
