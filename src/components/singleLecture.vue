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
        <input
          type="email"
          name="staffemail"
          id="staffemail"
          v-model="staffemail"
        />
        <button type="submit" @click="inviteStaff">add staff</button>
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
      staffemail: "",
    };
  },

  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    async inviteStaff() {

///create the staff user if it doesn't existe else location the userID

      const url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBi_DKlPK32LxHFHunBlrknvthTiTGyTrw";

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: this.staffemail,
          password: "p@ssw0rd",
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();
      const userId = responseData.localId;
      console.log(userId);
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to create - user already added"
        );
        throw error;
      }


///add the lecture the new staff user account
      const newLecture = {
        quiz: this.req.quiz,
        name: this.req.name,
        fileUrl: this.req.fileUrl,
        description: this.req.description,
		userRole:"staff"
      };
      const staffresponse = await fetch(
        `https://syllab-e-default-rtdb.europe-west1.firebasedatabase.app/lectures/${userId}.json`,
        {
          method: "POST",
          body: JSON.stringify(newLecture),
        }
      );

      const staffresponseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to send Lecture."
        );
        throw error;
      }


    },

    deleteLecture(doc) {
      console.log(firebase);
    },
  },
};
</script>
