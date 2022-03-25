<template>
  <div>

    <section v-if="!detailsAreVisible">
      <h2>Lecture Name: {{ req.name }}</h2>
      <strong>Description:</strong>
      {{ req.description }}
	  <br>
	  <br>
	  <button @click="lectureFile"><strong>Download your lecture PDF</strong></button>

	  <br>
	  <br>
      <button @click="toggleDetails">Start your quiz</button>
    </section>
<br>
<br>
    <div v-if="detailsAreVisible">
      <quizz :req="req"></quizz>
    </div>

  </div>
</template>

<script>
import quizz from "./quizz.vue";

export default {
  components: {
    quizz,
  },
  props: ["req"],
  data() {
    return {
      lecturePlaying: false,
      detailsAreVisible: false,
    };
  },

  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
	lectureFile(){
		return window.location.href = this.req.fileUrl
	}
  },
};
</script>
