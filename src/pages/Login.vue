<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-dialog :show="isLoading" title="Authenticating..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>

  <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
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

<style media="screen">
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #080710;
}
.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -20%;
  top: 10%;
}
.shape:last-child {
  background: linear-gradient(to right, #ff512f, #f09819);

  right: -20%;
  top: 130%;
}
form {
  height: 700px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 80%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}
form * {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}
label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder {
  color: #e5e5e5;
}

#login {
  border-radius: 5px;
  padding: 5px 8px;
  border: 1px solid #498afb;
  color: #498afb;
}
#Sign {
  background-color: transparent;
  color: white;
  text-decoration: underline;
}
</style>
