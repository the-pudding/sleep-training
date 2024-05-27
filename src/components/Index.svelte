<script>
    import { setContext, getContext } from 'svelte';
    import { extent } from 'd3-array';
    import Section from "$components/article/Section.svelte";
    import Debunk from "$components/article/Debunk.svelte";
    import ProductList from "$components/article/ProductList.svelte";
    import Editorial from "$components/article/Editorial.svelte";
    import HeroComments from "$components/article/HeroComments.svelte";
    import Mosaic from "$components/article/Mosaic.svelte";
    import Video from "$components/article/Video.svelte";

    // COPY CONTEXT SETTING
    import copy from '$data/copy.json';
    setContext("copy", copy);

    // DATA IMPORT
    let data = getContext("data");
    const dataAll = [...data.studies, ...data.articles];

    // MIN AND MAX
    console.log(data.studies);
    const extentRadius = extent(dataAll, d => d.radius);
    console.log(extentRadius)

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
        switch (true) {
        case step >= 1 && step < 2:
            return {
              renderedData: data.reddit,
              focusHover: focusRedditResearch,
            }
        case step >= 2 && step < 4:
            return {
              renderedData: data.articles,
              focusHover: null,
            }
        default:
            return {
              renderedData: data.reddit,
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
        case step >= 2 && step < 3:
            return {
              renderedData: data.studies,
              focusHover: null,
            }
        case step >= 3 && step < 4:
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
  <section>
    <div class="editorial-container">
      <Editorial copy={copy.editorial_confusion} notifications={commentsConfused} />
    </div>
  </section>
  <section>
    <Section copy={copy.viz_reddit} stepHandler={SectionReddit} switcher="bubbles" />
  </section>
  <section>
    <Mosaic album="articles" height=70 />
    <div class="editorial-container">
      <Editorial copy={copy.mosaic_divided} />
    </div>
  </section>
  <section>
    <Section copy={copy.viz_studies} stepHandler={SectionStudies} switcher="bubbles" />
    <!-- FOOTNOTE COMPONENT copy.footnote_1 -->
  </section>
  <section>
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
  </section>
  <section>
    <Section copy={copy.viz_studies_middlemiss} stepHandler={SectionMiddlemiss} switcher="bubbles" />
  </section>
  <section>
    <div class="editorial-container">
      <Editorial copy={copy.debunk_narvaez} spacer="none" />
      <Debunk target="narvaez" />
    </div>
    <Video video="cbum" />
    <div class="editorial-container">
      <Editorial copy={copy.mosaic_attachment} notifications={commentsAttachment} />
    </div>
    <Section copy={copy.viz_studies_conclude} stepHandler={SectionPrice} switcher="bubbles" />
  </section>
  <section>
    <div class="editorial-container">
      <Editorial copy={copy.mosaic_thecut} />
    </div>
    <Mosaic album="social" height=35 />
  </section>
  <section>
    <Section copy={copy.chart_instagram} stepHandler={SectionInstagram} switcher="instagram" />
  </section>
  <section>
    <div class="editorial-container">
      <Editorial copy={copy.lazy_parenting} notifications={commentsLazy} />
    </div> 
  </section>
  <section>
    <Section copy={copy.viz_transitions} stepHandler={SectionTransitions} switcher="transitions" />
  </section>
  <section>
    <div class="editorial-container">
      <Editorial copy={copy.editorial_influencerPackages} spacer="none" />
    </div>
    <ProductList />
    <div class="editorial-container">
      <Editorial copy={copy.editorial_conclusion} />
    </div>
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
