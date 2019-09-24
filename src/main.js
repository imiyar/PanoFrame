import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './plugins/element';
import './plugins/element-variables.scss';

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
