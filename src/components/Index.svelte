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
    const dataAll = [...data.studies, ...data.articles, ...data.reddit];

    // FOCUSED TOOLTIPS
    const focusMiddlemiss = data.studies.filter(d => d.authors === "Middlemiss")[0];
    const focusNarvaez = data.articles.filter(d => d.url === "https://www.psychologytoday.com/intl/blog/moral-landscapes/201112/dangers-crying-it-out")[0];
    const focusRedditResearch = data.reddit.filter(d => d.username === "leftpantleg420")[0];
    const focusUmbrellaReview = data.studies.filter(d => d.url === "https://pubmed.ncbi.nlm.nih.gov/35778903/")[0];
    const focusReview = data.studies.filter(d => d.url === "https://aasm.org/resources/practiceparameters/review_nightwakingschildren.pdf")[0];

    // NOTIFICATION LOADING
    let commentsConfused = data.comments.filter(d => d.category === "confused");
    let commentsDivided = data.comments.filter(d => d.category === "divided");
    let commentsCortisol = data.comments.filter(d => d.category === "brain damage");

    // STEP LOGIC
    function SectionIntro(step) {
      switch (true) {
        case step >= 0 && step < 1:
            return {
              renderedData: dataAll,
              focusHover: null,
            }
        case step >= 1 && step < 2:
            return {
              renderedData: dataAll,
              focusHover: focusNarvaez,
            }
        case step >= 5 && step < 6:
            return {
              renderedData: data.reddit,
              focusHover: null,
            }
        case step >= 6 && step < 7:
          return {
              renderedData: data.reddit,
              focusHover: focusRedditResearch,
            }
        case step >= 7 && step < 9:
          return {
              renderedData: data.articles,
              focusHover: null,
            }
        default:
            return {
              renderedData: data.articles,
              focusHover: null
            }
      }
    }
    function SectionStudies(step) {
        switch (true) {
        case step >= 0 && step < 1:
            return {
              renderedData: data.studies,
            }
        case step >= 1 && step < 2:
            return {
              renderedData: data.studies,
              focusHover: focusReview,
            }
        case step >= 3 && step < 4:
            return {
              renderedData: data.studies,
              focusHover: focusUmbrellaReview,
            }
        default:
            return {
              renderedData: data.articles,
              focusHover: null
            }
      }
    }
</script>

<div id="article">
  <h1>{copy.title}</h1>
  <h2>{copy.description}</h2>
  <section>
    <HeroComments notifications={commentsDivided} />
    <div class="spacer"></div>
    <div class="editorial-container">
      <Editorial copy={copy.editorial_intro} />
    </div>    
  </section>
  <section>
    <Section copy={copy.viz_all} stepHandler={SectionIntro} switcher="bubbles" />
  </section>
  <Mosaic album="articles" height=90 />
  <div class="editorial-container">
    <Editorial copy={copy.mosaic_divided} />
  </div> 
  <section>
    <Section copy={copy.viz_studies} stepHandler={SectionStudies} switcher="bubbles" />
    <!-- FOOTNOTE COMPONENT copy.footnote_1 -->
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.editorial_articles_debunk_1} />
  </div> 
  <Mosaic album="debunk" height=35 />
  <div class="editorial-container">
    <Editorial copy={copy.editorial_articles_debunk_2} />
  </div> 
  <!-- <Video video="cbum" />
  <Debunk target="narvaez" /> -->
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
