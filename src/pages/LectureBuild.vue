<template class="outer">
  <fieldset
   
    @submit.prevent="submit"
    v-if="show"
    style="align-items: center; justify-content: center"
  >
    <div>
		<label for="name">Please enter your lecture name</label>
		<input type="text" name="name" id="name" v-model="name">

		<label for="fileUrl">Please select your lecture file</label>
		<input type="text" name="fileUrl" id="fileUrl" v-model="fileUrl">
      <legend><strong> Start creating your quiz form </strong></legend>

      <label> Question : </label>

      <input

        type=" text"
        v-model="QuestionDetails.question"
      />

      <label> Correct Answer : </label>

      <input

        type=" text"
        v-model="QuestionDetails.correctAnswer"
      />

      <label> Wrong Answer(s) : </label>
      <ul>
        <div>
          <input

            type=" text"
            v-model="tempWrongAnswer"
          />
        </div>
      </ul>

      <br />

      <button
        id=" button"

        @click="addwronganswers"
      >
        Extra wrong answer
      </button>
      <p class="help-block">__ you may add more than one wrong answer</p>
      <br />
    </div>
    <div v-if="error">
      <p style="color: red">
        <strong> {{ errorMessage }} </strong>
      </p>
    </div>
    <br />
    <br />
    <br />

    <div>
      <br />
      <button
        type="button"

        @click="submit"
      >
        Save this question's details
      </button>
    </div>
  </fieldset>

  <div
    class="w3-container w3-margin-top"
    v-if="submitted && !show"
    style="
      height: 100px;
      width: 100%;
      border-width: 20px 5px;
      align-items: center;
      justify-content: center;
    "
  >
    <fieldset style="align-items: center; justify-content: center; width: 100%">
      <div>
        <br />
        <legend>Question's details Summary</legend>
        <br />
        <br />
        <br />

        <div>
          <div>
            <li
              class="w3-container w3-center"
              v-for="(qt, index) in quiz"
              :key="qt"
            >
              <p>
                <strong> Question N°{{ index + 1 }} </strong> {{ qt.question }}
              </p>

              <p>
                <strong> The correct Answer : </strong> {{ qt.correctAnswer }}
              </p>

              <div
                v-for="(WrongAnswer, index) in qt.allwronganswers"
                :key="WrongAnswer.id"
              >
                <p>
                  <strong> Wrong Answer {{ index + 1 }}: </strong>
                  {{ WrongAnswer }}
                </p>
              </div>
              <p>--------------------------------------------------------</p>
            </li>

            <br />
            <br />
            <br />
            <div style="width:100% line-height: 2.5em; margin: 0 5px  ">
              <br />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div class="one">
          <button
            type="button"
            class="btn btn btn-info active w3-round-large w3-padding-large"
            @click="AddQuestion"
            style="width:50% ; margin-top: 20px  margin-left: 40px "
          >
            Next Question
          </button>

          <p class="help-block">__ you may add the next question's details</p>
          <br />
        </div>
      </div>
	  <a href="http://localhost:8080/dashboard" @click="submitLecture" >Save Lecture</a>
    </fieldset>

  </div>
</template>
<script>
export default {
  data() {
    return {
      quiz: [],
	  name:'',
	  fileUrl:"",
      tempWrongAnswer: "",
      nbrWanswers: 1,

      QuestionDetails: {
        question: "",
        correctAnswer: "",
        allwronganswers: [],
      },
      error: false,
      empty: false,
      submitted: false,
      show: true,
    };
  },
  methods: {
    addwronganswers() {
      if (this.tempWrongAnswer) {
        this.QuestionDetails.allwronganswers.push(this.tempWrongAnswer);
        this.tempWrongAnswer = "";
        this.empty;
      }
    },

    submit() {
      if (this.QuestionDetails.allwronganswers !== [] && this.tempWrongAnswer) {
        this.QuestionDetails.allwronganswers.push(this.tempWrongAnswer);

        const finalversion = JSON.parse(JSON.stringify(this.QuestionDetails));

        this.quiz.push(finalversion);

        this.tempWrongAnswer = "";

        this.QuestionDetails.allwronganswers = [];

        this.submitted = true;

        this.show = false;
      } else {
        this.error = true;

        this.errorMessage = `Oops .. Please fill the empty fields! `;
      }
    },
    detecterror() {
      this.error = true;
    },
    AddQuestion() {
      this.show = true;
      this.QuestionDetails.allwronganswers = [];
      this.tempWrongAnswer = "";
      this.QuestionDetails.question = "";
      this.QuestionDetails.correctAnswer = "";
      this.errorMessage = [];
      this.errorMessage = null;
    },

	submitLecture(){
	this.$store.dispatch('lectures/createLecture',{
		quiz: this.quiz,
		name: this.name,
		fileUrl: this.fileUrl,

	});
	this.$router.replace('dashboard')

	}
  },
};
</script>

<style>

</style>
