import * as types from "scripts/store/mutation-types";
import store from "./scripts/store";

var logout = function(){
    let self = this;
    let data = "access_token=" + this.$store.getters.token;
    let param = {
        grant_type: "password",
        client_id: "platform",
        client_secret: "platform",
        scope: "xx"
    };
    localStorage.removeItem("login_info");
    this.$store.commit(types.LOGOUT);
    this.$router.push("/login");
    this.$axios
        .delete(url.login, {
            params: param,
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(function(res) {
        })
        .catch(error => {
        });
};

export default logout;
