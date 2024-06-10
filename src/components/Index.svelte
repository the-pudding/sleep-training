<script>
    import { setContext, getContext } from 'svelte';
    import Section from "$components/article/Section.svelte";
    import Debunk from "$components/article/Debunk.svelte";
    import ProductList from "$components/article/ProductList.svelte";
    import Editorial from "$components/article/Editorial.svelte";
    import HeroComments from "$components/article/HeroComments.svelte";
    import Mosaic from "$components/article/Mosaic.svelte";
    import Video from "$components/article/Video.svelte";
    import ForceBubbles from "$components/article/ForceBubbles.svelte"

    // COPY CONTEXT SETTING
    import copy from '$data/copy.json';
    setContext("copy", copy);

    // DATA IMPORT
    let data = getContext("data");
    const dataAll = [...data.articles, ...data.reddit];

    // FOCUSED TOOLTIPS
    const focusMiddlemiss = data.studies.filter(d => d.authors === "Middlemiss")[0];
    const focusNarvaez = data.articles.filter(d => d.url === "https://www.psychologytoday.com/intl/blog/moral-landscapes/201112/dangers-crying-it-out")[0];
    const focusRedditResearch = data.reddit.filter(d => d.username === "leftpantleg420")[0];
    const focusUmbrellaReview = data.studies.filter(d => d.url === "https://pubmed.ncbi.nlm.nih.gov/35778903/")[0];
    const focusPrice = data.studies.filter(d => d.url === "https://publications.aap.org/pediatrics/article-abstract/130/4/643/30241/Five-Year-Follow-up-of-Harms-and-Benefits-of?redirectedFrom=fulltext")[0];
    const focusReview = data.studies.filter(d => d.url === "https://aasm.org/resources/practiceparameters/review_nightwakingschildren.pdf")[0];

    // NOTIFICATION LOADING
    let commentsConfused = data.comments.filter(d => d.category === "confused");
    let commentsDivided = data.comments.filter(d => d.category === "divided");
    let commentsCortisol = data.comments.filter(d => d.category === "brain damage");
    let commentsAttachment = data.comments.filter(d => d.category === "attachment");
    let commentsLazy = data.comments.filter(d => d.category === "lazy");

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
        default:
            return {
              renderedData: dataAll,
              focusHover: null
            }
      }
    }
    function SectionReddit(step) {
      return {
        renderedData: data.reddit,
        focusHover: null
      }
    }
    function SectionArticles(step) {
      return {
        renderedData: data.articles,
        focusHover: null
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
        case step >= 2 && step < 3:
            return {
              renderedData: data.studies,
              focusHover: focusUmbrellaReview,
            }
        default:
            return {
              renderedData: data.studies,
              focusHover: null
            }
      }
    }
    function SectionMiddlemiss(step) {
        switch (true) {
        case step >= 1 && step < 2:
            return {
              renderedData: data.studies,
              focusHover: focusMiddlemiss,
            }
        default:
            return {
              renderedData: data.studies,
              focusHover: null
            }
      }
    }
    function SectionPrice(step) {
        switch (true) {
        case step >= 1 && step < 3:
            return {
              renderedData: data.studies,
              focusHover: focusPrice,
            }
        default:
            return {
              renderedData: data.studies,
              focusHover: null
            }
      }
    }
    function SectionTransitions(step) {
      return {
        renderedData: data.studies,
        focusHover: null
      }
    }
    function SectionInstagram(step) {
      return {
        renderedData: data.instagram,
        focusHover: null
      }
    }
</script>

<div id="article">
  <!-- <ForceBubbles /> -->
  <h1>{copy.title}</h1>
  <h2>{copy.description}</h2>
  <HeroComments notifications={commentsDivided} />
  <div class="spacer"></div>
  <div class="editorial-container">
    <Editorial copy={copy.editorial_intro} />
  </div>    
  <section>
    <Section copy={copy.viz_all} stepHandler={SectionIntro} switcher="bubbles" />
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.editorial_advocate} spacer="none" />
    <h3 class="sub-title">Reddit data</h3>
    <Editorial copy={copy.viz_reddit} spacer="none" />
  </div>
  <section>
    <Section stepHandler={SectionReddit} switcher="bubbles-fixed" />
  </section>
  <div class="editorial-container" spacer="none" >
    <Editorial copy={copy.viz_reddit_comments} notifications={commentsConfused} />
  </div>
  <div class="editorial-container">
    <h3 class="sub-title">News data</h3>
    <Editorial copy={copy.viz_articles} spacer="none" />
  </div>
  <section>
    <Section stepHandler={SectionArticles} switcher="bubbles-fixed" />
  </section>
  <Editorial copy={copy.editorial_clickbait} />
    <Mosaic album="articles" height=70 />
    <div class="editorial-container">
      <Editorial copy={copy.editorial_against} />
    </div>
  <div class="editorial-container">
    <h3 class="sub-title">Medical data</h3>
    <Editorial copy={copy.editorial_medical} />
  </div>
  <section>
    <Section copy={copy.viz_studies} stepHandler={SectionStudies} switcher="bubbles" />
    <!-- FOOTNOTE COMPONENT copy.footnote_1 -->
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.editorial_articles_debunk_1} />
  </div> 
  <Mosaic album="debunk" height=25 />
  <div class="editorial-container">
    <Editorial copy={copy.debunk_sears} spacer="none" />
    <Debunk target="sears" />
  </div>
  <div class="editorial-container">
    <Editorial copy={copy.editorial_brain_damage} notifications={commentsCortisol} />
  </div>
  <div class="spacer"></div>
  <Mosaic album="posts" height=75 isSocial={true} />
  <div class="editorial-container">
    <Editorial copy={copy.mosaic_cortisol} />
  </div>
  <section>
    <Section copy={copy.viz_studies_middlemiss} stepHandler={SectionMiddlemiss} switcher="bubbles" />
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.debunk_narvaez} spacer="none" notifications={commentsAttachment} />
    <Video video="cbum" />
  </div>
  <div class="editorial-container">
    <Editorial copy={copy.debunk_narvaez_2} spacer="none" />
    <Debunk target="narvaez" />
  </div>
  <section>
    <Section copy={copy.viz_studies_conclude} stepHandler={SectionPrice} switcher="bubbles" />
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.mosaic_thecut} />
  </div>
  <Mosaic album="social" height=35 />
  <section>
    <Section copy={copy.chart_instagram} stepHandler={SectionInstagram} switcher="instagram" />
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.lazy_parenting} notifications={commentsLazy} />
  </div> 
  <section>
    <Section copy={copy.viz_transitions} stepHandler={SectionTransitions} switcher="transitions" />
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.editorial_influencerPackages} spacer="none" />
  </div>
  <ProductList />
  <div class="editorial-container">
    <Editorial copy={copy.editorial_conclusion} />
  </div>
	<!-- <Footer /> -->
</div>

<style>
	#article {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
	}
	/* :global(#article section) {
		margin: 32px auto;
		padding-top: 32px;
	} */
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
  .sub-title {
    font-size: 28px;
    margin-top: 6vh;
  }
</style>
