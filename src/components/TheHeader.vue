<template >
  <header>
  <nav class="navbar  navbar-expand-lg  navbar-light bg-light" >
  <div class="container-fluid">
    <a class="navbar-brand" href="/" style='font-family: Josefin Sans ; font-size: 20px; color: 	#8B008B ; letter-spacing: 7.4px;'> <strong> SYLLAB-E  </strong>  </a>
   <div class="collapse navbar-collapse" id="navbarColor03">
      <ul class=" nav-item active" id="navb" >
        <li class="nav-item  ">
          <a class="nav-link" href="/homepage"> &nbsp; &nbsp; &nbsp;
           <i class="fa fa-home"></i> &nbsp;  Homepage     &nbsp; </a>
        </li>
        
         <li class="nav-item">
          <a class="nav-link"  v-if= "isLoggedIn"
              href="http://localhost:8080/homepage"
              @click= "logout"> <i class="fa fa-sign-out"></i>  &nbsp; logout  &nbsp; </a>  
        </li>
        <li class="nav-item">
          <a class="nav-link" v-if= "isLoggedIn"
              href="/dashboard"> <i class="fa fa-th"> </i>  &nbsp; Dashboard   &nbsp;  </a> 
        </li>

        <li  class="navbar-nav me-auto">
          <a class="nav-link" id="login" v-if= "!isLoggedIn" href="/auth"> 
          <i class="fa fa-sign-in"> </i> &nbsp;  Login  &nbsp;
            
          </a>
        </li>
        
      </ul>
      <form class="d-flex">
       &nbsp;  <input class="form-control me-lg-2" type="text" placeholder="Search">
        &nbsp; <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav> 

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

 #navbarColor03 ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  display: inline-block ;
}

</style>


