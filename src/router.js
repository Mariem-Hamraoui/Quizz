import { createRouter, createWebHistory } from 'vue-router';


import Homepage from './pages/Homepage.vue'
import Dashboard from './pages/dashboard.vue'
import store from './store/index.js'
import Login from './pages/Login.vue'
import LectureBuild from './pages/LectureBuild.vue'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/homepage' },
		{path: '/homepage', component: Homepage},
		{path: '/build', component: LectureBuild},
		{path: '/dashboard', component: LectureBuild, meta: { requiresAuth: true}},

		{ path: '/auth', component: Login, meta: { requiresUnauth: true } }


	]});

	router.beforeEach(function(to, _, next) {
		if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		  next('/auth');
		} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		  next('/build');
		} else {
		  next();
		}
	  });

	  export default router;