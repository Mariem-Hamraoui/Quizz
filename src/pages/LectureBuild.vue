<template >
<div id="allpage">


  <div >
    <h2>Please add the name of the lecture</h2>
    <input type="text" />
  </div>
  <br />
  <div>
    <p>Please fill your quiz form</p>
    <button>Create question</button>
    <div>
      <label> Add your Question </label>
      <input type=" text" v-model="tempquestion" />
      <label> Add the correct answer </label>
      <input type=" text" v-model="correctAnswer" />
      <label> Add a wrong answer </label>
      <ul id="winput">
        <div>
          <li v-for="index in nbrWanswers" :key="index">
            <p>Question {{index}}</p><input />
          </li>
        </div>
      </ul>
      <button @click="nbrWanswers++">Add extra wrong answer</button>
    </div>
  </div>
  <div v-for="question in questions" :key="question">
    <p>question : {{ question }}</p>
  </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tempquestion: "",
      questions: [],
      correctAnswer: "",
      tempWrongAnswer: "",
      allwronganswers: [],
      nbrWanswers: 1,
      questionDetails: {},
    };
  },
  methods: {
    addquestion(e) {
      if (e.key === "Enter" && this.tempquestion) {
        this.questionDetails["question"] === this.tempquestion;

        this.tempquestion = "";
      }
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

#winput {
  display: block;
 text-align: center;
  width: 50%;

  border-bottom: 1px solid white;
  color: white;
}

div {
  color: white;
}
button {
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}

#allpage {
	margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
}
</style>
