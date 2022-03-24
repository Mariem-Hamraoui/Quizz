<template>
  <div>
    <h2>Lecture Name: {{ req.name }}</h2>

    <button @click="toggleDetails">Show Details</button>
    <ul v-if="detailsAreVisible">
      <div>
        <strong>Description:</strong>
        {{ req.description }}
      </div>
      <div>
        <button @click="deleteLecture(req.name)">Delete</button>
        <button @click="inviteStaff">Invite staff</button>
        <div>List of staff invited already</div>
		<input type="email" name="staffemail" id="staffemail" v-model="staffemail">
      </div>
    </ul>
  </div>
</template>

<script>

import firebase from "firebase";





export default {
  props: ["req"],
  data() {
    return {
      detailsAreVisible: false,
	  staffemail:""
    };
  },

  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
   async inviteStaff() {
		await this.$store.dispatch("signup", {email: this.staffemail, password: "p@ssw0rd"});
		
	},

    deleteLecture(doc) {


console.log(firebase)


	}
  }
}
</script>
