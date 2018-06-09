<template>
  <li>
    <span role="link" v-bind:aria-expanded="open.toString()" v-on:click="toggle()">
      {{ item.itemLabel.value }} <small v-if="item.itemDescription">{{ item.itemDescription.value }}</small>
    </span>
    <section v-bind:class="{ active: open }">stuff</section>
  </li>
</template>

<script>

export default {
  name: 'Item',
  data: function() {
    return {
      open: false,
    }
  },
  props: {
    item: Object,
  },
  /*asyncComputed: {
    image: {
      get() {
        return this.$http
          .get(`sparql?query=${RQLanguageItems(this.$route.params.id)}`)
          .then(response => response.body);
      },
      default: false,
    },
  },*/
  methods: {
    toggle: function() {
      this.open = !this.open;
    }
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
