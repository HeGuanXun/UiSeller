<template>
  <div class="fullsize topbar">
    <div style="margin-left:20px;margin-top:33px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="item.label"
          :name="item.name"
          :data-list="item.navList"
          v-for="(item,index) in tabBarList"
          :key="index"
          :index="item.url"
        ></el-tab-pane>
      </el-tabs>
      <!--operation component-->
      <operation  ref="operation"/>
    </div>
    <div class="centerflex">
      <h5>{{ roleName }}</h5>
      <el-menu class="el-menu-demo" mode="horizontal" default-active="">
        <el-submenu index="lang" >
          <template slot="title">{{ onlang }}</template>
          <el-menu-item
                  v-for="(item, index) in lang"
                  :key="index"
                  :index="item.id"
                  @click="locale(item)"
          >{{ item.name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
      <el-menu class="el-menu-demo" mode="horizontal" default-active>
        <el-submenu index="1">
          <template slot="title" >
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            {{ username }}
          </template>
          <el-menu-item index="alterPassword" @click.native="isShowDialog">
            {{$t('home.alterPassword')}}</el-menu-item>
          <el-menu-item index="logout" @click.native="logout">{{$t('home.Logout')}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog
            :visible.sync="isShow"
            width="28%"
            :close-on-click-modal="false"
            :destroy-on-close="true"
            center
            :show-close="false"
            :title="$t('home.alterPassword')"
    >
      <el-form
              ref="form"
              :model="form"
              label-width="150px"
              :rules="rules"
              center
      >
        <el-form-item  :label="$t('home.currentPassword')" maxlength="128" required prop="platfromPasswordOld">
          <el-input size="mini" type="password" v-model="form.platfromPasswordOld"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('home.newPassword')" maxlength="128" required prop="platformPassword">
          <el-input size="mini" type="password" v-model="form.platformPassword"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('home.confirmPassword')" maxlength="128" required prop="platformPasswordN">
          <el-input size="mini" type="password"  v-model="form.platformPasswordN"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('home.confirm')}}</el-button>
        <el-button @click="cancel"><i class="el-icon-close"></i>{{$t('home.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { eventBus } from "scripts/utils/BUS";
import urls from "@/scripts/api"
const { log } = console;
import url from "api";
import * as types from "scripts/store/mutation-types";
import operation from "@/component/operation.vue";
import Vue from "vue";
export default {
  data() {
    const passwordNew = (rule, value, callback) => {
      if (this.form.platformPassword && this.form.platformPassword != this.form.platformPasswordN) {
        callback(new Error(this.$t('home.samePassword')))
      } else {
        callback()
      }
    }
    return {
      roleName:null,
      eventBus:'password_eventBus',
      user_updatePassword:urls.user_updatePassword,
      home_url:"/home",
      activeName: "platform",
      tabBarList: [
        {
          label:this.$t('home.platform'),
          name: "platform",
          navList: [
            { name: this.$t('home.Home'), url: "/home" }
          ]
        },
        {
          label: this.$t('home.seller'),
          name: "seller",
          navList: [
            { name: this.$t('home.sellerList'), url: "/shopList" },
            { name: this.$t('home.shopList'), url: "/storeBar" },
            { name: this.$t('home.list'), url: "/storreview" },
            { name: this.$t('home.spuList'), url: "/goodsList" },
          ]
        },
        {
          label: this.$t('home.order'),
          name: "orders",
          navList: [
            { name: this.$t('home.order'), url: "/order" },
            { name: this.$t('home.orderDetail'),url: "/orderDetail" }
          ]
        },
        {
          label: this.$t('home.review'),
          name: "review",
          navList: [
            { name: this.$t('home.review'), url: "/review" },
          ]
        },
        {
          label: this.$t('home.advertise'),
          name: "ads",
          navList: [
            { name: this.$t('home.Article'), url: "/ads/article" },
            { name: this.$t('home.Announcement'), url: "/ads/news" },
            { name: this.$t('home.roll'), url: "/ads/banner" },
            { name: this.$t('home.Menu'), url: "/ads/rollMenu" },
            { name: this.$t('home.RecommendShop'), url: "/ads/shop" },
            { name: this.$t('home.RecommendSpu'), url: "/ads/spu" },

          ]
        },
        {
          label: this.$t('home.withdraw'),
          name: "withdraw",
          navList: [
            { name: this.$t('home.sellerWithdraw'), url: "/withdraw/seller" },
            // { name: "会员提现", url: "/withdraw/buyer" }
          ]
        },
        {
          label: this.$t('home.finance'),
          name: "finance",
          navList: [
            { name: this.$t('home.platformClear'), url: "/finance/platform" },
            { name: this.$t('home.legalTender'), url: "/finance/legalTender" },
            { name: this.$t('home.companyAccount'), url: "/finance/companyAccount" },
            // { name: this.$t('home.invoice'), url: "/finance/invoice" }
          ]
        },
        {
          label: this.$t('home.sys_user'),
          name: "user",
          navList: [
            { name: this.$t('home.sys_buyer'), url: "/user/buyer" },
            { name: this.$t('home.sys_employee'), url: "/user/employee" },
            { name: this.$t('home.sys_seller'), url: "/user/seller" }
          ]
        },
        {
          label: this.$t('home.data'),
          name: "data",
          navList: [
            { name: this.$t('home.data_common'), url: "/data/commonBar" },
            { name: this.$t('home.data_spu'), url: "/data/shopBar" },
            { name: this.$t('home.data_sellerBar'), url: "/data/sellerBar" },
            { name: this.$t('home.data_platform'), url: "/data/platform" },
            { name: this.$t('home.data_financeBar'), url: "/data/financeBar" },
          ]
        },
        {
          label: this.$t('home.afterSales'),
          name: "afterSales",
          navList: [
            { name: this.$t('home.refund'), url: "/afterSale/refund" },
            { name: this.$t('home.refundRecord'), url: "/afterSale/refundRecord" }
          ]
        },
        {
          label: this.$t('home.Promote'),
          name: "promotion",
          navList: [
            { name: this.$t('home.users'), url: "/promotion/trees" },
            { name: this.$t('home.settings'), url: "/promotion/setting" },
            { name: this.$t('home.information'), url: "/promotion/download" }
          ]
        },
        {
          label: "Developers",
          name: "developer",
          navList: [
            { name: "OSS", url: "/Developer/OSS" },
            { name: "SMS", url: "/Developer/SMSservice" },
            // { name: "支付服务", url: "/Developer/Paymentservice" }
            { name: "Third-App", url: "/Developer/Application" },
            { name: "App Theme", url: "/Developer/ThemeColors" },
            { name: "App Icon", url: "/Developer/Icon" },
          ]
        }
      ],
      storTabBarList:null,
      isShow:false,
      form:{},
      rules: {
        platfromPasswordOld: [
          {required: true, message: this.$t('home.ordPassword')},
          {required: true, message: this.$t('home.sixPassword'), trigger: "blur",min: 6},
        ],
        platformPassword: [
          {required: true, message: this.$t('home.newPassword_')},
          {required: true, message: this.$t('home.sixPassword_'), trigger: "blur",min: 6}
        ],
        platformPasswordN: [
          {required: true, message: this.$t('home.cPassword')},
          {required: true, message: this.$t('home.cPasswordSix'), trigger: "blur",min: 6,},
          {required: true, message: this.$t('home.samePassword'), trigger: "blur",validator:passwordNew}
        ],
      },

      roleNames:[
          {
            value: 1,
            label: this.$t('home.Super_admin')
          },
          {
            value: 2,
            label: this.$t('home.Manager')
          },
          {
            value: 3,
            label: this.$t('home.Auditor')
          },
          {
            value: 4,
            label: this.$t('home.Server')
          },
          {
            value: 5,
            label: this.$t('home.Finance')
          },
          {
            value: 6,
            label: this.$t('home.Comment_manager')
          },
        {
          value: 7,
          label: "Developers"
        }
      ],
      index:0,
      title:"",
      onlang: window.localStorage.getItem("platform_Internation")==null?"中":window.localStorage.getItem("platform_Internation_name"),
      lang: [
        { id: "cn", name: "简体中文", key: "中", title: "平台管理中心" },
        { id: "en", name: "English", key: "EN", title: "Platform Management Center" }
      ]
    };
  },

  components: {
    operation
  },

  computed: {
    ...mapGetters([
      'username'
    ])
  },

  mounted() {
    let cc = this.$t('home.Alter_Success');
    eventBus.$on(this.eventBus, (tableData) => {
      this.$alert(cc, '', {
        confirmButtonText: this.$t('home.confirm'),
        callback: () => {
          this.isShow = false;
          this.logout();
        }
      });
    });
    this.load();
    let self = this;
    document.title = this.$t("common.document_title");
  },

  methods: {

    load() {
      let self = this;
      this.$axios.get(url.navbar_url).then(res => {
        let data = res.data.data;
        self.$store.commit(types.USERNAME, data.username);
        self.$store.commit(types.INVITE, data.inviteNum);
        self.$store.commit(types.NAV, data.platformRole);
        Vue.prototype.$platformRole = data.platformRole;
        this.roleName = this.roleNames[data.platformRole-1].label;
        this.initTabBarList_();
      });
    },

    cancel() {
      this.form = {};
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
      })
      this.isShowDialog();
    },

    //Add with the editor go this method
    confirmData() {
      let aa = this.$t('home.ConfirmPassword');
      let bb = this.$t('home.samePassword');
      if (this.isEdit && this.form.platformPassword.trim()!=''){
        if (!this.form.platformPasswordN){
          this.$alert(aa, '', {
            confirmButtonText: this.$t('home.confirm')
          });
          return;
        }
        if (this.form.platformPasswordN !== this.form.platformPassword){
          this.$alert(bb, '', {
            confirmButtonText: this.$t('home.confirm')
          });
          return;
        }
      }
      let text = this.$t('home.alter_Success');
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.operation.$confirmData(this.user_updatePassword, this.form, text, this.eventBus);
        } else {
          return false;
        }
      });
    },

    isShowDialog() {
      this.isShow = this.isShow !== true;
    },

    handleClick(tab) {
      eventBus.$emit("navList", this.tabBarList[tab.index].navList);
    },

    locale(item) {
      this.$i18n.locale = item.id;
      if((window.localStorage.getItem("platform_Internation") == item.id)){
        return ;
      }
      document.title = item.title;
      this.onlang = item.key;
      window.localStorage.setItem("platform_Internation",item.id);
      window.localStorage.setItem("platform_Internation_name",item.key);
      location.reload();
    },

    logout() {
      this.tabBarList = this.storTabBarList;
      let self = this;
      let data = "access_token=" + self.$store.getters.token;
      let param = {
        grant_type: "password",
        client_id: "platform",
        client_secret: "platform",
        scope: "xx"
      };
      localStorage.removeItem("login_info");
      self.$store.commit(types.LOGOUT);
      self.$router.push("/login");
      this.$axios
        .delete(url.login, {
          params: param,
          data: data,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(function(res) {
          log(res);
        })
        .catch(error => {
          log(error.response.data);
        });
    },

    initTabBarList_(){
      const tabBarList2 = [
        {
          label:this.$t('home.platform'),
          name: "platform",
          navList: [
            { name: this.$t('home.Home'), url: "/home" }
          ]
        },
        {
          label: this.$t('home.seller'),
          name: "seller",
          navList: [
            { name: this.$t('home.sellerList'), url: "/shopList" },
            { name: this.$t('home.shopList'), url: "/storeBar" },
            { name: this.$t('home.list'), url: "/storreview" },
            { name: this.$t('home.spuList'), url: "/goodsList" },
          ]
        },
        {
          label: this.$t('home.order'),
          name: "orders",
          navList: [
            { name: this.$t('home.order'), url: "/order" },
            { name: this.$t('home.orderDetail'),url: "/orderDetail" }
          ]
        },
        {
          label: this.$t('home.review'),
          name: "review",
          navList: [
            { name: this.$t('home.review'), url: "/review" },
          ]
        },
        {
          label: this.$t('home.advertise'),
          name: "ads",
          navList: [
            { name: this.$t('home.Article'), url: "/ads/article" },
            { name: this.$t('home.Announcement'), url: "/ads/news" },
            { name: this.$t('home.roll'), url: "/ads/banner" },
            { name: this.$t('home.RecommendShop'), url: "/ads/shop" },
            { name: this.$t('home.RecommendSpu'), url: "/ads/spu" },
            { name: this.$t('home.Menu'), url: "/ads/rollMenu" },
          ]
        },
        // {
        //   label: "报表",
        //   name: "report",
        //   navList: [
        //     { name: "店铺销量统计", url: "/report/sum" },
        //     { name: "买家报表", url: "/report/buyer" },
        //     { name: "卖家报表", url: "/report/seller" },
        //     { name: "店铺销量排名", url: "/report/ranking" }
        //   ]
        // },
        {
          label: this.$t('home.withdraw'),
          name: "withdraw",
          navList: [
            { name: this.$t('home.sellerWithdraw'), url: "/withdraw/seller" },
            // { name: "会员提现", url: "/withdraw/buyer" }
          ]
        },
        {
          label: this.$t('home.finance'),
          name: "finance",
          navList: [
            { name: this.$t('home.platformClear'), url: "/finance/platform" },
            { name: this.$t('home.legalTender'), url: "/finance/legalTender" },
            { name: this.$t('home.companyAccount'), url: "/finance/companyAccount" },
            // { name: this.$t('home.invoice'), url: "/finance/invoice" }
          ]
        },
        {
          label: this.$t('home.sys_user'),
          name: "user",
          navList: [
            { name: this.$t('home.sys_buyer'), url: "/user/buyer" },
            { name: this.$t('home.sys_employee'), url: "/user/employee" },
            { name: this.$t('home.sys_seller'), url: "/user/seller" }
          ]
        },
        {
          label: this.$t('home.data'),
          name: "data",
          navList: [
            { name: this.$t('home.data_common'), url: "/data/commonBar" },
            { name: this.$t('home.data_spu'), url: "/data/shopBar" },
            { name: this.$t('home.data_sellerBar'), url: "/data/sellerBar" },
            { name: this.$t('home.data_platform'), url: "/data/platform" },
            { name: this.$t('home.data_financeBar'), url: "/data/financeBar" },
          ]
        },

        // {
        //   label: "开发者",
        //   name: "developer",
        //   navList: [
        //     { name: "OSS", url: "/Developer/OSS" },
        //     { name: "短信服务", url: "/Developer/SMSservice" },
        //     { name: "支付服务", url: "/Developer/Paymentservice" }
        //
        //   ]
        // },

        {
          label: this.$t('home.afterSales'),
          name: "afterSales",
          navList: [
            { name: this.$t('home.refund'), url: "/afterSale/refund" },
            { name: this.$t('home.refundRecord'), url: "/afterSale/refundRecord" }
          ]
        }
      ];
      const tabBarList3 = [
        {
          label:this.$t('home.platform'),
          name: "platform",
          navList: [
            { name: this.$t('home.Home'), url: "/home" }
          ]
        },
        {
          label: this.$t('home.seller'),
          name: "seller",
          navList: [
            { name: this.$t('home.sellerList'), url: "/shopList" },
            { name: this.$t('home.shopList'), url: "/storeBar" },
            { name: this.$t('home.list'), url: "/storreview" },
            { name: this.$t('home.spuList'), url: "/goodsList" },
          ]
        }
      ];
      const tabBarList5 = [
        {
          label:this.$t('home.platform'),
          name: "platform",
          navList: [
            { name: this.$t('home.Home'), url: "/home" }
          ]
        },
        {
          label: this.$t('home.order'),
          name: "orders",
          navList: [
            { name: this.$t('home.order'), url: "/order" },
            { name: this.$t('home.orderDetail'),url: "/orderDetail" }
          ]
        },
        // {
        //   label: "报表",
        //   name: "report",
        //   navList: [
        //     { name: "店铺销量统计", url: "/report/sum" },
        //     { name: "买家报表", url: "/report/buyer" },
        //     { name: "卖家报表", url: "/report/seller" },
        //     { name: "店铺销量排名", url: "/report/ranking" }
        //   ]
        // },
        {
          label: this.$t('home.withdraw'),
          name: "withdraw",
          navList: [
            { name: this.$t('home.sellerWithdraw'), url: "/withdraw/seller" },
            // { name: "会员提现", url: "/withdraw/buyer" }
          ]
        },
        {
          label: this.$t('home.finance'),
          name: "finance",
          navList: [
            { name: this.$t('home.platformClear'), url: "/finance/platform" },
            { name: this.$t('home.legalTender'), url: "/finance/legalTender" },
            { name: this.$t('home.companyAccount'), url: "/finance/companyAccount" },
            // { name: "发票", url: "/finance/invoice" }
          ]
        },
      ];
      const tabBarList4 = [
        {
          label:this.$t('home.platform'),
          name: "platform",
          navList: [
            { name: this.$t('home.Home'), url: "/home" }
          ]
        },
        {
              label: this.$t('home.order'),
              name: "orders",
              navList: [
        { name: this.$t('home.order'), url: "/order" },
        { name: this.$t('home.orderDetail'),url: "/orderDetail" }
          ]
        },
        {
          label: this.$t('home.afterSales'),
          name: "afterSales",
          navList: [
            { name: this.$t('home.refund'), url: "/afterSale/refund" },
            { name: this.$t('home.refundRecord'), url: "/afterSale/refundRecord" }
          ]
        }
      ];
      const tabBarList6 = [
        {
          label:this.$t('home.platform'),
          name: "platform",
          navList: [
            { name: this.$t('home.Home'), url: "/home" }
          ]
        },
        {
              label: this.$t('home.review'),
              name: "review",
              navList: [
        { name: this.$t('home.review'), url: "/review" },
          ]
        }
      ];
      const tabBarList7 = [
        {
          label:this.$t('home.platform'),
          name: "platform",
          navList: [
            { name: this.$t('home.Home'), url: "/home" }
          ]
        },
        {
          label: "Developers",
          name: "developer",
          navList: [
            { name: "OSS", url: "/Developer/OSS" },
            { name: "SMS", url: "/Developer/SMSservice" },
            // { name: "支付服务", url: "/Developer/Paymentservice" }
            { name: "Third-App", url: "/Developer/Application" },
            { name: "App Theme", url: "/Developer/ThemeColors" },
            { name: "App Icon", url: "/Developer/Icon" },
          ]
        },
      ];
      if (this.$platformRole==2){
        this.tabBarList = tabBarList2;
      }
      if (this.$platformRole==3){
        this.tabBarList = tabBarList3;
      }
      if (this.$platformRole==4){
        this.tabBarList = tabBarList4;
      }
      if (this.$platformRole==5){
        this.tabBarList = tabBarList5;
      }
      if (this.$platformRole==6){
        this.tabBarList = tabBarList6;
      }
      if (this.$platformRole==7){
        this.tabBarList = tabBarList7;
      }
      eventBus.$emit("navList", this.tabBarList[0].navList);
    }
  }
};
</script>
<style lang="scss">
.topbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(216, 216, 216);
  .el-menu {
    background-color: rgb(0, 0, 0, 0);
    border: 0;
  }
}

.el-menu--popup {
  min-width: 80px !important;
  width: 80px !important;
  .el-menu-item {
    min-width: 80px !important;
    width: 80px !important;
  }
}
.erp{
  font-size: 30px;
  color: aliceblue;
  margin-top: 15px;
}
</style>
