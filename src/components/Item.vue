<template>
  <li>
    <span role="link" v-bind:aria-expanded="open.toString()" v-on:click="toggle()">
      {{ item.itemLabel.value }} <small v-if="item.itemDescription">{{ item.itemDescription.value }}</small>
    </span>
    <section v-bind:class="{ active: open }">
      <video muted controls v-if="data" v-bind:poster="data.thumbnail.source" v-bind:src="data.original.source"></video>
      <a v-if="data" v-bind:href="'https://commons.wikimedia.org/?curid=' + data.pageid">View License (Wikimedia Commons)</a>
      <Spinner v-else message="Loading..."></Spinner>
    </section>
  </li>
</template>

<script>
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Item',
  components: {
    Spinner,
  },
  data: function() {
    return {
      open: false,
      data: false,
    };
  },
  props: {
    item: Object,
  },
  methods: {
    toggle: function() {
      if (!this.data) {
        this.getData();
      }
      this.open = !this.open;
    },

    getData: function() {
      this.$http.commons
        .get(`w/api.php?action=query&format=json&origin=*&prop=pageimages&titles=File:${this.item.fileName.value}&converttitles=1&piprop=thumbnail|name|original&pithumbsize=200`)
        .then(response => {
          const pages = response.data.query.pages;
          this.data = pages[Object.keys(pages)[0]];
        });
    },
  },
};
</script>

<style scoped>
section {
  display: none;
}
/* #TODO no need for css use v-if instead */
section.active {
  display: block;
}
</style>
