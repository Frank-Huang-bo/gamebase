// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import "bootstrap";
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

import App from './App'
import router from './router'
import store from './store';
import './bus';
import currencyFilter from './Filters/currency';


Vue.config.productionTip = false
Vue.use(VueAxios, axios);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);
Vue.use(VeeValidate);
Vue.use(Vuex);

Vue.use(require('vue-moment'));

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.API_PATH}/api/user/check`;
    const vm = this;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        })
      }
    })
    console.log('這裡需要驗證');
  } else {
    // next({
    //   path: '/login'
    // });
    next();
  }
  console.log('to', to, 'from', from, 'next', next);
})
