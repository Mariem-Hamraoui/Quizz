<template>
  <form>
    <label for="chk" aria-hidden="true"> Sign up </label>
    <br />

    <label> Email </label>
    <input
      type="email"
      required
      v-model="email"
      placeholder="Type your email .. "
    />
    <label> Password </label>
    <input type="password" required v-model="password" />

    <label> Role : </label>
    <select v-model="role">
      <options value="WAHA"> Work from Home </options>
      <options value="WFO"> Work from Office </options>
    </select>

    <div class="terms">
      <input type="checkbox" required v-model="terms" />
      <label> Accpet terms and conditions </label>
    </div>

    <div>
      <input type="checkbox" required value="HR" v-model="departements" />
      <label> Human Resources </label>
      <input type="checkbox" required value="Acc&F " v-model="departements" />
      <label> Accounting and finance </label>
      <input type="checkbox" required value="R&D" v-model="departements" />
      <label> R&D departement </label>
      <input type="checkbox" required value="M&S" v-model="departements" />
      <label> Marketing & Sales </label>
      <input
        type="checkbox"
        required
        value="Customer srv"
        v-model="departements"
      />
      <label> Customer service </label>
    </div>

    <button>Sign up</button>
  </form>

  <div class="login">
    <form>
      <label for="chk" aria-hidden="true">Login</label>
      <br />

      <label> Email </label>
      <input
        type="email"
        required
        v-model="email"
        placeholder="Type your email .. "
      />
      <label> Password </label>
      <input type="password" required v-model="password" />
      <button>Login</button>
    </form>
  </div>

  <p>Email : {{ email }}</p>
  <p>password : {{ password }}</p>
  <p>Role : {{ role }}</p>
  <p>terms accpected : {{ terms }}</p>
  <p>Department : {{ department }}</p>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      role: "WAHA",
      terms: false,
      departments: [],
    };
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background-color: #ffa07a;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
Label {
  color: #af4a68;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

#chk {
  display: none;
}
.signup {
  position: relative;
  width: 100%;
  height: 100%;
}

button {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
button:hover {
  background: #6d44b8;
}

.login {
  height: 460px;
  background: #eee;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: 0.8s ease-in-out;
}
.login label {
  color: #573b8a;
  transform: scale(0.6);
}

#chk:checked ~ .login {
  transform: translateY(-500px);
}
#chk:checked ~ .login label {
  transform: scale(1);
}
#chk:checked ~ .signup label {
  transform: scale(0.6);
}
</style>