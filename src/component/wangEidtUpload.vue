<template >
  <div></div>
</template>

<script>
import { uploadOSS } from "scripts/utils/ali-up";
import API from "scripts/utils/api";
import { eventBus } from "scripts/utils/BUS";
export default {
  components: {},
  data() {
    return {
      callbackBus: 'callbackBus',
      bus:'editorBus',
      //   title: "上传营业执照",
      form: {
        businessUrl: null
      },
      oss_url:API.oss_url
    };
  },

  computed: {},

  mounted() {
    eventBus.$on(this.bus,(file,type)=>{
      this.uploadChange(file,type);
    });


  },
  beforeDestroy() {
    eventBus.$off(this.bus);
  },
  methods: {
    //upload
    async uploadChange(file,type) {
      if (!/(jpg$)|(png$)|(bmp$)|(jpeg$)|(mp4$)/i.test(file.type)) {
        this.$alert(`${this.$t("conmon.operation")}`, `${this.$t("conmon.operation")}`, {
          confirmButtonText: `${this.$t("currency.Determine")}`
        });
        return false
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const res = await uploadOSS(
        file,
        this,
        `seller/img/register/${type}/`,
        loading
      );
      if (res) {
        eventBus.$emit(this.callbackBus, `${res.name}`);
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
  width: 8rem;
  height: 8rem;
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
