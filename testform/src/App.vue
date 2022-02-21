<template>
  
 <Signupform /> 
 
</template>

<script>

import Signupform from "./components/Signupform"
export default {
  name: 'App',
  components: {
   Signupform
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eee;
  margin-top: 60px;
}

body{
  margin: 0;
	background-color: #eee ;
	
}

</style>
