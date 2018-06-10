<template>
  <div>
    <h1>Languages<span>List of available languages</span></h1>
    <Spinner v-if="!languages" size="huge" message="Loading..." lineBgColor="#ff7873" textFgColor="#fff" lineFgColor="#fff"></Spinner>
    <ul v-else>
      <LanguageItem v-for="language in languages.results.bindings" v-bind:key="language.langQ.value" v-bind:language="language"></LanguageItem>
    </ul>
    <Footer />
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import LanguageItem from '../components/LanguageItem';
import Footer from '../components/Footer';
import { RQ_LANGUAGES } from '../queries';

export default {
  name: 'Home',
  components: {
    Spinner,
    LanguageItem,
    Footer,
  },
  data: function() {
    return {
      open: false,
    };
  },
  methods: {
    toggle: function() {
      this.open = !this.open;
    },
  },
  asyncComputed: {
    languages: {
      get() {
        return this.$http.wdqs
          .get(`sparql?query=${RQ_LANGUAGES}`)
          .then(response => response.data);
      },
      default: false,
    },
  },
  created: function() {
    document.title = 'Sign Language Browser';
  },
};
</script>
