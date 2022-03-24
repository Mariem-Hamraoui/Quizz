<template>
  <base-dialog :show= "!!error" title=" An error occurred!!" @close= "handleError" style="color: #ff0000">
    <p>{{ error }}</p>
  </base-dialog>
  <base-dialog :show= "isLoading" title= " Authenticating..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>


  <base-card>
    <form class="auth" @submit.prevent= "submitForm">
      <div v-if="mode === 'login'">

        <h3> Login Here </h3>

        <label for="email"> Email </label>
        <input
          type="email"
          placeholder="username .. "
          id="email"
          v-model.trim= "email"
        />

        <br>


        <label for="password"> Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          v-model="password"
        />
      </div>
      <div v-if="mode === 'signup'">

        <h3> Subscribe Here </h3>
<br>

  <label for="email"> Email </label>

        <input
          type="email"
          placeholder= "username .. "
          id="email"
          v-model.trim="email"
        />

<br>

        <label for="password"> Password</label>
        <input
          name= "password"
          label="Password"
          id="password"
          v-model="password"
          type="password"
          required
        />
      </div>

      <p > {{ errorMessage }}</p>

<br>
<br>

      <button  class="btn" id="login" @click="submitForm">
        {{ submittedButtonCaption }}
      </button>

      <br>
      <br>

      <button class="btn" id="Sign" type="button" mode="flat" @click="switchSignUp">
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
        const redirectUrl = "/" + (this.$route.query.redirect || "dashboardStudent");
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

<style>


.auth {
  height: 80%;
 background-color  : #bd9b7f;
  width: 70%;
  max-width: 500px;
  padding: 10px 20px;
  margin: 10px auto;
  padding: 20px;
  border-radius: 8px;
  padding-top: 50px;
  align-items:flex-end ;
  font-size: 1.5vw;

}

label {
  color: black ;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 1.5vw;
}

input {
  margin-left: 20px ;
  display: block;
  padding: 10px 6px;
  width: 80%;
  box-sizing: border-box ;
  border: none;
  border-bottom: 1px solid black;
  color: black;
  background-color: #d1e8d9 ;
}

.btn {
  border-radius: 12px;
  width: 50%;
  padding: 14px 40px;
   position: relative ;
  background-color: white;
  color: black;
  border: 2px solid #987456  ;
  transition-duration: 0.4s;
   align-items: center;

  }

.btn:hover {
   background-color: #a06e45;
    color: white;
}

</style>

