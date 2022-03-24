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
        <button @click="deleteLecture(req)">Delete</button>
        <button @click="inviteStaff">Invite staff</button>
        <div>List of staff invited already</div>
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
    };
  },

  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    inviteStaff() {},

    deleteLecture(item) {
      db.collection("lectures")
        .doc(item)
        .delete()
        .then(() => {
          console.log("deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
