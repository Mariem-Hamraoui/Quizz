import { createStore } from "vuex";
import allLecturesModule from "./modules/allLectures/index.js"
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    allLectures: allLecturesModule,
    auth: authModule,
  },
});

export default store;
