import  firebase from 'firebase'
import Vue from 'vue'
export default {
	async login(context, payload) {
	  const response = await fetch(
		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBi_DKlPK32LxHFHunBlrknvthTiTGyTrw',
		{
		  method: 'POST',
		  body: JSON.stringify({
			email: payload.email,
			password: payload.password,
			returnSecureToken: true
		  })
		}
	  );

	  const responseData = await response.json();

	  if (!response.ok) {
		console.log(responseData);
		const error = new Error(
		  responseData.message || 'Failed to authenticate. Check your login data.'
		);
		throw error;
	  }

	  console.log(responseData);
	  context.commit('setUser', {
		token: responseData.idToken,
		userId: responseData.localId,
		tokenExpiration: responseData.expiresIn
	  });
	},
	async signup(context, payload) {
	  const response = await fetch(
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBi_DKlPK32LxHFHunBlrknvthTiTGyTrw',
		{
		  method: 'POST',
		  body: JSON.stringify({
			email: payload.email,
			password: payload.password,
			returnSecureToken: true,

		  })
		}
	  );

	  const responseData = await response.json();

	  if (!response.ok) {

		const error = new Error(
		  responseData.message || 'Failed to authenticate. Check your login data.'
		);
		throw error;
	  }


	  context.commit('setUser', {
		token: responseData.idToken,
		userId: responseData.localId,
		tokenExpiration: responseData.expiresIn
	  });




	},
	logout(context) {
	  context.commit('setUser', {
		token: null,
		userId: null,
		tokenExpiration: null
	  });
	},

	createLecture ({commit},payload){
		const sessionDetails = {
			email : payload.email,
			lectureFile: payload.lectureFile,
			quizz: payload.quizz
		}
  firebase.database().ref('sessions').push(sessionDetails)
  .then((data)=>{
	  console.log(data)
commit('createLecture', sessionDetails)
  })
  .catch((error)=>{
	  console.log(error)
  })
	}

  };
