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
    </div>
  </div>

  <a class="aa" href="http://localhost:8080/build"> Add a new Lecture </a>
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
  background-size: cover;
  position: relative;
  padding-top: 100px;
}
@media (min-width: 1024px) {
  #main {
    background-attachment: fixed;
  }
}
.mainDashboard:before {
  content: "";
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

.mainDashboard h1 {
  margin: 30px 0 10px 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  text-transform: uppercase;
  color: #fff;
}
@media (max-width: 768px) {
  .mainDashboard h1 {
    font-size: 28px;
    line-height: 36px;
  }
}
.mainDashboard h2 {
  color: #eee;
  margin-bottom: 50px;
  font-size: 24px;
}
@media (max-width: 768px) {
  .mainDashboard h2 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
  }
}
.mainDashboard .btn-get-started {
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 8px 28px;
  border-radius: 50px;
  transition: 0.5s;
  margin: 10px;
  border: 2px solid #fff;
  color: #fff;
}
.mainDashboard .btn-get-started:hover {
  background: #2dc997;
  border: 2px solid #2dc997;
}




</style>