<template>
  <div id="allpagedash">
    <div class="staffmainDashboard">
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
                  <staffsingleLecture :req="req"> </staffsingleLecture>
                </ul>
              </div>
            </div>
            <h3 v-else>You haven't received any lectures yet!</h3>
          </base-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import staffsingleLecture from "./staffsingleLecture.vue";
export default {
  components: {
    staffsingleLecture,
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
#allpagedash {
  padding-top: 200px;
  background-size: cover;
  position: relative;
  font-family: "Lato", sans-serif;
  background-color: grey;
  height: 100vh;
  background-image: url("/assets/backg.jpg");

  padding: 20px;
  border-radius: 8px;
  padding-top: 50px;
  padding-right: 80px;
  padding-bottom: 50px;
  padding-left: 80px;
}
.staffmainDashboard {
  width: 100%;
  max-width: 700px;

  margin: 10px auto;

  border-radius: 8px;

  background-color: white;
  background-attachment: scroll;
  border: 2px solid #796878;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
}
</style>
