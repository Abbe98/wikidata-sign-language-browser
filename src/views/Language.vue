<template>
  <div class="home">
    <Spinner v-if="!items" size="huge" message="Loading..."></Spinner>
    <ul v-else>
      <li v-for="item in items.results.bindings" v-bind:key="item.itemQ.value" tag="li">
        <span role="link" aria-expanded="true">
          {{ item.itemLabel.value }} <small v-if="item.itemDescription">{{ item.itemDescription.value }}</small>
        </span>
        <section>stuff</section>
      </li>
    </ul>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import { RQLanguageItems } from '../queries';

export default {
  name: 'Home',
  components: {
    Spinner,
  },
  asyncComputed: {
    items: {
      get() {
        return this.$http
          .get(`sparql?query=${RQLanguageItems(this.$route.params.id)}`)
          .then(response => response.body);
      },
      default: false,
    },
  },
};
</script>
