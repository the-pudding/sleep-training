<script>
    import { setContext, getContext, onMount } from 'svelte';
    import Section from "$components/article/Section.svelte";
    import Editorial from "$components/article/Editorial.svelte";
    import HeroComments from "$components/article/HeroComment.svelte";
    import Mosaic from "$components/article/Mosaic.svelte";
    import Video from "$components/article/Video.svelte";
    import Debunk from "$components/article/Debunk.svelte";
    import viewport from "$stores/viewport.js";

    // COPY CONTEXT SETTING
    import copy from '$data/copy.json';
    setContext("copy", copy);

    let viewportHeight;
    let mounted;

    // DATA IMPORT
    let data = getContext("data");
    const dataAll = [...data.articles, ...data.studies, ...data.books];

    // FOCUSED TOOLTIPS
    const focusNarvaez = data.articles.filter(d => d.url === "https://www.psychologytoday.com/intl/blog/moral-landscapes/201112/dangers-crying-it-out")[0];
    const focusRedditResearch = data.reddit.filter(d => d.username === "leftpantleg420")[0];
    const focusUmbrellaReview = data.literature_reviews.filter(d => d.url === "https://pubmed.ncbi.nlm.nih.gov/35778903/")[0];
    const focusDouglasReview = data.literature_reviews.filter(d => d.url === "https://pubmed.ncbi.nlm.nih.gov/24042081/")[0];
    // const focusPrice = data.studies.filter(d => d.url === "https://publications.aap.org/pediatrics/article-abstract/130/4/643/30241/Five-Year-Follow-up-of-Harms-and-Benefits-of?redirectedFrom=fulltext")[0];
    const focusMiddleMiss = data.studies.filter(d => d.url === "https://pubmed.ncbi.nlm.nih.gov/21945361/")[0];
    const focusReview = data.literature_reviews.filter(d => d.url === "https://aasm.org/resources/practiceparameters/review_nightwakingschildren.pdf")[0];


    // NOTIFICATION LOADING
    // let commentsConfused = data.comments.filter(d => d.category === "confused");
    let commentsDivided = data.comments.filter(d => d.category === "divided");
    let commentsCortisol = data.comments.filter(d => d.category === "brain damage");
    let commentsAttachment = data.comments.filter(d => d.category === "attachment");
    // let commentsLazy = data.comments.filter(d => d.category === "lazy");
    // let commentsInstagram = data.comments.filter(d => d.category === "instagram");

    // TITLE ANIMATION
    let loaded = false


    // STEP LOGIC
    function SectionMain(step) {
        switch (true) {
        case step < 1 || !step:
            return {
              renderedData: data.reddit,
              focusHover: null,
            }
        case step >= 1 && step < 2:
            return {
              renderedData: data.reddit,
              focusHover: focusRedditResearch,
            }
        case step >= 2 && step < 3:
            return {
              renderedData: data.articles,
              focusHover: null
            }
        case step >= 3 && step < 4:
            return {
              renderedData: data.articles,
              focusHover: focusNarvaez,
            }
        case step >= 3 && step < 6:
            return {
              renderedData: data.books,
              focusHover: null,
            }
        case step >= 6 && step < 7:
            return {
              renderedData: data.literature_reviews,
              focusHover: null
            }
        case step >= 7 && step < 8:
            return {
              renderedData: data.literature_reviews,
              focusHover: focusReview
            }
        case step >= 8 && step < 9:
            return {
              renderedData: data.literature_reviews,
              focusHover: focusUmbrellaReview,
            }
        case step >= 9 && step < 10:
            return {
              renderedData: data.literature_reviews,
              focusHover: focusDouglasReview,
            }
        case step >= 10 && step < 11:
            return {
              renderedData: data.studies,
              focusHover: null
            }
        case step >= 11 && step < 12:
            return {
              renderedData: data.studies,
              focusHover: focusMiddleMiss,
            }
        case step >= 12 && step < 13:
            return {
              renderedData: data.instagram,
              focusHover: null,
            }
        case step >= 14:
            return {
              renderedData: data.studies,
              focusHover: null,
            }
        default:
            return {
              renderedData: data.studies,
              focusHover: null
            }
      }
    }
    function SectionInstagram(step) {
      return {
        renderedData: data.instagram,
        focusHover: null
      }
    }

    onMount(() => {
      viewportHeight = $viewport.height;
      mounted = true;
    })
</script>

