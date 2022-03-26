<template>
  <div class="mainDashboard">
    <section id="mainDashboard">
      <h5>The List of lectures</h5>

      <div>
        <base-dialog
          class="error"
          :show="!!error"
          title="An error occurred!"
          @close="handleError"
        >
          <p class="error">{{ error }}</p>
        </base-dialog>
        <div>
          <br />
          <base-card>
            <br />
            <base-spinner v-if="isLoading"></base-spinner>
            <div v-else-if="hasLectures && !isLoading">
              <div v-for="req in receivedLectures" :key="req.id">
                <ul>
                  <singleLecture :req="req"> </singleLecture>
                </ul>
              </div>
              <br />
            </div>

            <h7 v-else> You haven't created any lectures yet! </h7>
          </base-card>
          <a class="newlecture" href="http://localhost:8080/build">
            <strong> Add a new Lecture </strong>
          </a>
        </div>
      </div>
    </section>
  </div>
  <footer class="text-center text-toal" style="background-color: #56cfd2">
    <div class="container p-4">
      <div>
        <!-- Links -->
        <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
        <p><i class="fas fa-home me-3"></i> Tunisia, TN 10012, TN</p>
        <p>
          <i class="fas fa-envelope me-3"></i>
          syllab-e@example.com
        </p>
        <p><i class="fas fa-phone me-3"></i> + 216 234 567 88</p>
        <p><i class="fas fa-print me-3"></i> + 216 234 567 89</p>
      </div>
    </div>

    <div class="text-center p-2" style="background-color: #008080">
      <br />
      © 2022 Copyright
      <br />
      <a class="text-white" href="https://Syllab-E.com/"> Syllab-E.com </a>
    </div>
  </footer>
</template>

<script>
import singleLecture from "../components/singleLecture.vue";
export default {
  components: {
    singleLecture,
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
  async created() {
    await this.loadLectures();
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
  padding-top: 150px;
  background-size: cover;
  position: relative;
  font-family: "Lato", sans-serif;

  height: 250vh;

  background-image: url("/assets/backg.jpg");

  background-attachment: fixed;
  align-items: center;
  text-align: center;
}

#mainDashboard {
  font-family: Times;
  padding: 10px 20px;
  width: 70%;
  margin: 10px auto;
  padding: 20px;
  border-radius: 12px;
  padding-top: 50px;
  padding-right: 60px;
  padding-bottom: 50px;
  padding-left: 60px;
  background-color: #fafafa;
  background-attachment: scroll;
  border: 2px solid #796878;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 #f1b24b, 0 6px 20px 0 #f1b24b;
  align-items: center;
  font-size: 15px;
  border-radius: 40px;
}

.newlecture:link {
  font-size: 17px;
  font-family: Times;
  position: center;


}

/* visited link */
.newlecture:visited {
  color: #834809;
  font-size: 21px;
  text-shadow: 0 4px 8px 0 #f1b24b, 0 6px 20px 0 #f1b24b;
}

/* mouse over link */
.newlecture:hover {
  color: #f28714;
  cursor: pointer;
  font-weight: bold;
  font-size: 25px;
  text-shadow: 0 4px 8px 0 #f1b24b, 0 6px 20px 0 #f1b24b;
}

/* selected link */
.newlecture:active {
  color: #ff9736;
  text-shadow: 0 4px 8px 0 #f1b24b, 0 6px 20px 0 #f1b24b;
}
</style>
