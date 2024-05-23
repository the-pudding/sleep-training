<script>
    import { setContext, getContext } from 'svelte';
    import Section from "$components/article/Section.svelte";
    import Debunk from "$components/article/Debunk.svelte";
    import Editorial from "$components/article/Editorial.svelte";
    import HeroComments from "$components/article/HeroComments.svelte";
    import Mosaic from "$components/article/Mosaic.svelte";
    import Video from "$components/article/Video.svelte";

    // COPY CONTEXT SETTING
    import copy from '$data/copy.json';
    setContext("copy", copy);

    // DATA IMPORT
    let data = getContext("data");

    // FOCUSED TOOLTIPS
    let focusMiddlemiss = data.studies.filter(d => d.authors === "Middlemiss")[0];

    // NOTIFICATION LOADING
    let commentsConfused = data.comments.filter(d => d.category === "confused");
    let commentsDivided = data.comments.filter(d => d.category === "divided");
    let commentsCortisol = data.comments.filter(d => d.category === "brain damage");

    // STEP LOGIC
    function Section1(step) {
      switch (true) {
        case step >= 0 && step <= 1:
            return {
              renderedData: data.articles,
              focusHover: null,
            }
        case step >= 1 && step <= 2:
            return {
              renderedData: data.studies,
              focusHover: focusMiddlemiss
            }
        default:
            return {
              renderedData: data.articles,
              focusHover: null
            }
      }
    }
    function Section2(step) {
        switch (true) {
        case step >= 1 && step <= 2:
            return {
              renderedData: data.articles,
            }
        default:
            return {
              renderedData: data.studies,
              focusHover: null
            }
      }
    }
</script>

<div id="article">
  <h1>Is sleep training harmful?</h1>
  <h2>Misinformation and facts behind the internets most polarising parenting debate.</h2>
  <section>
    <HeroComments notifications={commentsDivided} />
    <div class="spacer"></div>
    <div class="editorial-container">
      <Editorial copy={copy.editorial_intro} />
    </div>    
  </section>
  <Mosaic album="articles" />
  <Video video="cbum" />
  <section>
    <Section copy={copy.viz_all} stepHandler={Section1} switcher="bubbles" />
  </section>
	<section>
    <div class="editorial-container">
			<Editorial copy={copy.mosaic_cortisol} notifications={commentsCortisol} />
		</div>
    <Section copy={copy.viz_reddit} stepHandler={Section2} switcher="bubbles" />
	</section>
  <section>
    <Section copy={copy.viz_studies} stepHandler={Section1} switcher="other" />
  </section>
  <Debunk target="narvaez" />
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
		padding: 0 8px;
	}
  section {
    position: relative;
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
  }
  h1 {
    font-family: "Tiempos Text Web";
    font-weight: 700;
    font-size: var(--44px);
    color: #4FB477;
  }
  h2 {
    font-family: "Tiempos Text Web";
    font-weight: 700;
    font-size: 14px;
  }
  .spacer {
		height: 5vh;
	}
</style>
