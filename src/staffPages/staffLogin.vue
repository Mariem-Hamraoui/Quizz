<template>
  <body class="staffloginMain" id="staffmainlogin">
    <base-dialog
      class="error"
      :show="!!error"
      title=" An error occurred!!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title=" Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>

    <base-card>
      <section>
        <div class="w3-display-middle">
          <form class="staffauth" @submit.prevent="submitForm">
            <div>
              <h3><i class="fa fa-user w3-margin-right"></i> Login</h3>
              <br />
              <p>Please enter your credentials to login</p>

              <input
                type="email"
                placeholder="username .. "
                id="email"
                v-model.trim="email"
              />

              <input
                type="password"
                placeholder="Password"
                id="password"
                v-model="password"
              />
            </div>

            <p class="error">{{ errorMessage }}</p>

            <button class="btn" id="login" @click="submitForm">
              Login
            </button>

            <br />

            <button
              class="btn"
              id="Sign"
              type="button"
              mode="flat"
              @click="switchSignUp"
            >
              {{ switchModeButtonCaption }}
            </button>
          </form>
        </div>
      </section>
    </base-card>
  </body>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
      errorMessage: "",
      quizz: [],
    };
  },

  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.errorMessage = "Please check email and password";
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("login", actionPayload);

        const redirectUrl = "/" + (this.$route.query.redirect || "staffDashboard");
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error =
          err.message ||
          "Failed to authenticate, try later or contact your administration.";
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


.staffloginMain {
padding-top: 350px;
  background-size: cover;
  position: relative;
  font-family: "Lato", sans-serif;
  background-color: grey;
  height: 100vh;
  background-image: url("/assets/backg.jpg");
   background-attachment: fixed;

}


.staffauth{

	padding: 10px 20px;
  margin: 10px auto;
  padding: 20px;
  border-radius: 8px;
  padding-top: 50px;
  padding-right: 80px;
  padding-bottom: 50px;
  padding-left: 80px;

  background-color: white;
  background-attachment: scroll;
  border: 2px solid #796878;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
}
</style>
