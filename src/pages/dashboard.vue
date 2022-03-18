<template>
<div>

<base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

<h2>Liste of lectures</h2>
<lectures-received></lectures-received>
</div>

 <a href="http://localhost:8080/build">Add a new Lecture</a>



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
