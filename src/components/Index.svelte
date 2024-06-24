<script>
    import { setContext, getContext } from 'svelte';
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
    const dataAll = [...data.articles, ...data.studies, ...data.books];

    // FOCUSED TOOLTIPS
    const focusMiddlemiss = data.studies.filter(d => d.authors === "Middlemiss")[0];
    const focusNarvaez = data.articles.filter(d => d.url === "https://www.psychologytoday.com/intl/blog/moral-landscapes/201112/dangers-crying-it-out")[0];
    const focusRedditResearch = data.reddit.filter(d => d.username === "leftpantleg420")[0];
    const focusUmbrellaReview = data.studies.filter(d => d.url === "https://pubmed.ncbi.nlm.nih.gov/35778903/")[0];
    const focusPrice = data.studies.filter(d => d.url === "https://publications.aap.org/pediatrics/article-abstract/130/4/643/30241/Five-Year-Follow-up-of-Harms-and-Benefits-of?redirectedFrom=fulltext")[0];
    const focusReview = data.studies.filter(d => d.url === "https://aasm.org/resources/practiceparameters/review_nightwakingschildren.pdf")[0];
    const focusBrainDamage = data.articles.filter(d => d.url === "https://raisedgood.com/nurture-babies-recover-sleep-training/")[0]

    // NOTIFICATION LOADING
    let commentsConfused = data.comments.filter(d => d.category === "confused");
    let commentsDivided = data.comments.filter(d => d.category === "divided");
    let commentsCortisol = data.comments.filter(d => d.category === "brain damage");
    let commentsAttachment = data.comments.filter(d => d.category === "attachment");
    let commentsLazy = data.comments.filter(d => d.category === "lazy");
    let commentsInstagram = data.comments.filter(d => d.category === "instagram");

    // TITLE ANIMATION
    let loaded = false
    setTimeout(() => {
      loaded = true;
    }, 4000)

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
              renderedData: data.reddit,
              focusHover: focusNarvaez,
            }
        default:
            return {
              renderedData: dataAll,
              focusHover: null
            }
      }
    }
    function SectionMain(step) {
        switch (true) {
        case step >= 0 && step < 3:
            return {
              renderedData: data.reddit,
              focusHover: focusRedditResearch,
            }
        case step >= 3 && step < 7:
            return {
              renderedData: data.articles,
              focusHover: null
            }
        case step >= 7 && step < 9:
            return {
              renderedData: data.studies,
              focusHover: focusReview,
            }
        case step >= 9 && step < 11:
            return {
              renderedData: data.studies,
              focusHover: null
            }
        default:
            return {
              renderedData: data.studies,
              focusHover: null
            }
      }
    }
    // function SectionMiddlemiss(step) {
    //     switch (true) {
    //     case step >= 0 && step < 2:
    //         return {
    //           renderedData: data.studies,
    //           focusHover: focusMiddlemiss,
    //         }
    //     case step >= 2 && step < 3:
    //         return {
    //           renderedData: data.articles,
    //           focusHover: focusBrainDamage,
    //         }
    //     default:
    //         return {
    //           renderedData: data.studies,
    //           focusHover: null
    //         }
    //   }
    // }
    // function SectionPrice(step) {
    //     switch (true) {
    //     case step >= 1 && step < 3:
    //         return {
    //           renderedData: data.studies,
    //           focusHover: focusPrice,
    //         }
    //     default:
    //         return {
    //           renderedData: data.studies,
    //           focusHover: null
    //         }
    //   }
    // }
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
  <HeroComments notifications={commentsDivided} />
  <div class="spacer"></div>
  <div class="title-section">
    <h1 class="title title-large" class:loaded>{copy.title}</h1>
    <h2 class="title" class:loaded style="--delay:0.5s;">{copy.description}</h2>
    <h4 class="title byline" class:loaded>by <a href="https://pudding.cool/author/tom-vaillant">Tom Vaillant</a></h4>
  </div>
  <div class="editorial-container">
    <Editorial copy={copy.intro_article} />
  </div>    
  <section>
    <Section copy={copy.viz_all} stepHandler={SectionIntro} switcher="bubbles" />
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.intro_end} spacer="none" />
    <Mosaic album="articles" height=75 /> 
    <Editorial copy={copy.viz_reddit} spacer="none" title="Research analysis" notifications={commentsConfused} />
  </div>
  <section>
    <Section copy={copy.viz_main} stepHandler={SectionMain} switcher="bubbles" />
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.debunk_intro} />
  </div>
  <Mosaic album="debunk" height=35 /> 
  <div class="editorial-container">
    <Editorial copy={copy.debunk_transition} spacer="none" />
    <Editorial copy={copy.sears_intro} spacer="none" debunk="sears" title="Dr. Sears" notifications={commentsCortisol} />
  </div>
  <div class="spacer"></div>
  <Mosaic album="posts" height=75 isSocial={true} />
  <div class="editorial-container">
    <Editorial copy={copy.debunk_sears} />
  </div>
  <!-- <section>
    <Section copy={copy.viz_studies_middlemiss} stepHandler={SectionMiddlemiss} switcher="bubbles" />
  </section> -->
  <div class="editorial-container">
    <Editorial copy={copy.debunk_narvaez} spacer="none" notifications={commentsAttachment} title="Dr. Narvaez" />
    <Video video="cbum" />
    <Editorial copy={copy.debunk_narvaez_2} debunk="narvaez" />
    <Editorial copy={copy.viz_studies_conclude} />
    <Editorial copy={copy.instagram_1} title="Analysis of Instagram discourse" notifications={commentsInstagram} />
    <Editorial copy={copy.instagram_2} />
  </div>
  <Mosaic album="social" height=35 />
  <section>
    <Section copy={copy.viz_instagram} stepHandler={SectionInstagram} switcher="instagram" />
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.lazy_parenting} notifications={commentsLazy} />
    <Editorial copy={copy.other_arguments}  />
  </div> 
  <section>
    <Section copy={copy.viz_transitions} stepHandler={SectionTransitions} switcher="transitions" />
  </section>
  <div class="editorial-container">
    <Editorial copy={copy.editorial_influencerPackages} spacer="none" />
  </div>
  <Mosaic album="products" height=80 />
  <div class="editorial-container">
    <Editorial copy={copy.editorial_conclusion} />
    <Editorial copy={copy.methodologies} title="Methodology" />
  </div>
</div>

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
    font-family: "Tiempos Text Web";
    font-weight: 700;
    font-size: var(--44px);
    color: #82BCBE;
  }
  h2 {
    font-family: "Tiempos Text Web";
    font-weight: 700;
    font-size: 18px;
    color: white;
  }
  .spacer {
		height: 5vh;
	}
  .title-section {
    margin: 0 auto;
    max-width: 40rem;
		padding: 16px;
  }
  .title {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) var(--delay, 0s), transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) var(--delay, 0s);
  }
  .title.loaded {
    opacity: 1;
    transform: translateY(0);
  }
  .byline {
    font-size: 14px;
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


