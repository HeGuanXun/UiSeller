<template>
  <el-form
    :model="loginForm"
    :rules="fieldRules"
    ref="loginForm"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
    style="width: 400px"
  >
    <div style="display:flex;  justify-content: flex-end;">
      <h2 class="title">{{ $t("login.title") }}</h2>
      <el-dropdown >
        <span class="el-dropdown-link" style="line-height: 30px;font-size: 16px;">
          <i class=" el-icon--left">{{title}}</i>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="margin-top: -20px;">
          <el-dropdown-item
                  v-for="(item, index) in lang"
                  :key="index"
                  :index="item.id"
                  @click.native="locale(item)"
          >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-form-item prop="account">
      <el-input
        type="text"
        v-model="loginForm.account"
        auto-complete="off"
        :placeholder="vm.$t('login.account')"
        suffix-icon="el-icon-user"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        auto-complete="off"
        :placeholder="vm.$t('login.password')"
        @keyup.enter.native.prevent="login"
        show-password
      ></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">{{
      $t("login.remember")
    }}</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:48%;"
        @click.native.prevent="login"
        :loading="loading"
        >{{ $t("login.Sign_in") }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import vm from "@/main";
import Vue from "vue";
// vm.$t("home.title"),
const localStorage = window.localStorage;
const { log } = console;
import url from "api";
import * as types from "scripts/store/mutation-types";
export default {
  name: "Login",
  data() {
    return {
      vm: vm,
      title:
        window.localStorage.getItem("platform_Internation") == null
          ? "中"
          : window.localStorage.getItem("platform_Internation_name"),
      lang: [
        { id: "cn", name: "简体中文", key: "中" },
        { id: "en", name: "English", key: "EN" }
      ],
      fieldRules: {
        account: [
          {
            required: true,
            message: vm.$t("login.Input_account"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: vm.$t("login.Input_password"),
            trigger: "blur"
          }
        ]
      },
      loading: false,
      loginForm: {
        account: "",
        password: ""
      },
      checked: true
    };
  },
  methods: {
    locale(item) {
      this.$i18n.locale = item.id;
      if((window.localStorage.getItem("platform_Internation") == item.id)){
        return ;
      }
      document.title = this.$t("common.document_title");
      window.localStorage.setItem("platform_Internation",item.id);
      window.localStorage.setItem("platform_Internation_name",item.key);
      this.title=window.localStorage.getItem("platform_Internation_name");
      window.location.reload();
    },
    login() {
      const self = this;
      if (!self.loginForm.account) {
        this.$message.error(self.$t("login.Input_account"));
        return;
      }
      if (!self.loginForm.password) {
        this.$message.error(self.$t("login.Input_password"));
        return;
      }
      self.loading = true;
      let login = {
        username: self.loginForm.account,
        password: self.loginForm.password,
        grant_type: "password",
        client_id: "platform",

        client_secret: "platform",
        scope: "xx",
        role_type:1,
      };
      this.$axios({
        method: "post",
        url: url.login,
        params: login
      })
        .then(res => {
          self.$store.commit(types.TOKEN, res.data.access_token);
          let login_info = JSON.stringify(self.loginForm);
          if (self.checked) {
            localStorage.setItem("login_info", login_info);
          } else {
            if (localStorage.getItem("login_info")) {
              localStorage.removeItem("login_info");
            }
          }
          this.$axios.get(url.navbar_url).then(res => {
            let data = res.data.data;
            self.$store.commit(types.USERNAME, data.username);
            self.$store.commit(types.INVITE, data.inviteNum);
            self.$store.commit(types.NAV, data.platformRole);
            if (data.platformRole==21 || data.platformRole==31 || data.platformRole==41|| data.platformRole==51){
              console.log('platformRole:',data.platformRole);
              this.$message.error(self.$t("login.login"));
              this.loading = false;
            }else {
              Vue.prototype.$platformRole = data.platformRole;
              this.$router.push("home");
            }
          });
        })
        .catch(error => {
          log(error.response.data.error_description);
          if (
            error.response.data.error_description == "User account is locked"
          ) {
            this.$message.error(self.$t("login.contact"));
          } else {
            this.$message.error(self.$t("login.response"));
          }
          self.loading = false;
        });
    },
    remeber() {
      let self = this;
      if (localStorage.getItem("login_info")) {
        let login_info = JSON.parse(localStorage.getItem("login_info"));
        self.loginForm = login_info;
      }
    }
  },
  mounted() {
    this.remeber();
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
