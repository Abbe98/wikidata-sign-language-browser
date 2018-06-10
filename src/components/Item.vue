<template>
  <li class="item">
    <span role="link" v-bind:aria-expanded="open.toString()" v-on:click="toggle()">
      {{ item.itemLabel.value }} <br><small v-if="item.itemDescription">{{ item.itemDescription.value }}</small>
    </span>
    <section v-if="open">
      <video muted controls v-if="data" v-bind:poster="data.thumbnail.source" v-bind:src="data.original.source"></video>
      <a class="btn" v-if="data" v-bind:href="'https://commons.wikimedia.org/?curid=' + data.pageid">View License (Wikimedia Commons)</a>
      <Spinner v-else message="Loading..." lineBgColor="#ff7873" textFgColor="#fff" lineFgColor="#fff"></Spinner>
    </section>
  </li>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import { EventBus } from '../event-bus.js';

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
      EventBus.$emit('ItemToggle', this.item.itemQ.value);
    },

    getData: function() {
      this.$http.commons
        .get(`w/api.php?action=query&format=json&origin=*&prop=pageimages&titles=File:${this.item.fileName.value}&converttitles=1&piprop=thumbnail|name|original&pithumbsize=400`)
        .then(response => {
          const pages = response.data.query.pages;
          this.data = pages[Object.keys(pages)[0]];
        });
    },
  },
  mounted: function() {
    EventBus.$on('ItemToggle', toggledQ => {
      if (toggledQ !== this.item.itemQ.value) this.open = false;
    });
  },
};
</script>

<style scoped>
.btn {
    margin-top: 1.1rem;
    width: calc(100% - 5px);
}

video {
    width: calc(100% - 2.2rem);
}
</style>
