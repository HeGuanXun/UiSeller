<template>
  <div>
    <el-dialog :visible.sync="isShow" width="1%" :center="false"></el-dialog>
  </div>
</template>

<script>
import { eventBus } from "scripts/utils/BUS";
export default {
  components: {},
  data() {
    return {
      title: null,
      isShow: false,
      text: null
    };
  },

  methods: {
    changeStatus(url, ids, status, busName) {
      if (status === this.$START_USE) {
        this.title = "上架";
        this.text = "上架成功！";
      } else {
        this.title = "下架";
        this.text = "下架成功！";
      }
      let form = {
        ids: ids,
        status: status
      };
      this.$axios
        .post(url, form)
        .then(res => {
          this.$alert(this.text, this.title, {
            confirmButtonText: "确定",
            callback: () => {
              console.log(busName);
              eventBus.$emit(busName);
            }
          });
        })
        .catch(e => {
          console.log("e", e);
          return false;
        });
    },
    //wrap dialog
    isDialogShow() {
      this.isShow = this.isShow !== true;
    }
  }
};
</script>
<style scoped lang="sass">
</style>