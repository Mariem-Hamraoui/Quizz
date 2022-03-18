<template>
  <header>
    <div id="brand"><a href="/">MyCompany</a></div>
    <nav>
      <ul>
        <li><a href="/homepage">Homepage</a></li>

        <li v-if="isLoggedIn">
          <a href="/dashboard">dashboard</a>
        </li>

        <li id="login" v-else>
          <a href="/auth">Login</a>
        </li>

        <li v-if="isLoggedIn">
          <a href="http://localhost:8080/homepage" @click="logout" >Logout</a>
        </li>

      </ul>
    </nav>
    <div
      id="hamburger-icon"
      @click="toggleMobileMenu"
      v-bind:class="{ open: isActive }"
    >
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
      <ul class="mobile-menu">
        <li id="hm"><a href="/home">Home</a></li>
        <li id="dash"><a href="dashboard">Dashboard</a></li>
        <li id="lgn"><a href="/about">Login</a></li>
        <li id="lgo"><a href="/login">Signup</a></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

header a {
  text-decoration: none;
}

header {
  padding: 0 20px;
  background-color: #1d1f1d;
  height: 50px;
  display: flex;
  justify-content: space-between;
}

#brand {
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
}

#brand a {
  color: #09c372;
}

ul {
  list-style: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

ul a {
  color: white;
}

ul li {
  padding: 5px;
  margin-left: 10px;
}

ul li:hover {
  transform: scale(1.1);
  transition: 0.3s;
}

#lgo,
#hm,
#dash,
#lgn {
  border-radius: 5px;
  padding: 5px 8px;

}

#hm {
  background-color: #414645;
}

#dash {
  background-color: #414645;
}

#lgn {
  background-color: #414645;
}

#lgo a {
 background-color: #414645;
}

#hamburger-icon {
  margin: auto 0;
  display: none;
  cursor: pointer;
}

#hamburger-icon div {
  width: 35px;
  height: 3px;
  background-color: white;
  margin: 6px 0;
  transition: 0.4s;
}

.open .bar1 {
  -webkit-transform: rotate(-45deg) translate(-6px, 6px);
  transform: rotate(-45deg) translate(-6px, 6px);
}

.open .bar2 {
  opacity: 0;
}

.open .bar3 {
  -webkit-transform: rotate(45deg) translate(-6px, -8px);
  transform: rotate(45deg) translate(-6px, -8px);
}

.open .mobile-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 50px;
  left: 0;
  height: calc(100vh - 50px);
  width: 100%;
}

.mobile-menu li {
  margin-bottom: 10px;
}

@media only screen and (max-width: 600px) {
  header nav {
    display: none;
  }

  #hamburger-icon {
    display: block;
  }
}
</style>
