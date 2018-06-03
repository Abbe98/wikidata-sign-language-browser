import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(AsyncComputed);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.root = 'https://query.wikidata.org';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
