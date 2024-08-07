<script>
    import { setContext, getContext, onMount } from 'svelte';
    import Section from "$components/article/Section.svelte";
    import Editorial from "$components/article/Editorial.svelte";
    import HeroComments from "$components/article/HeroComment.svelte";
    import Mosaic from "$components/article/Mosaic.svelte";
    import Video from "$components/article/Video.svelte";
    import Debunk from "$components/article/Debunk.svelte";
    import viewport from "$stores/viewport.js";
    import Footer from "$components/footer/Footer.svelte"

    // COPY CONTEXT SETTING
    import copy from '$data/copy.json';
    setContext("copy", copy);

    let viewportHeight;
    let mounted;

    // DATA IMPORT
    let data = getContext("data");

    // FOCUSED TOOLTIPS
    const focusNarvaez = data.articles.filter(d => d.url === "https://www.psychologytoday.com/intl/blog/moral-landscapes/201112/dangers-crying-it-out")[0];
    const focusRedditResearch = data.reddit.filter(d => d.username === "leftpantleg420")[0];
    const focusUmbrellaReview = data.literature_reviews.filter(d => d.url === "https://pubmed.ncbi.nlm.nih.gov/35778903/")[0];
    const focusDouglasReview = data.literature_reviews.filter(d => d.url === "https://pubmed.ncbi.nlm.nih.gov/24042081/")[0];
    const focusBook = data.books.filter(d => d.title === "Getting Your Child to Sleep... and Back to Sleep")[0];
    const focusMiddleMiss = data.studies.filter(d => d.url === "https://pubmed.ncbi.nlm.nih.gov/21945361/")[0];
    const focusReview = data.literature_reviews.filter(d => d.url === "https://aasm.org/resources/practiceparameters/review_nightwakingschildren.pdf")[0];


    // NOTIFICATION LOADING
    // let commentsConfused = data.comments.filter(d => d.category === "confused");
    let commentsDivided = data.comments.filter(d => d.category === "divided");
    let commentsCortisol = data.comments.filter(d => d.category === "brain damage");
    let commentsAttachment = data.comments.filter(d => d.category === "attachment");
    let commentsInstagram = data.comments.filter(d => d.category === "instagram");
    let commentsConclusion = data.comments.filter(d => d.category === "conclusion");

    // TITLE ANIMATION
    let loaded = false


    // STEP LOGIC
    function SectionMain(step) {
        switch (true) {
        case step < 1 || !step:
            return {
              renderedData: data.reddit,
              focusHover: null,
              caption: 'Bubble chart of user opinions on Reddit, heavily divided.'
            }
        case step >= 1 && step < 2:
            return {
              renderedData: data.reddit,
              focusHover: focusRedditResearch,
              caption: 'Bubble chart of user opinions on Reddit, heavily divided.'
            }
        case step >= 2 && step < 3:
            return {
              renderedData: data.articles,
              focusHover: null,
              caption: 'Bubble chart of user opinions on news articles, heavily divided.'
            }
        case step >= 3 && step < 4:
            return {
              renderedData: data.articles,
              focusHover: focusNarvaez,
              caption: 'Bubble chart of user opinions on Reddit, heavily divided.'
            }
        case step >= 4 && step < 5:
            return {
              renderedData: data.books,
              focusHover: null,
              caption: 'Bubble chart of author opinions on books, heavily divided.'
            }
        case step >= 5 && step < 6:
            return {
              renderedData: data.books,
              focusHover: focusBook,
              caption: 'Bubble chart of author opinions on books, heavily divided.'
            }
        case step >= 6 && step < 7:
            return {
              renderedData: data.literature_reviews,
              focusHover: null,
              caption: 'Bubble chart of medical positions on sleep training literature reviews, almost entirely advocating.'
            }
        case step >= 7 && step < 8:
            return {
              renderedData: data.literature_reviews,
              focusHover: focusReview,
              caption: 'Bubble chart of medical positions on sleep training literature reviews, almost entirely advocating.'
            }
        case step >= 8 && step < 9:
            return {
              renderedData: data.literature_reviews,
              focusHover: null,
              caption: 'Bubble chart of medical positions on sleep training literature reviews, almost entirely advocating.'
            }
        case step >= 9 && step < 10:
            return {
              renderedData: data.literature_reviews,
              focusHover: focusUmbrellaReview,
              caption: 'Bubble chart of medical positions on sleep training literature reviews, almost entirely advocating.'
            }
        case step >=10 && step < 11:
            return {
              renderedData: data.literature_reviews,
              focusHover: focusDouglasReview,
              caption: 'Bubble chart of medical positions on sleep training literature reviews, almost entirely advocating.'
            }
        case step >= 11 && step < 12:
            return {
              renderedData: data.studies,
              focusHover: null,
              caption: 'Bubble chart of medical positions in sleep training medical studies, almost entirely advocating.'
            }
        case step >= 12 && step < 14:
            return {
              renderedData: data.studies,
              focusHover: focusMiddleMiss,
              caption: 'Bubble chart of medical positions in sleep training medical studies, almost entirely advocating.'
            }
        case step >= 14 && step < 16:
            return {
              renderedData: data.instagram,
              focusHover: null,
              caption: 'Bubble chart of opinions from Instagram influencers posting about sleep training, heavily divided.'
            }
        case step >= 18:
            return {
              renderedData: [data.studies,data.reddit],
              focusHover: null,
              caption: 'Nested bubble chart comparing the medical consensus with the division of internet opinions on Reddit.'
            }
        default:
            return {
              renderedData: data.studies,
              focusHover: null
            }
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
      <h2 class="title dek" class:loaded style="--delay:0.5s;">{copy.description}</h2>
      <p class="title byline" class:loaded>by <a href="https://pudding.cool/author/tom-vaillant">Tom Vaillant</a>, July 14, 2024</p>
    </div>
    <div class="editorial-container">
      <Editorial first={true} copy={copy.intro_article} spacer="none" />
      <Video video="sleep" caption="Tiffany Remington" aria-label="TikTok influencer Tiffany films herself as she rocks her baby to sleep, emotionally wrought after many sleepless nights she gives up and decides to start sleep training." />
      <Editorial copy={copy.intro_article_2} />
    </div>    
    <Mosaic {viewportHeight} album="articles" height=75 /> 
    <div class="editorial-container">
      <Editorial copy={copy.intro_article_3} />
    </div>  
    <section>
      <Section {viewportHeight} copy={copy.viz_main} stepHandler={SectionMain} switcher="bubbles" />
    </section>
    <div class="editorial-container">
      <h3 class="sub-title">Common narratives that are winning on social media</h3>
      <Editorial copy={copy.debunk_intro} spacer="none"/>
      <Debunk target="narvaez" />
      <Debunk target="sears" />
      <Editorial copy={copy.debunk_intro_2} spacer="none" notifications={commentsInstagram} />
    </div>
    <Mosaic {viewportHeight} album="social" height=35 />
    <div class="editorial-container">
      <h3 class="sub-title sub-title-smaller">Narrative: Sleep Training <span class="oppose">Damages Babies&rsquo; Brains</span></h3>
      <Editorial copy={copy.sears_intro} spacer="none" notifications={commentsCortisol} />
    </div>
    <div class="spacer"></div>
    <Mosaic {viewportHeight} album="posts" height=75 isSocial={true} />
    <div class="editorial-container">
      <h3 class="sub-title sub-title-smaller">Research: There is <span class="advocate">No Proof of Harm</span></h3>
      <Editorial copy={copy.debunk_sears} spacer="none" />
    </div>
    <!-- <div class="img-container">
      <img src="assets/images/crib.webp" alt="Image of baby in crib" />
    </div> -->
    <!-- <div class="caption">Photo by Marie Despeyroux on <a href="https://unsplash.com/photos/babys-white-wooden-crib-lowlight-photography-2xuyxsLNFOU" target="_blank">Unsplash</a></div> -->
    <div class="editorial-container">
      <h3 class="sub-title sub-title-smaller">Narrative: It Creates <span class="oppose">Insecure Attachment</span></h3>
      <Editorial copy={copy.debunk_narvaez} spacer="none" notifications={commentsAttachment} />
      <Video video="cbum" caption="Chris Williamson"  aria-label="Fitness athlete and influencer Cbum talks to Chris about his opinion on sleep training, denouncing it as causing attachment issues for babies." />
      <h3 class="sub-title sub-title-smaller">Research: There is <span class="advocate">No Proof of Insecure Attachment</span></h3>
      <Editorial copy={copy.debunk_narvaez_2} spacer="none" />
    </div>
    <div class="editorial-container conclusion">
      <h3 class="sub-title">It&rsquo;s your decision</h3>
      <Editorial copy={copy.editorial_conclusion} spacer="none" />
      <Editorial copy={copy.editorial_conclusion_2} spacer="none" notifications={commentsConclusion} />
      <h3 id="methods" class="sub-title sub-title-smaller">Methods</h3>
      <Editorial methods={true} copy={copy.methodologies} />
    </div>
  </div>
  <Footer backgroundColor={"#f7f7f7"} storyRecirculation={true} />
{/if}

<style>
  .conclusion {
    margin-top: 200px;
  }
	#article {
		/* max-width: 40rem; */
		/* padding: 16px; */
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
    margin-bottom: 15px;
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
  .img-container {
    height: 60vh;
    margin-top: 15vh;
  }
  .img-container img {
    height: 100% !important;
    width: 100% !important;
    object-fit: cover;
  }

  @media only screen and (max-width: 600px) {
    .title-large {
      font-size: 36px;
      line-height: 1.9;
    }
    p {
      font-size: 16px !important;
    }
    h3 {
      font-size: 24px;
    }
  }
</style>


