import { createStore } from "vuex";
import lecturesModule from "./modules/lectures/index.js"
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    lectures: lecturesModule,
    auth: authModule,
  },
});

export default store;
