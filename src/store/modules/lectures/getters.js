export default {
	lectures(state, _, _2, rootGetters) {
	  const userId = rootGetters.userId;
	  return state.lectures.filter(req => req.userId === userId);
	},
	hasLectures(_, getters) {
	  return getters.lectures && getters.lectures.length > 0;
	}
  };