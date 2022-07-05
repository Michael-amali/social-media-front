<template>
  <div class="file-upload">
    <div>
      <div class="container">
        <h1>This is an file upload</h1>
        <form>
          <div class="form-group">
            <input type="file" @change="uploadFile" multiple ref="file" />
          </div>
          <div class="form-group">
            <v-btn
              class="btn btn-success btn-block btn-lg"
              @click="handleSubmit"
              >Upload</v-btn
            >
          </div>
          <div style="width: 40%; margin-top: 4px">
            <v-text-field
              name="text"
              v-model="textData"
              type="text"
              color="primary"
              outlined
              label="type something"
              required
            ></v-text-field>
          </div>
        </form>
      </div>
    </div>
    <div>
      <div class="text-center">Demo</div>
      <lottie :options="defaultOptions" :width="500" :height="500" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../../env.js";
import * as animationData from "@/assets/animations/macho-man-lottie.json";
import lottie from "vue-lottie";
export default {
  name: "FileUpload",

  components: {
    lottie,
  },
  data() {
    return {
      files: null,
      textData: "",

      defaultOptions: {
        animationData: animationData.default,
      },
    };
  },
  methods: {
    uploadFile(event) {
      this.files = event.target.files;
    },
    handleSubmit() {
      let formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[" + i + "]", file);
      }

      axios
        .post(
          `${BASE_URL}/api/upload-cloud`,
          formData,
          {},
          { credentials: true, origin: true }
        )
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>
