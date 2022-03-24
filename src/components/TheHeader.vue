<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container d-flex justify-content-between align-items-center">
      <div id="logo">
        <a href="index.html"><h3></h3></a>
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li >
            <a href="/">Home</a>
          </li>

          <li >
            <a class="nav-link scrollto" href="/dashboard">Dashboard</a>
          </li>

          <li >
            <a
              class="nav-link scrollto"
              v-if="isLoggedIn"
              href="/auth"
              @click="logout"
              >Logout</a
            >
          </li>
          <li >
            <a class="nav-link scrollto " v-if="!isLoggedIn" href="/auth"
              >Login/Subscribe</a
            >
          </li>
          <li >
            <a class="nav-link scrollto" href="#about">Get Support</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- End Header -->
</template>

<script>
import {ref} from 'vue'
export default {
data(){
selected : Number
},
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
	setup(i){
		this.selected = i

	}
  }
}
</script>

<style>





#header {
  height: 90px;
  transition: all 0.5s;
  z-index: 997;
  background-color: transparent;
}



.navbar ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
}

.navbar > ul > li {
  white-space: nowrap;
  padding: 10px 0 10px 24px;
}
.navbar a,
.navbar a:focus {
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
.navbar a:hover:before,
.navbar li:hover > a:before {
  visibility: visible;
  transform: scaleX(1);
}

</style>
