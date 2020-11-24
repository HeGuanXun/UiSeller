import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "@/axios";
import store from "./scripts/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss";
import * as types from "scripts/store/mutation-types";
import * as constants from "scripts/utils/constant";
import url from "scripts/api/index";
import VueClipboard from "vue-clipboard2";
import VueI18n from "vue-i18n";
import Videojs from 'video.js';
import 'video.js/dist/video-js.css';
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale:
      window.localStorage.getItem("platform_Internation") == null ||
      window.localStorage.getItem("platform_Internation") == "ch"
          ? "cn"
          : window.localStorage.getItem("platform_Internation"),
  messages: {
    cn: require("scripts/lang/cn"),
    en: require("scripts/lang/en")
  }
});
Vue.prototype.$video = Videojs;
Vue.use(VueClipboard);
Vue.prototype.$axios = axios;
Vue.prototype.$vue = Vue;
Vue.prototype.$url = url;
Vue.prototype.$CONSTANTS = constants;
Vue.use(ElementUI);
Vue.config.productionTip = false;
function restoreState() {
  /**
   * save the global 'Vue',it is important;the name is $vm,for exaple:store.getters.$vm
   */
  //store.commit(types.VUE, Vue);

  if (window.location.href.indexOf("#/login") < 0) {
    if (
      !window.sessionStorage ||
      !window.sessionStorage.getItem("yl-platForm-sess-state")
    ) {
      router.replace("/login");
      return;
    }
    //save
    const savedstate = JSON.parse(
      window.sessionStorage.getItem("yl-platForm-sess-state")
    );
    if (savedstate) {
      store.commit(types.RESTORE_STATE, savedstate);
      // store.state.age
      if (!savedstate.common.token) router.replace("/login");
    } else {
      router.replace("/login");
    }
  }
}
let vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  created() {
    restoreState();
  },
  render: h => h(App),
}).$mount("#app");
export default vm;
