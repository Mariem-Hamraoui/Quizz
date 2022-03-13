<template>
  <div class="file-upload">
    <input type="file" @change="onFileChange" />
    <div v-if="progress" class="progess-bar" :style="{'width': progress}">
       {{progress}}
    </div>
    <button @click="onUploadFile" class="upload-button"
    :disabled="!this.selectedFile">Upload file</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: "",
      progress: 0
    };
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0];
      this.selectedFile = selectedFile;
      this.progress = 0;
    },
    onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file

      axios
        .post("http://localhost:8080/upload", formData, {
          onUploadProgress: ProgressEvent => {
            let progress =
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
              +"%";
            this.progress = progress;
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>