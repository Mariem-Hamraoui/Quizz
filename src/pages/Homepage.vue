
<template>

<body>
  <header class="header">	
	<div class="text-box">
		<h1 class="heading-primary">
			<span class="heading-primary-main"> Syllab-E  </span>
			<span class="heading-primary-sub"> We Are The Best  </span>
		</h1>
    <div class="d-grid gap-2">
  <a class="btn btn-lg btn-secondary" href="/auth"  role="button" type="button"> <strong> Get started </strong> </a>
  
</div>

	
	</div>
</header>
 
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
body {
  	font-family: 'Lato', sans-serif;
  	font-weight: 400;
  	font-size: 16px;
  	line-height: 1.7;
  	color: #eee;
}
h1 {
  font-family: 'Dancing Script', cursive;
}
.header {
  	height: 100vh;
  	background-image: url('https://lh6.googleusercontent.com/proxy/qqFjqZlPk8IFDq3iB4Q23yfL3BZGhrQL1paqjdxLYjfFei1BzfLHR_Jjk1j7h_paXBiJRNo97mjmQiyLyQRJlgA6efvGH8lR_Cl2jRpT7ePF_tsskJ02Ed2PQD9gOKYe=w1200-h630-p-k-no-nu'); 	
	  background-size: cover;
  	background-position: top;
  	position: relative;
  	 /* clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%); */
}

.text-box {
  	position: absolute;
  	top: 40%;
  	left: 50%;
  	transform: translate(-50%, -50%);
  	text-align: center;
    
}

.heading-primary {
  	color: #fff;
  	text-transform: uppercase;
  	backface-visibility: hidden;
  	margin-bottom: 100px;
}

.heading-primary-main {
  	display: block;
  	font-size: 50px;
  	font-weight: 400;
  	letter-spacing: 5px;
}

.heading-primary-sub {
  	display: block;
  	font-size: 30px;
  	font-weight: 300;
  	letter-spacing: 7.4px;
}

.btn:link,
.btn:visited {
  color: #008080 ;
  	text-transform: uppercase;
  	text-decoration: none;
  	padding: 16px 40px;
  	display: inline-block;
  	border-radius: 100px;
  	transition: all .2s;
  	position: relative;
}

.btn:hover {
  	transform: translateY(-3px);
  	box-shadow: 0 10px 20px #008080;
}

.btn:active {
  	transform: translateY(-1px);
  	box-shadow: 0 5px 10px #008080;
}

.btn-white {
  	
  	color: #008080 ;
	font-size: 14px;
}


</style>

