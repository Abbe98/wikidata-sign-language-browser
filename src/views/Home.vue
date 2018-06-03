<template>
  <div class="home">
    <Spinner v-if="!languages" size="huge" message="Loading..."></Spinner>
    <ul v-else>
      <router-link v-for="language in languages.results.bindings" v-bind:key="language.langQ.value" tag="li" v-bind:to="'lang/' + language.langQ.value">
        <a>{{ language.langLabel.value }} <span>{{ language.count.value }}</span></a>
      </router-link>
    </ul>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import { RQ_LANGUAGES } from '../queries';

export default {
  name: 'Home',
  components: {
    Spinner,
  },
  asyncComputed: {
    languages: {
      get() {
        return this.$http
          .get(`sparql?query=${RQ_LANGUAGES}`)
          .then(response => response.body);
      },
      default: false,
    },
  },
};
</script>
