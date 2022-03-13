
<template>
  <h1>Please fill your quiz form</h1>

  <form class="Quiz-container" @submit.prevent = "submit" @submit= "checkForm" >
      <p v-if= "errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for= "error in errors"> {{ error }} </li>
    </ul>
  </p>

    <div class="Questions-container">
      <label > Add your Question </label>
      <input type=" text" v-model= "tempquestion"> </input>


  </form>
</template>


<script>
export default {
  date() {
    return {
      tempquestion:'',
      questions = [],
       errors: [],
      isSubmitted: false
    }
  },
  methods:{
       checkForm(e) {
      if (this.questions && this.correct_answers && this.wrong_answers) {
        return true;
      }

      this.errors = [];

      if (!this.questions) {
        this.errors.push('Question required');
      }
      if (!this.correct_answers) {
        this.errors.push('Correct answer required');
      }
      if (!this.wrong_answers) {
        this.errors.push('Wrong answer required');
      }

      e.preventDefault();
    },

    submit(){
      this.$emit('submit', this.form)
      alert(' Quiz Form has been submitted!');
    }
  } 
}

</script>

<style>
form {
  max-width: 420px auto;
  margin: 30 auto;
  background-color: black;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
    display :block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ccc;
    color: rgb(255, 235, 235);
}
</style>