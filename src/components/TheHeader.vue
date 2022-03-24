<template>


  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container d-flex justify-content-between align-items-center">
      <div id="logo">
        <a href="index.html"><h3></h3></a>
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li :class='{ "active":selected === 0}' @click="changeSelected(0)" ><a class="nav-link scrollto " href="/">Home</a></li>

          <li :class='{ "active":selected === 1}' @click="changeSelected(1)"><a class="nav-link scrollto " href="/dashboard">Dashboard</a></li>

          <li :class='{ "active":selected === 2}' @click="changeSelected(2)">
            <a
              class="nav-link scrollto"
              v-if="isLoggedIn"
              href="/auth"
              @click="logout"
              >Logout</a
            >
          </li>
          <li :class='{ "active":selected === 3}' @click="changeSelected(3)">
            <a class="nav-link scrollto " v-if="!isLoggedIn" href="/auth"
              >Login/Subscribe</a
            >
          </li>
          <li :class='{ "active":selected === 4}' @click="changeSelected(4)"><a class="nav-link scrollto" href="#about">Get Support</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- End Header -->
</template>

<script>
import {ref} from 'vue'
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
	setup(){
		const selected = ref(0);
const changeSelected = (a) => {
	selected.value
}
		return {
			changeSelected,
			selected

		}
	}
  },
};
</script>

<style>

a {
  color: #2dc997;
  text-decoration: none;
}
a:hover,
a:active,
a:focus {
  color: #2dca98;
  outline: none;
  text-decoration: none;
}
p {
  padding: 0;
  margin: 0 0 30px 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  margin: 0 0 20px 0;
  padding: 0;
}

#header {
  height: 90px;
  transition: all 0.5s;
  z-index: 997;
  background-color: transparent;
}
#header #logo h1 {
  font-size: 32px;
  margin: 0;
  line-height: 1;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}
#header #logo h1 a,
#header #logo h1 a:hover {
  color: #fff;
}
#header #logo img {
  padding: 0;
  margin: 0;
}
.navbar {
  padding: 0;
}
.navbar ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
}
.navbar li {
  position: relative;
}
.navbar > ul > li {
  white-space: nowrap;
  padding: 10px 0 10px 24px;
}
.navbar a, .navbar a:focus {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Poppins", sans-serif;
  color: #fff;
  font-size: 14px;
  padding: 0 4px;
  white-space: nowrap;
  transition: 0.3s;
  letter-spacing: 0.4px;
  position: relative;
  text-transform: uppercase;
}
.navbar a i, .navbar a:focus i {
  font-size: 12px;
  line-height: 0;
  margin-left: 5px;
}
.navbar > ul > li > a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -6px;
  left: 0;
  background-color: #2dc997;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}
.navbar a:hover:before, .navbar li:hover > a:before, .navbar .active:before {
  visibility: visible;
  transform: scaleX(1);
}
.navbar a:hover, .navbar .active, .navbar .active:focus, .navbar li:hover > a {
  color: #fff;
}.navbar {
  padding: 0;
}
.navbar ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
}
.navbar li {
  position: relative;
}
.navbar > ul > li {
  white-space: nowrap;
  padding: 10px 0 10px 24px;
}
.navbar a, .navbar a:focus {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Poppins", sans-serif;
  color: #fff;
  font-size: 14px;
  padding: 0 4px;
  white-space: nowrap;
  transition: 0.3s;
  letter-spacing: 0.4px;
  position: relative;
  text-transform: uppercase;
}
.navbar a i, .navbar a:focus i {
  font-size: 12px;
  line-height: 0;
  margin-left: 5px;
}
.navbar > ul > li > a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -6px;
  left: 0;
  background-color: #2dc997;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}
.navbar a:hover:before, .navbar li:hover > a:before, .navbar .active:before {
  visibility: visible;
  transform: scaleX(1);
}
.navbar a:hover, .navbar .active, .navbar .active:focus, .navbar li:hover > a {
  color: #fff;
}
</style>