{#if mounted}
  <div id="article">
    <HeroComments {viewportHeight} notifications={commentsDivided} />
    <div class="spacer"></div>
    <div class="title-section">
      <h1 class="title title-large" class:loaded>{@html copy.title}</h1>
      <h4 class="title byline" class:loaded>by <a href="https://pudding.cool/author/tom-vaillant">Tom Vaillant</a>, July 14, 2024</h4>
      <h2 class="title dek" class:loaded style="--delay:0.5s;">{copy.description}</h2>
    </div>
    <div class="editorial-container">
      <Editorial copy={copy.intro_article} spacer="none" />
      <Video video="sleep" caption="Tiffany Remington"/>
      <Editorial copy={copy.intro_article_2} />
    </div>    
    <Mosaic {viewportHeight} album="articles" height=75 /> 
    <div class="editorial-container">
      <Editorial copy={copy.intro_article_3} />
    </div>  
    <section>
      <Section {viewportHeight} copy={copy.viz_main} stepHandler={SectionMain} switcher="bubbles" />
      <!-- copyFootnote={copy.footnote_1}  -->
    </section>
    <div class="editorial-container">
      <h3 class="sub-title">Common narratives that are winning on social media</h3>
      <Editorial copy={copy.debunk_intro} spacer="none"/>
      <Debunk target="narvaez" />
      <Debunk target="sears" />
      <Editorial copy={copy.debunk_intro_2} />
    </div>
    <Mosaic {viewportHeight} album="social" height=35 />
    <div class="editorial-container">
      <h3 class="sub-title">Narrative: Sleep Training <span class="oppose">Damages Babies&rsquo; Brains</span></h3>
      <Editorial copy={copy.sears_intro} spacer="none" notifications={commentsCortisol} />
    </div>
    <div class="spacer"></div>
    <Mosaic {viewportHeight} album="posts" height=75 isSocial={true} />
    <div class="editorial-container">
      <h3 class="sub-title">Research: There Is<span class="advocate">No Proof of Harm</span></h3>
      <Editorial copy={copy.debunk_sears} spacer="none" />
    </div>
    <div class="editorial-container">
      <h3 class="sub-title">Narrative: It Creates <span class="oppose">Insecure Attachment</span></h3>
      <Editorial copy={copy.debunk_narvaez} spacer="none" notifications={commentsAttachment} copyFootnote={copy.footnote_narvaez} />
      <Video video="cbum" caption="Chris Williamson" />
      <h3 class="sub-title">Research: There Is<span class="advocate">No Proof of Insecure Attachment</span></h3>
      <Editorial copy={copy.debunk_narvaez_2} spacer="none" />
    </div>
    <div class="editorial-container">
      <h3 class="sub-title">Conclusion</h3>
      <Editorial copy={copy.editorial_conclusion} title="Conclusion" spacer="none" />
      <h3 id="methods" class="sub-title">Methods</h3>
      <Editorial copy={copy.methodologies} />
    </div>
  </div>
{/if}

<style>
	#article {
		/* max-width: 40rem; */
		padding: 16px;
		margin: 0 auto;
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
    font-weight: 700;
    font-size: var(--44px);
    color: #82BCBE;
    color: #aee1f2;
    font-weight: 300;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    text-transform: capitalize;
    font-size: 100px;
    line-height: 1.2;
    margin-top: 100px;
    font-family: 'Tiempos Text Web';
    font-size: 36px;
    text-transform: uppercase;
    color: white;
    letter-spacing: 3px;
    margin-bottom: 100px;
    line-height: 2.2;
  }
  .dek {
    font-weight: 300;
    font-size: 18px;
    color: white;
    font-family: var(--sans);
    line-height: 1.4;
    opacity: 1;
    letter-spacing: -.3px;
    max-width: 360px;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  .spacer {
		height: 5vh;
	}
  .title-section {
    margin: 0 auto;
    max-width: 1500px;
		padding: 16px;
    width: calc(100% - 20px);
    text-align: center;
    margin-bottom: 100px;
  }
  
  .title.loaded {
    opacity: 1;
    transform: translateY(0);
  }
  .byline {
    font-size: 14px;
    color: white;
    opacity: .8;
    font-weight: 300;
    color: white;
    font-family: var(--sans);
    line-height: 1.4;
    letter-spacing: -.3px;
    max-width: 360px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .byline a {
    color: white;
  }

  @media only screen and (max-width: 600px) {
    .title-large {
      font-size: 36px;
    }
    p {
      font-size: 16px !important;
    }
    h3 {
      font-size: 24px;
    }
  }
</style>


