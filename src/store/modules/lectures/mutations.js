export default {
	addLecture(state, payload) {
	  state.lectures.push(payload);
	},
	setLectures(state, payload) {
	  state.lectures = payload;
	}
  };