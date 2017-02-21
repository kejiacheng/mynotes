import Vue from 'vue';
import VueRouter from 'vue-router';

import unknown from '../component/unknown.vue';
import temporary from '../component/temporary.vue';
import complete from '../component/complete.vue';
import post from '../component/post.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/unknown', name: 'unknown', component: unknown },
	{ path: '/temporary', name: 'temporary', component: temporary },
	{ path: '/complete', name: 'complete', component: complete },
	{ path: '/post', name: 'post', component: post },
	{ path: '/', name: 'index' }
]

export default new VueRouter({
	routes
})