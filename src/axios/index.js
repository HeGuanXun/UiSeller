import axios from "axios";
import store from "scripts/store";
import { MessageBox } from "element-ui";
import code from "scripts/utils/businessCode";

axios.defaults.timeout = 15000;

axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["authorization"] = "bearer" + store.getters.token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

function error(text) {
  MessageBox.confirm(text, {
    showCancelButton:false,
    showConfirmButton:false,
    type: "warning"
  })
}

// respone拦截器
axios.interceptors.response.use(
  response => {
    const res = response.data;
    if (res?.status && res.status != 200) {
        let lang = window.localStorage.getItem("platform_Internation");
        if (code.code[res.businessCode]) {
            if (lang==='en'){
                error(code.code[res.businessCode].en);
            }else {
                error(code.code[res.businessCode].ch);
            }
      } else {
            if (lang==='en'){
                error('System error, please contact the administrator for the reason');
            }else {
                error("系统错误，请联系管理员查询原因");
            }
      }
      return Promise.reject(res);
    } else {
      return response;
    }
  }
);

export default axios;
