<template>
  <div>
    <Spinner v-if="!items" size="huge" message="Loading..."></Spinner>
    <ul v-else>
      <Item v-for="item in items.results.bindings" v-bind:item="item" v-bind:key="item.itemQ.value"/>
    </ul>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import Item from '../components/Item';
import { RQLanguageItems } from '../queries';

export default {
  name: 'Language',
  components: {
    Spinner,
    Item,
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
};
</script>
