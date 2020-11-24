<template>
    <div style="width: 0px;height: 0px">
        <el-image v-if="isShow"
                  id="imgSrc_"
                  :src="src"
                  :preview-src-list="srcList">
        </el-image>
    </div>
</template>

<script>
    import API from "scripts/utils/api";

    export default {
        data() {
            return {
                type: 1,
                oss_url: API.oss_url,
                isShow: false,
                src: null,
                srcList: [],
                title: ''
            }
        },
        mounted() {

        },
        methods: {
            //wrap dialog
            isDialogShow(url, title, type) {
                this.toShow(url, title, type);
                setTimeout(() => {
                    this.toShow(url, title, type);
                }, 200)
            },
            toShow(url, title, type) {
                console.log(url);
                this.isShow = true;
                this.srcList = [];
                if (type !== 2) {
                    this.src = this.$url.oss_url + url;
                } else {
                    this.type = type;
                    this.src = url;
                }
                this.srcList.push(this.src);
                this.title = title;
                setTimeout(function () {
                    document.getElementById('imgSrc_').click();
                }, 200)
            }
        }
    }
</script>
<style scoped lang="sass">
</style>
