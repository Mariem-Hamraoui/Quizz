<template>
  <div>
    <h2>Lecture Name: {{ req.name }}</h2>

    <button @click="toggleDetails">Start Lecture</button>
    <ul v-if="detailsAreVisible">
      <div>
        <strong>Description:</strong>
        {{ req.description }}
      </div>

    </ul>
  </div>
</template>

<script>


export default {
  props: ["req"],
  data() {
    return {
     lecturePlaying : false,
	 detailsAreVisible: false
    };
  },

  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  }
}
</script>
