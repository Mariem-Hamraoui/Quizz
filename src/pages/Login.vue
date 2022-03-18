<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-dialog :show="isLoading" title="Authenticating..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>

 
  <base-card>
    <form @submit.prevent="submitForm">
      <div v-if="mode === 'login'">
        <h3>Login Here</h3>

        <label for="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          v-model.trim="email"
        />

        <label for="password"> Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          v-model="password"
        />
      </div>
      <div v-if="mode === 'signup'">
        <h3>Subscribe Here</h3>

        <input
          type="email"
          placeholder="Email"
          id="email"
          v-model.trim="email"
        />

        <label for="password">Password</label>
        <input
          name="password"
          label="Password"
          id="password"
          v-model="password"
          type="password"
          required
        />
      </div>

      <p>{{ errorMessage }}</p>

      <button id="login" @click="submitForm">
        {{ submittedButtonCaption }}
      </button>
      <button id="Sign" type="button" mode="flat" @click="switchSignUp">
        {{ switchModeButtonCaption }}
      </button>
    </form>
  </base-card>
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
  computed: {
    submittedButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
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
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        const redirectUrl = "/" + (this.$route.query.redirect || "dashboard");
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }
      this.isLoading = false;

      location.reload();
    },
    switchSignUp() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

