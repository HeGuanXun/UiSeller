<template >
  <div>
  </div>
</template>

<script>
import { uploadOSS } from "scripts/utils/ali-up";
import API from "scripts/utils/api";
import { eventBus } from "scripts/utils/BUS";
export default {
  components: {},
  props: {
    title: String,
    type: String
  },
  data() {
    return {
      //   title: "上传营业执照",
      form: {
        businessUrl: null
      }
    };
  },

  computed: {},

  mounted() {},

  methods: {
    //upload
    async uploadChange(type,file,bus) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const res = await uploadOSS(
        file,
        this,
        `plantForm/img/register/${type}/`,
        loading
      );
      if (res) {
        console.log(res);
        console.log(bus);
        eventBus.$emit(bus, `${res.name}`);
      }
    },
    //register
    registerSrc(src) {
      //   this.title = "点击图片可以重新上传";
      this.form.businessUrl = src;
    },
    init() {
      //   this.title = "上传营业执照";
      this.form.businessUrl = null;
    }
  }
};
</script>
<style scoped>
.upload-container .uploader {
  width: 10rem;
  height: 9rem;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background: url(../assets/upload-bg.png) center / cover no-repeat;
  border-radius: 0.02rem;
  border: 0.01rem solid #eee;
  box-sizing: border-box;
}
.upload-container .uploader input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.upload-container .uploader .pic {
  width: 100%;
  height: 100%;
}
.upload-container .uploader .pic img {
  width: 100%;
  min-height: 100%;
}
</style>
