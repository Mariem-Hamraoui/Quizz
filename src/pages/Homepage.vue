<template>
<div>
<h1 class="text" > Welcome .. </h1>
</div>
<div class="footer">
  <p> Syllab-E @copyright 2022 </p>
</div>

</template>

<script>
export default {
  data() {
    return {

    };
  },


};
</script>
<style>
.image-container {
  background-image: url("https://t4.ftcdn.net/jpg/01/70/39/31/240_F_170393125_mfWPF31rkTOg52uPLCDeegwpcR1KuPxX.jpg"); /* The image used - important! */
  background-size: cover;
  position: relative; /* Needed to position the cutout text in the middle of the image */
  height: 300px; /* Some height */
}

.text {
  background-color: #b31b1b;
  color: black;
  font-size: 10vw; /* Responsive font size */
  font-weight: bold;
  margin: 0 auto; /* Center the text container */
  padding: 10px;
  width: 50%;
  text-align: center; /* Center text */
  position: absolute; /* Position text */
  top: 50%; /* Position text in the middle */
  left: 50%; /* Position text in the middle */
  transform: translate(-50%, -50%); /* Position text in the middle */
  mix-blend-mode: screen; /* This makes the cutout text possible */
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color:#008080 ;
  color: white;
  text-align: center;
  letter-spacing: 1px;
   font-size: 0.8em;
   padding: 10px 10px;
  

}




</style>
