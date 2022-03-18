<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header></header>
        <base-spinner v-if="isLoading"></base-spinner>
        <div v-else-if="hasLectures && !isLoading">
          <div
            v-for="req in receivedLectures" :key="req.id" >
		  <ul>
            <button @click="displayLecture">{{ req.name }}</button>

			</ul>
          </div>

        </div>
        <h3 v-else>You haven't received any lectures yet!</h3>
      </base-card>
    </section>
  </div>

</template>

<script>


export default {


  data() {
    return {
      isLoading: false,
      error: null,
	  SingleLecture: false
    };
  },
  computed: {
    receivedLectures() {
      return this.$store.getters["lectures/lectures"];
    },
    hasLectures() {
      return this.$store.getters["lectures/hasLectures"];
    },
  },
  created() {
    this.loadLectures();
  },
  methods: {
    async loadLectures() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("lectures/fetchLectures");
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },

  },
};
</script>

<style >

</style>
