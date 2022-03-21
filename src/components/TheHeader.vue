<template>
  <header>
    <nav class="w3-wide w3-top">
      <div class="w3-bar w3-wide w3-padding">
        <div class="w3-middle w3-padding-16">
          <div class="w3-display-center w3-padding-large">
            <a class="w3-left w3-xxlarge w3-padding-16" href="/">
              <h1><strong> Syllab-E </strong></h1>
            </a>
          </div>

          <div class="w3-center w3-xlarge w3-hide-small">
            <a href="/homepage" class="w3-right w3-bar-item w3-button">
              <i class="fa fa-home"></i>
            </a>

            <a
              v-if="isLoggedIn"
              href="http://localhost:8080/homepage"
              @click="logout"
              class="w3-right w3-bar-item w3-button"
            >
              <i class="fa fa-sign-out"></i>
            </a>

            <a
              v-if= "isLoggedIn"
              href="/dashboard"
              class="w3-right w3-bar-item w3-button"
            >
              <i class="fa fa-th"></i>
            </a>

            <a
              id="login"
              v-else
              href="/auth"
              class="w3-right w w3-bar-item w3-button"
            >
              <i class="fa fa-sign-in"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div class="w3-display-container w3-content" >

<img class="w3-display-middle"
 
 src="https://firebasestorage.googleapis.com/v0/b/syllab-e.appspot.com/o/R.6a11584328c87beea765fa1e3f0bcd4a.png?alt=media&token=75853878-8553-4c9a-a6a2-6f85e0d9ce33" 
 
 alt="Lights"  width="1800" height="800">
 
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

<style scoped>
</style>


