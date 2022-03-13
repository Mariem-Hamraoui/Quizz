
<template>
  <fieldset>
    <div>
      <legend> Start creating your quiz form </legend>

      <label>   Question :  </label>

      <input type=" text" v-model= "tempquestion"  />

 <label> Correct Answer : </label>

      <input type=" text"  v-model= "correctAnswer"  />
      
      <label>  Wrong Answer : </label>
      <ul>
        <div>
          <input type=" text"  v-model= "tempWrongAnswer"/>
        </div>
      </ul>
      <button @click= "addwronganswers"> Add extra wrong answer </button>
    </div>
     <div>
     <button type="button" @click= "submit"  > Save my quiz </button>
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
 
      nbrWanswers : 1 ,
      QuestionDetails: {
          question: "" ,
          correctAnswer: "",
          allwronganswers:[],
      },

      submitted: false,
    };
  },
  methods: {
    addwronganswers() {        
            this.QuestionDetails.allwronganswers.push(this.tempWrongAnswer) ;           
            this.nbrWanswers++;
            console.log(this.QuestionDetails.allwronganswers)           
            this.tempWrongAnswer ='';
    },

    submit() {
        
      this.tempallwronganswers.push(this.tempWrongAnswer);
      this.QuestionDetails['question'] = this.tempquestion ;
      this.QuestionDetails.correctAnswer = this.correctAnswer;
      
      this.quiz.push(this.QuestionDetails);
      this.submitted = true;  
      console.log (this.QuestionDetails.allwronganswers)
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
    
  },
};

</script>

<style>

fieldset{
  width:80% ;
  max-width: 700px;
	padding: 10px 20px;
	margin: 10px auto;
	padding: 20px;
	border-radius: 8px;
}

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
  width: 80%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: white;
}

div {
  color: white;
}
</style>

