import { createRouter, createWebHistory } from "vue-router";

import Homepage from "./pages/Homepage.vue";
import Dashboard from "./pages/dashboard.vue";
import store from "./store/index.js";
import Login from "./pages/Login.vue";
import LectureBuild from "./pages/LectureBuild.vue";
import NotFound from "./pages/NotFound.vue";
import staffLogin from "./staffPages/staffLogin.vue";
import staffDashboard from "./staffPages/staffDashboard.vue"
import quizz from './staffPages/quizz.vue'
import Support from './pages/Support.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/homepage" },
    { path: "/homepage", component: Homepage },
    { path: "/build", component: LectureBuild, meta: { requiresAuth: true } },
	{ path: "/quizz", component: quizz },

	{ path: "/support", component: Support },
	{ path: "/staffDashboard", component: staffDashboard, meta: { requiresAuth: true }},
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },

    { path: "/auth", component: Login, meta: { requiresUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;