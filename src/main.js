import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(AsyncComputed);

Vue.config.productionTip = false;

Vue.prototype.$http = {};

Vue.prototype.$http.wdqs = axios.create({
  baseURL: 'https://query.wikidata.org',
});

Vue.prototype.$http.commons = axios.create({
  baseURL: 'https://commons.wikimedia.org',
});

Vue.prototype.$http.wikidata = axios.create({
  baseURL: 'https://www.wikidata.org',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
