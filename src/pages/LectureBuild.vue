<template>
  <fieldset class="form-horizontal text-capitalize " @submit.prevent= "submit">
    <div>
      <legend> <strong> Start creating your quiz form </strong> </legend>


      <label> Question : </label>

      <input class="form-control input-lg " type=" text" v-model= "tempquestion" />

      <label> Correct Answer : </label>

      <input class="form-control input-lg " type=" text" v-model= "correctAnswer" />

      <label> Wrong Answer(s) : </label>
       <p class="help-block">  __ you may add more than one wrong answer</p>
      <ul>
        <div>
          <input  class="form-control input-lg " type=" text" v-model= "tempWrongAnswer" />
        </div>
      </ul>
      <button class="btn btn btn-info  active"  @click= "addwronganswers" >Extra wrong answer </button>
      <p class="help-block"> __ Save to add extra wrong answer </p>
     <br/>  
      <button class="btn btn btn-info  active"  @click= "clear" > Clear </button>

    </div>
    
      <div class="text-warning" v-if= "!errors">
        <div v-for= "error in errorMessages" :key= "error">
          <p style="color: red"> Error Message : {{ errorMessage }}</p>
        </div>
      </div>

    <div>
      <br/>  
      <button type="button" class="btn btn-primary btn btn-info btn-block active" @click= "submit" > Save this question's details  </button>
          
    </div>
     <div class="text-warning"  v-if = "submitted" >
        
          <p style="color: green"> <strong> Great!! This question's details has been submitted  </strong> </p>
        
      </div>

  </fieldset>
<div v-if = "submitted" >
  <fieldset >
   <legend> Question's details  Summary </legend>
      <p> <strong> The question : </strong>  {{ QuestionDetails.question }} </p>
      <p>  <strong> The correct Answer :  </strong>  {{ QuestionDetails.correctAnswer }}</p>
      <div v-for= " WrongAnswer in QuestionDetails.allwronganswers " :key= "WrongAnswer" >
         <p>  <strong> Wrong Answer(s) : </strong>  {{ WrongAnswer }}</p>
      </div>    
</fieldset>
</div> 
  
</template>


<script>
export default {
  data() {
    return {
      quiz: [],
      tempquestion: "",
      correctAnswer: "",
      tempWrongAnswer: "",
      
      nbrWanswers: 1,
      QuestionDetails: {
        question: "",
        correctAnswer: "",
        allwronganswers: [],
      },
      errorMessages: [],
      error: false,
      submitted: false,
    };
  },
  methods: {
    addwronganswers() {
      this.error= false;
      this.errorMessages= []
      if (
        this.tempWrongAnswer &&
        !this.QuestionDetails.allwronganswers.includes(this.tempWrongAnswer)
      ) {
       this.error= false;
        this.QuestionDetails.allwronganswers.push(this.tempWrongAnswer);
        this.nbrWanswers++;
        
        this.tempWrongAnswer = "";
      
         alert(this.QuestionDetails.allwronganswers)
         
      } else {
        this.error = true;
        this.errorMessage = `Oops .. Already exsisting  wrong answer!`;
        this.errorMessages.push(this.errorMessage);
       
      }      
    },
    clear(){
        this.tempWrongAnswer = "";
        this.error= false ;
        this.errorMessages = []
    },
    submit() {  
      if ( 
        //ok
        this.tempquestion &&
        this.correctAnswer &&
        this.QuestionDetails.allwronganswers !== [] &&
        this.tempWrongAnswer &&
       !this.QuestionDetails.allwronganswers.includes(this.tempWrongAnswer)
      ) 
      {      
        this.QuestionDetails.allwronganswers.push(this.tempWrongAnswer);
        this.error= false;
        this.QuestionDetails["question"] = this.tempquestion;
        this.QuestionDetails.correctAnswer = this.correctAnswer;      
        this.quiz.push(this.QuestionDetails);
        this.tempWrongAnswer = "";
        this.tempquestion = "";
        this.correctAnswer = "";
        this.submitted = true;      
        console.log(this.QuestionDetails.allwronganswers);
        alert(" Great!! This question's details is submitted");
      }       
      else {
        this.error = true;
        this.errorMessage = `Oops .. Please fill the empty fields! `;
        this.errorMessages.push(this.errorMessage);     
        console.log(this.errorMessage);       
      }
      alert(this.QuestionDetails.allwronganswers)
    },
  },
};
</script>

<style>
fieldset {
  width: 80%;
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