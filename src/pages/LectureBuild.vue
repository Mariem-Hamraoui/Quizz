<template class="outer">

   <fieldset class="form-horizontal"
   
    @submit.prevent= "submit"
    v-if= "show"
    style= "align-items: center; justify-content: center">
  
  <div class="legend1" >

 <label style=" color:#954535 "> <strong>  Start creating your Lecture  </strong> </label>
  
		<label for="name"> Please enter your lecture name </label>
	
  	<input type="text" name="name" id="name" v-model= "name">

		<label for="fileUrl"> Please select your lecture file </label>

		<input type="text" name="fileUrl" id="fileUrl" v-model= "fileUrl">
     <br/>

    </div>

    <div class="legend1" >
       <br/>
     
  <label style=" color: #954535 "> <strong>  Start creating your Quiz  </strong> </label>
  
  <br/>

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

        @click= "addwronganswers"
      >
        Extra wrong answer
      </button>
      <p class="help-block">__ you may add more than one wrong answer</p>
      <br />
    </div>
    <div v-if= "error">
      <p style="color: #ff0000">

        <strong> {{ errorMessage }} </strong> 
         
      </p>
    </div>
    

    <div>
      <br />
      <button  id="submit"
        type="submit" @click= "submit">
        Save this question's details
      </button>
    </div>
  </fieldset>

  

  <div
    class="w3-container w3-margin-top"
    v-if= "submitted && !show"
    style="
      height: 100px;
      width: 100%;
      border-width: 20px 5px;
      align-items: center;
      justify-content: center;
      color : black ; 
    "
  >
    <fieldset>
      <div>
        <br />
        <legend > Question's details Summary </legend>
        <br />
        <br />
        <br />

        <div>
          <div>
            <li
              class="w3-container w3-center"
              v-for= "(qt, index) in quiz"
              :key= "qt"
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
          
            @click= "AddQuestion"
           
          >
            Next Question
          </button>

          <p class="help-block">__ you may add the next question's details</p>
          <br />
        </div>
      </div>
	  <button id="submit" href="http://localhost:8080/dashboard" @click= "submitLecture" > Save Lecture </button>
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


fieldset {  
  width: 100%;
  max-width: 700px;
  padding: 10px 20px;
  margin: 10px auto;
  padding: 20px;
  border-radius: 8px;
  padding-top: 50px;
 padding-right: 30px;
 padding-bottom: 50px;
 padding-left: 80px;
 font-size:2em ;
  background-color: white ;
  background-attachment: scroll;
  border:2px solid #796878 ;
    -moz-border-radius:8px;
    -webkit-border-radius:8px;	
    border-radius:8px;
}
 label {
  color: black ;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  margin-left: 20px ;
  display: block;
  padding: 10px 6px;
  width: 80%;
  box-sizing: border-box ; 
  border: none;
  border-bottom: 1px solid black;
  color: black; 
  background-color: #d1e8d9 ;
 
   letter-spacing: 1px;
   
}
div {
  color: black;  
  width: 100%;
  margin-bottom: 10px; 
}


.legend1
{
  margin-bottom:0px;
  margin-left:16px;
}


#w3-container w3-margin-top {
  width: 300px;
  height: 100px;
  padding: 50px;
  border: 1px solid ;
  color : black 

}

button {
  border-radius: 12px;
  width: 50%;
  padding: 14px 40px;
   position: relative ;
  background-color: white;
  color: black;
  border: 2px solid #796878 ;
  transition-duration: 0.4s; 
   align-items: center;
  
  }

button:hover {
   background-color: #008080;
    color: white; 
}

#submit { 
  width: 90%;
}
</style>
