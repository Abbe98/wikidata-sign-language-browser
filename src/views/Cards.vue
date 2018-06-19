<template>
  <div>
    <h1>Flashcards<span>{{ language }} flashcards</span></h1>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import Footer from '../components/Footer';

export default {
  name: 'Cards',
  components: {
    Spinner,
    Footer,
  },
  data: function() {
    return {
      language: false,
    };
  },
  created: function() {
    this.$http.wikidata
      .get(`w/api.php?action=wbsearchentities&search=${this.$route.params.id}&language=en&origin=*&format=json`)
      .then(response => {
        this.language = response.data.search[0].label;
        document.title = this.language + ' Flashcards';
      });
  },
};
</script>
