<template>
<div class="mainDashboard" >
<h2>List of lectures</h2>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p style="color: #ff0000">{{ error }}</p>
    </base-dialog>
    <div>
      <base-card>
        <base-spinner v-if="isLoading"></base-spinner>
        <div v-else-if="hasLectures && !isLoading">
          <div v-for="req in receivedLectures" :key="req.id">
            <ul>
              <singleLecture :req="req"> </singleLecture>
            </ul>

          </div>
        </div>
        <h3 v-else>You haven't received any lectures yet!</h3>

      </base-card>
<a  href="http://localhost:8080/build"> Add a new Lecture </a>
    </div>
  </div>


  </div>
</template>

<script>
import singleLecture from "../components/singleLecture.vue";
export default {
  components: {
    singleLecture
  },
  data() {
    return {
      isLoading: false,
      error: null,
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

<style>

.mainDashboard {
  width: 100%;
  line-height: 3;
  height: 150vh;

  background: url(https://firebasestorage.googleapis.com/v0/b/syllab-e.appspot.com/o/unnamed.jpg?alt=media&token=9bf403ec-8e09-43c2-8691-4d6d272f1eb8) top center;

  position: relative;
  padding-top: 100px;
}
@media (min-width: 1024px) {
  #main {
    background-attachment: fixed;
  }
}







</style>