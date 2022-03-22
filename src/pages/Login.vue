<template>

  <base-dialog
    class="error"
    :show= "!!error"
    title=" An error occurred!!"
    @close= "handleError"
  >
    <p>{{ error }}</p>
  </base-dialog>
  <base-dialog :show= "isLoading" title=" Authenticating..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>

  <base-card>
<section>  
 <div class= "w3-display-middle">
    <form class="auth " @submit.prevent= "submitForm">
      <div  v-if= "mode === 'login'">
        <h3> <i class="fa fa-user w3-margin-right"></i>  Login </h3>
        <br />
        <p>Please enter your credentials to login</p>

        <label for="email"> Email </label>
        <input
          type="email"
          placeholder="username .. "
          id="email"
          v-model.trim="email"
        />

        <br />

        <label  for="password"> Password </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          v-model="password"
        />
      </div>
      <div v-if="mode === 'signup'">
        <h3> <i class="fa fa-user w3-margin-right"></i> Subscribe Here</h3>
        <br />
        
        <p> Please enter your credentials to create your account </p>

        <label for="email">  Email </label>

        <input
          type="email"
          placeholder="username .. "
          id="email"
          v-model.trim="email"
        />

        

        <label for="password"> Password </label>
        <input
          name="password"
          label="Password"
          id="password"
          v-model= "password"
          type="password"
          required
        />
      </div>

      <p class="error">{{ errorMessage }}</p>

      <br />
      <br />

      <button class="btn" id="login" @click="submitForm">
        {{ submittedButtonCaption }}
      </button>

      <br />
      <br />

      <button
        class="btn"
        id="Sign"
        type="button"
        mode="flat"
        @click= "switchSignUp"
      >
        {{ switchModeButtonCaption }}
      </button>
    </form>
    </div> 
    </section> 
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

<style>


section {
  height: 90vh;  
  background-image: url('https://lh6.googleusercontent.com/proxy/qqFjqZlPk8IFDq3iB4Q23yfL3BZGhrQL1paqjdxLYjfFei1BzfLHR_Jjk1j7h_paXBiJRNo97mjmQiyLyQRJlgA6efvGH8lR_Cl2jRpT7ePF_tsskJ02Ed2PQD9gOKYe=w1200-h630-p-k-no-nu'); 	
	background-size: cover;
  background-position: top;
  position: relative;
  font-family: 'Lato', sans-serif;


}
.auth {
  height: 30%;
  width: 40%;
  position: relative;
  margin: 0 auto ;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(235, 218, 218, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  background-color:	#faf8f2;
  display: center ;   
}

 label {
   color : black ;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 2.1em;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: bold;
}



</style>

