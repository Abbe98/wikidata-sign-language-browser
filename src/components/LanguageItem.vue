<template>
  <li class="item">
    <span role="link" v-bind:aria-expanded="open.toString()" v-on:click="toggle()">
      <a>{{ language.langLabel.value }} <span>{{ language.count.value }}</span></a>
    </span>
    <section v-if="open">
      <router-link class="btn" v-bind:to="'lang/' + language.langQ.value">Browse</router-link>
      <router-link class="btn" v-bind:to="'lang/' + language.langQ.value + '/cards'">Flashcards</router-link>
    </section>
  </li>
</template>

<script>
import { EventBus } from '../event-bus.js';

export default {
  name: 'LanguageItem',
  data: function() {
    return {
      open: false,
    };
  },
  props: {
    language: Object,
  },
  methods: {
    toggle: function() {
      EventBus.$emit('LanguageItemToggle', this.language.langQ.value);
      this.open = !this.open;
    },
  },
  mounted: function() {
    EventBus.$on('LanguageItemToggle', toggledQ => {
      if (toggledQ !== this.language.langQ.value) this.open = false;
    });
  },
};
</script>

<style scoped>
a span {
    float: right;
}

a {
  display: inline-block;
  width: 100%;
}

.btn {
    width: calc(50% - 12px);
}
</style>
