
<template>

  <fieldset class="form-horizontal text-capitalize " @submit.prevent= "submit" v-if = "show" >
    <div>
      <legend> <strong> Start creating your quiz form </strong> </legend>




      <label> Question : </label>

      <input class="form-control input-lg " type=" text" v-model= "QuestionDetails.question" />

      <label> Correct Answer : </label>

      <input class="form-control input-lg " type=" text" v-model= "QuestionDetails.correctAnswer" />

      <label> Wrong Answer(s) : </label>  

     

      <ul>
        <div>
          <input  class="form-control input-lg" type=" text" v-model= "tempWrongAnswer" />
        </div>
      </ul>
      <button class= "btn btn btn-info  active"  @click= "addwronganswers" > Extra wrong answer </button>
              <p class="help-block">  __ you may add more than one wrong answer</p>           
     <br/>  
     

    </div>  

     <div v-if = "error"  >      
          <p style= "color : red " > <bold> {{ errorMessage }}</bold>  </p>      
      </div>

      
    <div>
      <br/>  
      <button type="button" class="btn btn-primary btn btn-success btn-block active" @click= "submit" > Save this question's details  </button>       
    </div>
  </fieldset>
  
  <fieldset >

  <div v-if = "submitted && !show" >

 

     <br/> 
   <legend> Question's details  Summary </legend>
      <br/> 
      <div>
        <ul>
          <li v-for= "qt of quiz" :key= "qt">

      <p> <strong> The question : </strong>  {{ qt.question }} </p>
         <br/> 
      <p>  <strong> The correct Answer :  </strong>  {{qt.correctAnswer }} </p>
         <br/> 
      <li v-for= " WrongAnswer of qt.allwronganswers " :key= "allWrongAnswer" >
          
         <p>  <strong> Wrong Answer(s) : </strong>  {{ WrongAnswer }} </p>
         </li>

      </li>      
       </ul>
      </div>
     
      <div class="one"> 
     
  <button  type="button" class="btn btn btn-info active" @click = "AddQuestion" style="width:70% ; margin-top: 10px " > Next Question   </button>
   <p class="help-block">  __ you may add the next question's details  </p>
     <br/>  

   </div>

      </div>

</fieldset> 
</template>
<script>
export default {
  data() {
    return {
      quiz: [],
    tempWrongAnswer :'',
      nbrWanswers: 1,

      QuestionDetails: {
        question: "",
        correctAnswer: "",
        allwronganswers: [],
      },   
      error: false,
     
      submitted: false,
      show : true,
    };
  },
  methods: {
    addwronganswers() {
     
      if ( this.tempWrongAnswer) {       
        this.QuestionDetails.allwronganswers.push(this.tempWrongAnswer);        
        this.tempWrongAnswer = "";   
           
      }  
       else {
        
        this.error = true; 
       
        this.errorMessage = `Oops .. Please fill the empty fields! `;
                
        console.log(this.errorMessage); 
          
      }      

    },
    
    submit() {  
      if ( this.QuestionDetails.allwronganswers !== [] &&  this.tempWrongAnswer 
      ) 
      {  


       this.QuestionDetails.allwronganswers.push(this.tempWrongAnswer);

        const finalversion = JSON.parse(JSON.stringify(this.QuestionDetails));

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


        this.quiz.push(finalversion);

        this.tempWrongAnswer = ""; 
        
        this.QuestionDetails.allwronganswers = [] ;

        this.submitted = true; 

        this.show = false;        
      }       
      else {
        this.error = true; 
       
        this.errorMessage = `Oops .. Please fill the empty fields! `;
                
        console.log(this.errorMessage); 
          
      } 
    },
   
    AddQuestion(){ 
      this.show = true ;
      //this.QuestionDetails.allwronganswers = [] ;
      this.tempWrongAnswer = "";
      this.QuestionDetails.question = "";
      this.QuestionDetails.correctAnswer = "";
      this.errorMessage = [] ;
      this.errorMessage = null ;
    }
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
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: white;
}

div {
  color: white;
   width: 100%;
}


ul {
 
}




</style>



