<template>
  <li>
    <span role="link" v-bind:aria-expanded="open.toString()" v-on:click="toggle()">
      <a>{{ language.langLabel.value }} <span>{{ language.count.value }}</span></a>
    </span>
    <section v-if="open">
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
li {
    margin: 0 -200% 4px;
    padding: 1.1rem 200%;
    background: #ff7873;
}

span[role=link] {
    width: 100%;
    margin: 0 -200% 4px;
    padding: 1.1rem 200%;
    cursor: pointer;
}

a span {
    float: right;
}

section {
    border-top: 1px solid rgba(255, 255, 255, .3);
    margin-top: 1.1rem;
    padding-top: 1.1rem;
    overflow: auto;
}

section a {
    padding: .2rem 0;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, .3);
    color: #FFF;
    margin: 0 2.5px;
    width: calc(50% - 5px - 2px);
    float: left;
    text-decoration: none;
    -webkit-transition: background .5s ease;
    transition: background .5s ease;
}

section a:hover {
    background: #FF6666;
    transition: background .5s ease;
}
</style>
