
<template>
  <form>
    <div>
      <h1>Please fill your quiz form</h1>
      <label> Add your Question </label>
      <input type=" text" v-model="tempquestion" @keypress="addquestion" />
      <!-- <button type="submit" class="btn btn-primary"> Add correction answer </button> -->
    </div>
    <div v-for="question in questions" :key="question">
      <p>question : {{ question }}</p>
    </div>
  </form>
</template>


<script>
export default {
  date() {
    return {
      tempquestion: "",
      questions: [],
    };
  },
  methods: {
    addquestion(e) {
      console.log(e);
      if (e.key === "Enter" && this.tempquestion) {
        if (!this.questions.includes(this.temquestions)) {
          this.questions.push(this.tempquestion);
        }
        this.tempquestion = "";
      }
      console.log(this.questions);
    },
  },
};
</script>

<style>
form {
  max-width: 500px auto;
  margin: 30 auto;
  background-color: black;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
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
</style>