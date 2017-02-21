import Vue from 'vue';
import VueResource from 'vue-resource'

import main from './main.vue';
import router from './router';

Vue.use(VueResource);

new Vue({
	el: '#main-content',
	router,
	render: cE => cE(main)
})