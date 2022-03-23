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
        <button>Delete</button>
		<button @click="inviteStaff">Invite staff</button>
		<div>List of staff invited already</div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["req"],
  data() {
    return {
      detailsAreVisible: false,

    };
  },

  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
inviteStaff(){

}
  },
};
</script>
