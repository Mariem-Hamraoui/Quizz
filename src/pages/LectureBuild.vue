<template class="outer">

  <div v-if="!isHidden">
    <div class="legend1">
      <label>
        <strong> Start creating your Lecture </strong>
      </label>

      <label for="name"> Please enter your lecture name </label>

      <input type="text" name="name" id="name" v-model="name" />

      <label for="fileUrl"> Please select your lecture file </label>

      <input type="file" name="fileUrl" id="fileUrl" @change="onfileSelected" />
    </div>

    <fieldset class="form-horizontal" @submit.prevent="saveDetails" v-if="show">
      <div class="legend1">
        <label>
          <strong> Start creating your Quiz </strong>
        </label>

        <div>
          <label> Question : </label>

          <input type=" text" v-model="QuestionDetails.question" />

          <label> Correct Answer : </label>

          <input type=" text" v-model="QuestionDetails.correctAnswer" />

          <label> Wrong Answer(s) : </label>
          <ul>
            <div>
              <input type=" text" v-model="tempWrongAnswer" />
            </div>
          </ul>
          <button id=" button" @click="addwronganswers">
            Add extra wrong answer
          </button>
        </div>
      </div>
      <div v-if="error">
        <p>
          <strong> {{ errorMessage }} </strong>
        </p>
      </div>
      <div>
        <button id="submit" type="submit" @click="saveDetails">
          Save this question's details
        </button>
      </div>
    </fieldset>

    <div v-if="submitted && !show">
      <fieldset>
        <div>
          <legend>Question's details Summary</legend>
          <div>
            <div>
              <h1>{{ name }}</h1>
              <li v-for="(qt, index) in quiz" :key="qt">
                <p>
                  <strong> Question N°{{ index + 1 }} </strong>
                  {{ qt.question }}
                </p>

                <p>
                  <strong> The correct Answer : </strong> {{ qt.correctAnswer }}
                </p>

                <div
                  v-for="(WrongAnswer, index) in qt.allwronganswers"
                  :key="WrongAnswer.id"
                >
                  <p>
                    <strong> Wrong Answer {{ index + 1 }}: </strong>
                    {{ WrongAnswer }}
                  </p>
                </div>
                <p>--------------------------------------------------------</p>
              </li>

              <div></div>
            </div>
          </div>

          <div>
            <button type="button" @click="AddQuestion">Next Question</button>
          </div>
        </div>
        <button @click="submitLecture">Save Lecture</button>
      </fieldset>
    </div>
  </div>
  <div v-if="!fileUrl && isHidden">
    <base-spinner></base-spinner>
  </div>
</template>

<script>
import firebase from "firebase";

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

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default {
  data() {
    return {
      quiz: [],
      name: "",
      tempWrongAnswer: "",
      nbrWanswers: 1,
      fileUrl: null,
      file: null,
      uploadValue: null,

      QuestionDetails: {
        question: "",
        correctAnswer: "",
        allwronganswers: [],
      },
      error: false,
      empty: false,
      submitted: false,
      show: true,
      isHidden: false,
    };
  },
  methods: {
    addwronganswers() {
      if (this.tempWrongAnswer) {
        this.QuestionDetails.allwronganswers.push(this.tempWrongAnswer);
        this.tempWrongAnswer = "";
        this.empty;
      }
    },
    onfileSelected(event) {
      this.fileUrl = null;
      this.file = event.target.files[0];
      console.log(event);
    },
    saveDetails() {
      if (this.QuestionDetails.allwronganswers !== [] && this.tempWrongAnswer) {
        this.QuestionDetails.allwronganswers.push(this.tempWrongAnswer);

        const finalversion = JSON.parse(JSON.stringify(this.QuestionDetails));

        this.quiz.push(finalversion);

        this.tempWrongAnswer = "";

        this.QuestionDetails.allwronganswers = [];

        this.submitted = true;

        this.show = false;
      } else {
        this.error = true;

        this.errorMessage = `Oops .. Please fill the empty fields! `;
      }
    },
    detecterror() {
      this.error = true;
    },
    AddQuestion() {
      this.show = true;
      this.QuestionDetails.allwronganswers = [];
      this.tempWrongAnswer = "";
      this.QuestionDetails.question = "";
      this.QuestionDetails.correctAnswer = "";
      this.errorMessage = [];
      this.errorMessage = null;
    },

    async submitLecture() {
      this.fileUrl = null;
      const storageRef = firebase.storage().ref(`${this.name}`).put(this.file);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;

          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.fileUrl = url;
            this.$store
              .dispatch("lectures/createLecture", {
                quiz: this.quiz,
                name: this.name,
                fileUrl: this.fileUrl,
              })
              .then((links) => {
                window.location.href = "http://localhost:8080/dashboard";
              });
          });
        }
      );
      this.isHidden = true;
    },
  },
};
</script>

<style>
fieldset {
  width: 100%;
  max-width: 700px;
  padding: 10px 20px;
  margin: 10px auto;
  padding: 20px;
  border-radius: 8px;
  padding-top: 50px;
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 80px;
  font-size: 2em;
  background-color: white;
  background-attachment: scroll;
  border: 2px solid #796878;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
}

label {
  color: black;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  margin-left: 20px;
  display: block;
  padding: 10px 6px;
  width: 80%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid black;
  color: black;
  background-color: #d1e8d9;
}
div {
  color: black;
  width: 100%;
  margin-bottom: 10px;
}

.legend1 {
  margin-bottom: 0px;
  margin-left: 16px;
}

#w3-container w3-margin-top {
  width: 300px;
  height: 100px;
  padding: 50px;
  border: 1px solid;
  color: black;
}

button {
  border-radius: 12px;
  width: 50%;
  padding: 14px 40px;
  position: relative;
  background-color: white;
  color: black;
  border: 2px solid #796878;
  transition-duration: 0.4s;
  align-items: center;
}

button:hover {
  background-color: #008080;
  color: white;
}

#submit {
  width: 90%;
}
</style>
