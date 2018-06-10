<template>
  <div>
    <h1>{{ language }}<span>List of available words</span></h1>
    <Spinner v-if="!items" size="huge" message="Loading..." lineBgColor="#ff7873" textFgColor="#fff" lineFgColor="#fff"></Spinner>
    <ul v-else>
      <Item v-for="item in items.results.bindings" v-bind:item="item" v-bind:key="item.itemQ.value"/>
    </ul>
    <Footer />
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import Item from '../components/Item';
import Footer from '../components/Footer';
import { RQLanguageItems } from '../queries';

export default {
  name: 'Language',
  components: {
    Spinner,
    Item,
    Footer,
  },
  data: function() {
    return {
      language: false,
    };
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
  created: function() {
    this.$http.wikidata
      .get(`w/api.php?action=wbsearchentities&search=${this.$route.params.id}&language=en&origin=*&format=json`)
      .then(response => {
        this.language = response.data.search[0].label;
        document.title = response.data.search[0].label;
      });
  },
};
</script>
