<template>
  <div>
    <h1>Languages<span>List of available languages</span></h1>
    <Spinner v-if="!languages" size="huge" message="Loading..." lineBgColor="#ff7873" textFgColor="#fff" lineFgColor="#fff"></Spinner>
    <ul v-else>
      <LanguageItem v-for="language in languages.results.bindings" v-bind:key="language.langQ.value" v-bind:language="language"></LanguageItem>
    </ul>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import LanguageItem from '../components/LanguageItem';
import { RQ_LANGUAGES } from '../queries';

export default {
  name: 'Home',
  components: {
    Spinner,
    LanguageItem,
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
};
</script>

<style scoped>
div {
    margin: 4rem auto;
    padding: 2rem 3rem 3rem;
    max-width: 500px;
}

h1 {
    font-weight: normal;
    font-size: 2.6rem;
    letter-spacing: 0.05em;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
}

h1 span {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 0.7rem;
    margin-left: 3px;
    margin-top: 0.2rem;
}

ul {
    padding: 0;
    list-style: none;
}
</style>
