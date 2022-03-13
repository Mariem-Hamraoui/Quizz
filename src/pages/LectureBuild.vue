<template>
  <fieldset>
    <div>
      <p>Please Start creating your quiz form</p>

      <label> Add your Question </label>

      <input type=" text" v-model="tempquestion" />

      <input type=" text" v-model="correctAnswer" />

      <label> Add a wrong answer </label>
      <ul id="winput">
        <div>
          <li v-for="index in nbrWanswers" :key="index">
            <p>Question {{ index }}</p>
            <input />
          </li>
        </div>
      </ul>
      <button @click="nbrWanswers++">Add extra wrong answer</button>
    </div>

    <div>
      <button type="button" @click="submit">Save my quiz!</button>
    </div>
  </fieldset>
</template>

<script>
export default {
  data() {
    return {
      quiz: [],

      tempquestion: "",
      correctAnswer: "",
      tempWrongAnswer: "",
      tempallwronganswers: [],

      nbrWanswers: 1,

      QuestionDetails: {
        question: "",
        correctAnswer: "",
        allwronganswers: [],
      },

      submitted: false,
    };
  },
  methods: {
    addwronganswers() {
      this.tempallwronganswers.push(this.tempWrongAnswer);

      this.tempWrongAnswer = "";
    },

    submit() {
      this.submitted = true;


      this.tempallwronganswers.push(this.tempWrongAnswer);

      this.QuestionDetails['question'] = this.tempquestion;
      this.QuestionDetails.correctAnswer = this.correctAnswer;
      this.QuestionDetails.allwronganswers = this.tempallwronganswers;
      this.quiz.push(this.QuestionDetails);

	  fetch('https://syllab-e-default-rtdb.europe-west1.firebasedatabase.app/lectures.json', {
		  method:'POST',
		  headers:{
			  'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			  QuestionDetails: this.QuestionDetails
		  })
	  })
    },
    restart() {
      this.tempquestion = "";
      (this.correctAnswer = ""),
        (this.tempWrongAnswer = ""),
        (this.tempallwronganswers = []);
      this.QuestionDetails = {};
    },
  },
};
</script>

<style>
h1 label {
  color: white;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: white;
}

div {
  color: white;
}
</style>
