import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Language from './views/Language.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/lang/:id',
      name: 'lang',
      component: Language,
    },
  ],
});
