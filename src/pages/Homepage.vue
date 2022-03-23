
<template>

<body>
   <!-- ======= main Section ======= -->
  <section id="main">
    <div class="main-container" data-aos="zoom-in" data-aos-delay="100">
      <h1>Welcome to Syllab-E</h1>
      <h2>There is no better investment than investing in staff</h2>

      <a href="/auth" class="btn-get-started">Get Started</a>
    </div>
  </section><!-- End main Section -->


</body>

</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style>
/*--------------------------------------------------------------
# main Section
--------------------------------------------------------------*/
#main {
  width: 100%;
  line-height: 3;
  height: 100vh;
  background: url(https://firebasestorage.googleapis.com/v0/b/syllab-e.appspot.com/o/unnamed.jpg?alt=media&token=9bf403ec-8e09-43c2-8691-4d6d272f1eb8) top center;
  background-size: cover;
  position: relative;
}
@media (min-width: 1024px) {
  #main {
    background-attachment: fixed;
  }
}
#main:before {
  content: "";
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}
#main .main-container {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
#main h1 {
  margin: 30px 0 10px 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  text-transform: uppercase;
  color: #fff;
}
@media (max-width: 768px) {
  #main h1 {
    font-size: 28px;
    line-height: 36px;
  }
}
#main h2 {
  color: #eee;
  margin-bottom: 50px;
  font-size: 24px;
}
@media (max-width: 768px) {
  #main h2 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
  }
}
#main .btn-get-started {
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 8px 28px;
  border-radius: 50px;
  transition: 0.5s;
  margin: 10px;
  border: 2px solid #fff;
  color: #fff;
}
#main .btn-get-started:hover {
  background: #2dc997;
  border: 2px solid #2dc997;
}


</style>

