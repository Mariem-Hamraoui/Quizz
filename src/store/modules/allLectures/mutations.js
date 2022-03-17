export default {
	addLecture(state, payload) {
	  state.lectures.push(payload);
	},
	setRequests(state, payload) {
	  state.requests = payload;
	}
  };