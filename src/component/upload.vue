<template >
    <div>
        <div>
            <br/>
        </div>
        <div class="upload-container" >
            <div class="upload">
                <div class="uploader">
                    <input type="file" @change="uploadChange" ref="businessUrl" />
                    <div v-if="form.businessUrl" class="pic">
                        <img :src="$url.oss_url+form.businessUrl" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { uploadOSS } from 'scripts/utils/ali-up';
    import API from 'scripts/utils/api';
    import { eventBus } from "scripts/utils/BUS";
    import urls from "@/scripts/api";

    export default {
        components: {},
        data () {
            return {
                eventBus:'showImgEventBus',
                form:{
                    businessUrl:null
                }
            };
        },
        props: {
            type: String,
            callbackUrl:String
        },
        watch:{
            businessUrl(businessUrl){
                this.form.businessUrl = businessUrl;
                this.callbackUrl = businessUrl;
            }
        },
        computed: {},

        mounted(){
            eventBus.$on(this.eventBus,(img_url) => {
                this.form.businessUrl = img_url;
            });
        },
        beforeDestroy() {
            eventBus.$off(this.eventBus);
        },
        methods: {
            //upload
            async uploadChange() {
                const file = this.$refs.businessUrl.files[0];
                if (!/(jpg$)|(png$)|(bmp$)|(jpeg$)/i.test(file.type)) {
                    this.$alert('图片格式只能是jpg，png，bmp，jpeg', '格式检验', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                const isLt3M = file.size / 1024 / 1024 > 3;
                if (isLt3M) {
                    this.$alert('上传图片大小不能超过 3MB!！', '', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                const res = await uploadOSS(file, this, `platform/img/register/${this.type}/`,loading);
                if (res) {
                    this.$set(this.form, 'businessUrl', `${res.name}`);
                    this.$set(this.form, 'businessUrlTmp', `${res.name}`)
                    eventBus.$emit("getBusinessUrl",res.name);
                }
            },
            //register
            registerSrc(src){
                this.title = '点击图片可以重新上传';
                this.form.businessUrl = src;
            },
            init(){
                this.title = '上传营业执照';
                this.form.businessUrl = null;
            }
        }
    }
</script>
<style scoped>
    .upload-container .uploader
    { width: 8rem; height: 8rem; margin-left: 10px; position: relative; overflow: hidden;
    background: url(../assets/upload-bg.png) left / cover no-repeat; border-radius: 0.01rem; border: 0.01rem solid #eee; box-sizing: border-box; }
    .upload-container .uploader input { position: absolute; left: 0; top: 0; opacity: 0;width: 100%; height: 100%;}
    .upload-container .uploader .pic { width: 100%; height: 100%;}
    .upload-container .uploader .pic img { width: 100%; min-height: 100%;}
</style>
