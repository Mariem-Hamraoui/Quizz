<template>
  <section class="mainBuild ">
	   <div id="addingFile" v-if= "!fileUrl && isHidden">
       <br />
  <br />
		   <h4> Please Hold until we save the lecture </h4>
    <base-spinner> </base-spinner>
  </div>
  <div class="form-group" id="mainBuild">
  <div >
    <div class="legend1">
      <label>
        <br />

      <h5>  <strong> Start creating your Lecture </strong> </h5>
      </label>
      <br />
      <label id ='lbl' for="name"> Please Enter Your Lecture Name </label>
       <br />
      <input type="text" name="name" id="name" v-model= "name" />
<br>
      </div>
      <div class="form-outline w-75 mb-4">
        <label id ='lbl' class="form-label" for="description"> Please Describe Your Lecture </label>
          <textarea
          name="description"
          id="description textAreaExample6"
          v-model= "description"
          class="form-control"  rows="3">
          </textarea>
</div>
      <label id ='lbl' for="fileUrl"> Please select your lecture file </label>
       <br />
      <input type="file" name="fileUrl" id="fileUrl" @change="onfileSelected" />
    </div>
    <fieldset class="form-horizontal" @submit.prevent="saveDetails" v-if="show">
      <div class="legend1">
        <label>
          <br>


  <br />

         <h5> <strong>  Start creating your Quiz :  </strong> </h5>
        </label>
<br>
        <div>
          <label id ='lbl'> Question : </label>
           <br />
          <input type=" text" v-model="QuestionDetails.question" />
           <br />
          <label id ='lbl'> Correct Answer : </label>
           <br />

          <input type=" text" v-model= "QuestionDetails.correctAnswer" />
           <br />
          <label  id ='lbl' > Wrong Answer(s) : </label>
          <ul>
            <div>
              <input type=" text" v-model= "tempWrongAnswer" />
            </div>
            <br />
  <br />
  <br />

          </ul>

          <button  id="login" @click= "addwronganswers">
            Extra wrong answer
          </button>
          <br />
          <br>
        </div>
        <br>
        <br>
      </div>
      <div class =' error ' v-if= "error">
        <p  class =' error '>
          <strong> {{ errorMessage }} </strong>
        </p>
        <br />
  
      </div>
      <br />
      <br />
  <br />

      <div>
        <button id="submitbtn" type="submit" @click= "saveDetails">
          Save Question
        </button>
        <br>

      </div>


    </fieldset>
    <br />

    <div v-if= "submitted && !show">
      <fieldset>
        <br />



        <div>


  <br />
  <br />
          <legend> <h5> The Summary of The Questions    </h5></legend>
          <div>
            <br />
  <br />
            <div>

              <h6> {{ name }} </h6>
           <br />
              <li   v-for= "(qt, index) in quiz" :key="qt"> <span> Here are the details : </span>
              <br />
               <br />

                <p id ='lbl' >
                  <strong> Question n°{{ index + 1 }} :  </strong>
                  {{ qt.question }}
                </p>

                <p id ='lbl' >
                  <strong> Correct Answer : </strong> {{ qt.correctAnswer }}
                </p>

                <div
                  v-for="(WrongAnswer, index) in qt.allwronganswers"
                  :key="WrongAnswer.id"
                >

                  <p id ='lbl' >
                    <strong> Wrong Answer n° {{ index + 1 }} : </strong>
                    {{ WrongAnswer }}
                  </p>
                </div>
                <p>--------------------------------------------------------</p>
              </li>
              <div></div>
            </div>
          </div>
           <br />
          <div>
            <button    type="button" @click= "AddQuestion"> Next Question </button>
          </div>
        </div>
 <br />
  <br />
  <br />
  <br />
  <br />
  <button id="submitbtn"  @click="submitLecture"> Save this Lecture </button>
   <br />
  <br />
  <br />
  <br />
  <br />
     </fieldset>
      <br />
  <br />
  <br />
  <br />
  <br />
       </div>

    <br />
  <br />
  <br />
  <br />
  <br />

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
  background: url(https://superhqwallpapers.com/wp-content/uploads/2021/08/3d-Abstract-Lacza-X8-Wallpaper.jpg) top center;
  background-size: cover ;
  position: static ;
  padding-top: 100px;
  scroll-behavior: smooth ;
  max-width: 100%;
  height: auto;
  opacity : 1 ;
}
@media (min-width: 1024px) {
  #main {
    background-attachment: auto;
  }
}
h5 {
  padding-left: 55px ; 
  color: white;
  text-shadow: 1px 1px 2px black, 0 0 25px  #f1b24b, 0 0 5px darkblue;
}
#mainBuild{
  width: 60%;
  height: 100% ;
  margin: 4px auto;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 70px;
  font-size: 10px;
  background-color: white;
  row-gap: 10px;
  font-size-adjust: 0.58;
  align-items: center;
 border-radius: 25px;
  box-shadow: 0 4px 8px 0 #f1b24b , 0 6px 20px 0  #f1b24b ;
}
button {
 padding: 15px 25px;
 border: unset;
 border-radius: 15px;
 color:  #008080; ;
 z-index: 1;
 background: #e8e8e8;
 position: relative;
 font-weight: 1000;
 font-size: 12px;
 -webkit-box-shadow: 4px 8px 19px -3px  #008080;
 box-shadow: 4px 8px 19px -3px  #008080;
 transition: all 250ms;
 overflow: hidden;
}
button::before {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 width: 0;
 border-radius: 15px;
 background-color: #008080;
 z-index: -1;
 -webkit-box-shadow: 4px 8px 19px -3px  #008080;
 box-shadow: 4px 8px 19px -3px  #008080;
 transition: all 250ms
}
button:hover {
 color: white;
}
button:hover::before {
 width: 100%;
}
input{
  width: 70%;
  height: 40px;
  padding: 14px 14px;
  cursor: pointer;
  border: 2px thin  #008080;
  transition-duration: 0.4s;

}

#lbl {
  font-size: 12px;
  font-family: Times;
   text-transform: capitalize;
}
#submitbtn{
  width: 78%;
  font-size: 15px;
 align-items: center;
}
#submitbtn:active {
  background-color:  #008080 ;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.error {
   font-family: Times;
   text-transform: uppercase;
   color : hsl(0, 100%, 50%);
   width : 80%;
  text-align : center;
  font-size: 13px;
  align-items: center;
}

</style>

