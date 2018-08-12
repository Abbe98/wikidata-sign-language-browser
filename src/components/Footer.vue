<template>
  <footer>
      <a href="https://www.wikidata.org/wiki/Wikidata:Main_Page">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Wikidata_Stamp_Rec_Light.svg" alt="This application is powered by Wikidata." />
      </a>
      <p>User: <a href="https://meta.wikimedia.org/wiki/User:Abbe98">Abbe98</a> • <a href="https://github.com/Abbe98/wikidata-sign-language-browser">Source code</a></p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style module>
footer {
    text-align: center;
    margin-top: 1.8rem;
}

a {
   color: #fff;
}

img {
    max-width: 70%;
}
</style>
