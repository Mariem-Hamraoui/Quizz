<template>
  <div class="mainSupport ">
    <div class="card">
      <div>
            <br />
        <h5> Support  request </h5>
      </div>
      <div class="modal-body">
        <div class="text-center">
          <i class="far fa-file-alt fa-4x mb-3 text-primary"></i>
          <p id="lbl">
            <strong> Your Feedback matters </strong>
          </p>
          <p id="lbl">  Need Support ?

             <strong> Give us your feedback </strong>
          </p>        
      <div class="form-outline w-80 mb-4">
        <label id ='lbl' class="form-label" for="description"> Please Describe Your Support Request </label>
          <textarea name="description" id="description textAreaExample6 "
              v-model= "description"  class="form-control"  rows= "5">
          </textarea>
            </div>
            <br />
  <br />
  <button id="submitbtn"  > Submit Request  </button>
   <br />
  <br />
        </div>
      </div>
    </div>
  </div>
  <footer class="text-center text-white " style="background-color:  #003f5c;">
 
  <div class="container p-2">
      <div>
         
          <h6 class="text-uppercase fw-bold mb-4">
            Contact
          </h6>
          <p> <i class="fas fa-home me-3"> </i> Tunisia, TN 10012, TN </p>
          <p>
            <i class="fas fa-envelope me-3"></i>
             syllab-e@example.com
          </p>
          <p><i class="fas fa-phone me-3"> </i> + 216 234 567 88</p>
          <p><i class="fas fa-print me-3"> </i> + 216 234 567 89</p>
        </div>
  </div>

  <div class="text-center p-2" style="background-color: #008080 ;" >
    
    © 2022 Copyright &nbsp
    
    <a class="text-white" href="https://Syllab-E.com/"> Syllab-E.com </a>
  
      </div>
  
   
  
</footer>
</template>

<style>
.card {
  padding-top: 20px;
  margin-left: 30%;
  margin-top : 10%;
  width: 40%;
  align-items: center;
  width: middle;
  border-radius: 70px;
  background: white;
  box-shadow: 10px 10px 15px #bebebe, -10px -10px 15px #ffffff;
}
.mainSupport {
  padding-top: 50px;
  background-size: cover;
  position: relative;
  font-family: "Lato", sans-serif;
  height: 118vh;
  background-image: url(https://superhqwallpapers.com/wp-content/uploads/2021/08/3d-Abstract-Lacza-X8-Wallpaper.jpg);
  background-attachment: fixed;
  align-items: center;
  text-align: center;
}

 
</style>