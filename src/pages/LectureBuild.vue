<template>
  <section class="mainBuild ">
	   <div id="addingFile" v-if="!fileUrl && isHidden">
		   <h4>Please Hold until we save the lecture</h4>
    <base-spinner></base-spinner>
  </div>
  <div id="mainBuild">
  <div v-if="show">
    <div class="legend1">
      <label>
        <strong> Start creating your Lecture </strong>
      </label>
      <br />
      <label for="name"> Please Enter Your Lecture Name </label>
      <input type="text" name="name" id="name" v-model="name" />
<br>
      </div>
      <div class="form-outline w-75 mb-4">
        <label class="form-label" for="description"> Please Describe Your Lecture </label>
          <textarea
          name="description"
          id="description textAreaExample6"
          v-model="description"
          class="form-control"  rows="3"></textarea>
</div>
      <label for="fileUrl"> Please select your lecture file </label>
      <input type="file" name="fileUrl" id="fileUrl" @change="onfileSelected" />
    </div>
    <fieldset class="form-horizontal" @submit.prevent="saveDetails" v-if="show">
      <div class="legend1">
        <label>
          <br>
          <br>
          <strong> <itaic> Start creating your Quiz : </itaic> </strong>
        </label>
<br>
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
          <button  id='buttn'  @click= "addwronganswers">
            Add extra wrong answer
          </button>
          <br>
        </div>
        <br>
        <br>
      </div>
      <div v-if="error">
        <p>
          <strong> {{ errorMessage }} </strong>
        </p>
      </div>
      <div>
        <button   id=" buttn " type="submit" @click="saveDetails">
          Save this question's details
        </button>
      </div>
      <br>
      <br>
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
            <button type="button" @click= "AddQuestion">Next Question</button>
          </div>
        </div>

        <button @click="submitLecture">Save Lecture</button>
      </fieldset>
    </div>
  </div>

  </section>
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
      description: "",
      tempWrongAnswer: "",
      nbrWanswers: 1,
      fileUrl: null,
      file: null,
      uploadValue: null,
	  staffUsers: [],
	  userRole: '',
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
	  myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
},
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
                description: this.description,
                fileUrl: this.fileUrl,
				staffUsers: this.staffUsers,
				userRole: "admin"
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
.mainBuild {
  width: 100%;
  height: 100%;
  background: url(https://firebasestorage.googleapis.com/v0/b/syllab-e.appspot.com/o/unnamed.jpg?alt=media&token=9bf403ec-8e09-43c2-8691-4d6d272f1eb8) top center;
  background-size: cover;
  position: relative;
  padding-top: 100px;
scroll-behavior: smooth;
}
@media (min-width: 1024px) {
  #main {
    background-attachment: fixed;
  }
}
#mainBuild{
  width: 80%;
  height: 100% ;

  margin: 8px auto;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 80px;
  font-size: 15px;
  background-color: white;



  row-gap: 10px;
}


#buttn {
  border: 2px solid black;
  padding: 14px 14px;

  cursor: pointer;
  border: 2px solid #796878;
  transition-duration: 0.4s;
}
#buttn:hover {
  background-color: #008080;
  color: white;
}
#buttn {
  width: 70%;
  padding: 12px 6px;
  align-items: center;
}


</style>
