import Vue from 'vue';
import './style/base.scss';
import App from './components/pages/App.vue';
import store from './store';

const app = new Vue({
  store,
  render(h) {
    return h(App);
  },
});

app.$mount('#js-app');
