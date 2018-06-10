import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Language from './views/Language';
import Cards from './views/Cards';

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
    {
      path: '/lang/:id/cards',
      name: 'cards',
      component: Cards,
    },
  ],
});
