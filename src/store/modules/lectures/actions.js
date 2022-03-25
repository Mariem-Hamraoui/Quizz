
export default {
  async createLecture(context, payload) {
	  const dbId = localStorage.getItem("userId");
    const newLecture = {
      quiz: payload.quiz,
      name: payload.name,
      fileUrl: payload.fileUrl,
	  description: payload.description,
	  staffUsers: payload.staffUsers
    };
    const response = await fetch(
      `https://syllab-e-default-rtdb.europe-west1.firebasedatabase.app/lectures/${dbId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newLecture),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to send Lecture."
      );
      throw error;
    }

    newLecture.id = responseData.name;
    newLecture.userId = payload.userId;

    context.commit("addLecture", newLecture);
  },

  async fetchLectures(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://syllab-e-default-rtdb.europe-west1.firebasedatabase.app/lectures/${userId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch lectures."
      );
      throw error;
    }

    const lectures = [];


    for (const key in responseData) {
      const lecture = {
        id: key,
        userId: userId,
        quiz: responseData[key].quiz,
        name: responseData[key].name,
        fileUrl: responseData[key].fileUrl,
		description: responseData[key].description,
      };
      lectures.push(lecture);
    }

    context.commit("setLectures", lectures);
  },
};
