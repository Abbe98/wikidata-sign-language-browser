<template>
  <div>
    <h1>Flashcards<span>{{ language }} flashcards</span></h1>
    <Spinner v-if="!items" size="huge" message="Loading..." lineBgColor="#ff7873" textFgColor="#fff" lineFgColor="#fff"></Spinner>
    <div v-else class="card" v-bind:class="{ flipped: isFlipped }">

      <div class="front" v-show="!flippingIsDone">
        <video v-if="activePage && isVideo(activePage.original.source)" muted="muted" controls="controls" v-bind:poster="activePage.thumbnail.source" v-bind:src="activePage.original.source"></video>
        <img v-else-if="activePage" :src="activePage.original.source" />
        <a v-if="activePage" class="btn" v-bind:href="'https://commons.wikimedia.org/?curid=' + activePage.pageid">View License (Wikimedia Commons)</a>
        <button v-if="activePage" class="btn flip" v-on:click="flip">Flip</button>
        <Spinner v-else message="Loading..." lineBgColor="#ff7873" textFgColor="#fff" lineFgColor="#fff"></Spinner>
      </div>

      <div class="back">
        <h2 v-if="activeItem && isFlipped">{{ activeItem.itemLabel.value }}<small>{{ activeItem.itemDescription.value }}</small></h2>
        <button class="btn flip" v-on:click="flip">Flip</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import Footer from '../components/Footer';
import { RQLanguageItems } from '../queries';
import { isVideo } from '../helpers';

export default {
  name: 'Cards',
  components: {
    Spinner,
    Footer,
  },
  data: function() {
    return {
      language: false,
      isFlipped: false,
      flippingIsDone: false,
      activeItem: false,
      activePage: false,
    };
  },
  created: function() {
    this.$http.wikidata
      .get(`w/api.php?action=wbsearchentities&search=${this.$route.params.id}&language=en&origin=*&format=json`)
      .then(response => {
        this.language = response.data.search[0].label;
        document.title = this.language + ' Flashcards';
      });
  },
  asyncComputed: {
    items: {
      get() {
        return this.$http.wdqs
          .get(`sparql?query=${RQLanguageItems(this.$route.params.id)}`)
          .then(response => response.data);
      },
      default: false,
    },
  },
  watch: {
    items: function(val) {
      if (val) this.setRandomItem();
     },
  },
  methods: {
    isVideo: isVideo,

    flip: function() {
      this.isFlipped = !this.isFlipped;
      this.flippingIsDone = false;

      if (this.isFlipped) {
        setTimeout(() => {
          this.flippingIsDone = true;
        }, 500);
      } else {
        this.setRandomItem();
      }
    },

    setRandomItem: function() {
      const items = this.items.results.bindings;
      this.activeItem = items[Math.floor(Math.random() * items.length)];

      this.$http.commons
        .get(`w/api.php?action=query&format=json&origin=*&prop=pageimages&titles=File:${this.activeItem.fileName.value}&converttitles=1&piprop=thumbnail|name|original&pithumbsize=400`)
        .then(response => {
          const pages = response.data.query.pages;
          this.activePage = pages[Object.keys(pages)[0]];
        });
    },
  },
};
</script>

<style scoped>
.card {
    margin: 1.1rem;
    height: 550px;
    transform-style: preserve-3d;
    transition: transform 1s;
    transform-origin: right center;
    border: 1px solid rgba(255, 255, 255, .3);
    max-height: 60vh;
}

.card > div {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background: #ff7873;
    padding: 1.1rem;
    box-sizing: border-box;
}

.card .back {
    transform: rotateX(180deg);
}

.card .front {
    text-align: center;
}

.card.flipped {
    transform: rotateX(-180deg);
}

video {
    width: 100%;
}

.btn {
    margin-top: 1.1rem;
    width: calc(100% - 7px);
}

.btn.flip {
    position: absolute;
    bottom: 1.3rem;
    left: 1.1rem;
    width: calc(100% - 5px - 2.2rem);
    height: 6rem;
}

h2 {
    margin: 3rem auto;
    font-weight: normal;
    font-size: 1.4rem;
    letter-spacing: 0.05em;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
}

h2 small {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 0.7rem;
    margin-left: 3px;
    margin-top: 0.2rem;
}
</style>
