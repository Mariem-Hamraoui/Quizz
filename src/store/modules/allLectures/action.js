export default {
	async createLecture(context, payload) {
	  const newLecture = {
		quiz: payload.quiz,
		name: payload.message,
		fileUrl: payload.fileUrl,

	  };
	  const response = await fetch(
		`https://syllab-e-default-rtdb.europe-west1.firebasedatabase.app/allLectures/${payload.userId}.json`,
		{
		  method: 'POST',
		  body: JSON.stringify(newLecture)
		}
	  );

	  const responseData = await response.json();

	  if (!response.ok) {
		const error = new Error(
		  responseData.message || 'Failed to send Lecture.'
		);
		throw error;
	  }

	  newLecture.id = responseData.name;
	  newLecture.userId = payload.userId;

	  context.commit('addLecture', newLecture);
	},
}