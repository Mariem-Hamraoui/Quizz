<template>
<div>

<base-dialog :show= "!!error" title="An error occurred!" @close= "handleError">
      <p style="color: #ff0000">{{ error }}</p>
    </base-dialog>
 <div class="background">

<h2>  List of lectures </h2>

<lectures-received></lectures-received>

</div>

 <a class="aa" href="http://localhost:8080/build"> Add a new Lecture </a>

</div>

</template>

<script>
import lecturesReceived from './lecturesReceived.vue'
export default {

	components: {
    lecturesReceived,
  },
  data() {
    return {};
  },
methods: {
	switchToBuild(){

	}
}

};
</script>

<style>

.background {
  box-shadow: 0 4px 8px 0 #5f9ea0 ;
  max-width: 700px;
  margin: auto;
  text-align: center;
  font-family: serif ;

    color: black  ;

}

.aa {
  color: #3c1414  ;
  font-family: serif ;
  border: none;
  outline: 0;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  }


</style>