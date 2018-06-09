<template>
  <li>
    <span role="link" v-bind:aria-expanded="open.toString()" v-on:click="toggle()">
      <a>{{ language.langLabel.value }} <span>{{ language.count.value }}</span></a>
    </span>
    <section v-bind:class="{ active: open }">
      <router-link v-bind:to="'lang/' + language.langQ.value">Browse</router-link>
      <router-link v-bind:to="'#'">Flashcards</router-link>
    </section>
  </li>
</template>

<script>
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
      this.open = !this.open;
    },
  },
};
</script>

<style scoped>
section {
  display: none;
}

section.active {
  display: block;
}
</style>
