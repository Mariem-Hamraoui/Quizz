<template>
  <div id="app">
    <form id="upload-form">
      <input type="file" name="file" required />
      <input type="submit" value="Upload" />
    </form>

    <table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>File</th>
        <th>Actions</th>
    </tr>

    <tr v-for="file in files" :key="file.id">
        <td>{{ file.id }}</td>
        <td>{{ file.name }}</td>
        <td>
            [download link here]
        </td>
        <td>
            [delete button here]
        </td>
    </tr>
</table>

  </div>
</template>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";

import {
  getDatabase,
  ref as dbRef,
  push,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBi_DKlPK32LxHFHunBlrknvthTiTGyTrw",

  authDomain: "syllab-e.firebaseapp.com",

  databaseURL:
    "https://syllab-e-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "syllab-e",

  storageBucket: "syllab-e.appspot.com",

  messagingSenderId: "950311166471",

  appId: "1:950311166471:web:baf1cc4221ddc07f4200a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

const database = getDatabase();
const databaseReference = dbRef(database, "files");

window.addEventListener("load", function () {
  document
    .getElementById("upload-form")
    .addEventListener("submit", function () {
      event.preventDefault();
      var form = event.target;

      var file = form.file.files[0];
      console.log(file);

      const storageRef = stRef(storage, "files/" + file.name);

      uploadBytes(storageRef, file).then(function (snapshot) {
        var newFileRef = push(databaseReference);

        set(newFileRef, {
          name: file.name,
        });
      });
    });
});

var vueApp = new Vue({
    el: "#app",
    data: {
        files: []
    },
    // [updated event goes here]
});

onValue(databaseReference, function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        const value = childSnapshot.val();

        const storageRefDownload = stRef(storage, "files/" + value.name);
        getDownloadURL(storageRefDownload).then(function (url) {
            vueApp.files.push({
                "id": childSnapshot.key,
                "name": value.name,
                "url": url
            });
        });
    });
});
</script>
