import Vue from "vue";
import VueRouter from "vue-router";
import { eventBus } from "scripts/utils/BUS";
/*Vue.use(VueRouter);*/
if (!window.VueRouter) Vue.use(VueRouter);


const routes = [
  { path: "/login", component: () => import("views/login") },
  {
    path: "/h5",
    name: "h5",
    component: () => import("views/h5"),
    meta: { title: "h5" }
  },
  {
    path: "",
    name: "index",
    redirect: "/home",
    component: () => import("views/layout"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("views/home"),
        meta: { title: "首页" }
      },
      {
        path: "/shopList",
        name: "shopList",
        component: () => import("views/shop/shopList"),
        meta: { title: "商家列表" }
      },
      {
        path: "/storeBar",
        name: "storeBar",
        component: () => import("views/shop/storeBar"),
        meta: { title: "店铺列表" }
      },
      {
        path: "/storeType",
        name: "storeType",
        component: () => import("views/shop/storeType"),
        meta: { title: "店铺分类" }
      },
      {
        path: "/businessLicense",
        name: "businessLicense",
        component: () => import("views/shop/businessLicense"),
        meta: { title: "经营许可证" }
      },
      {
        path: "/storreview",
        name: "storreview",
        component: () => import("views/storreview"),
        meta: { title: "门店列表" }
      },
      {
        path: "/goodsList",
        name: "goodsList",
        component: () => import("views/shop/goodsList"),
        meta: { title: "商品列表" }
      },
      //order
      {
        path: "/order",
        name: "order",
        component: () => import("views/order"),
        meta: { title: "订单" }
      },
      {
        path: "/orderDetail",
        name: "orderDetail",
        component: () => import("views/order/orderDetail"),
        meta: { title: "订单明细" }
      },
      //review
      {
        path: "/review",
        name: "review",
        component: () => import("views/review"),
        meta: { title: "评论" }
      },
      //ads
      {
        path: "/ads/news",
        name: "news",
        component: () => import("views/ads/news"),
        meta: { title: "公告" }
      },
      {
        path: "/ads/banner",
        name: "banner",
        component: () => import("views/ads/banner"),
        meta: { title: "轮动广告" }
      },
      {
        path: "/ads/rollMenu",
        name: "refundRecord",
        component: () => import("views/ads/rollMenu"),
        meta: { title: "轮动菜单" }
      },
      {
        path: "/ads/shop",
        name: "shop",
        component: () => import("views/ads/shop"),
        meta: { title: "推荐店铺" }
      },
      {
        path: "/ads/spu",
        name: "spu",
        component: () => import("views/ads/spu"),
        meta: { title: "推荐商品" }
      },
      //report
      {
        path: "/report/sum",
        name: "sum",
        component: () => import("views/report/sum"),
        meta: { title: "店铺销量统计" }
      },
      {
        path: "/report/buyer",
        name: "buyer",
        component: () => import("views/report/buyer"),
        meta: { title: "买家报表" }
      },
      {
        path: "/report/seller",
        name: "seller",
        component: () => import("views/report/seller"),
        meta: { title: "卖家报表" }
      },
      {
        path: "/report/ranking",
        name: "ranking",
        component: () => import("views/report/ranking"),
        meta: { title: "店铺销量排名" }
      },
      //withdraw
      {
        path: "/withdraw/seller",
        name: "seller",
        component: () => import("views/withdraw/seller"),
        meta: { title: "商家提现" }
      },
      {
        path: "/withdraw/buyer",
        name: "buyer",
        component: () => import("views/withdraw/buyer"),
        meta: { title: "会员提现" }
      },
      //finance
      {
        path: "/finance/platform",
        name: "platform",
        component: () => import("views/finance/platform"),
        meta: { title: "平台结算" }
      },
      {
        path: "/finance/legalTender",
        name: "legalTender",
        component: () => import("views/finance/legalTender"),
        meta: { title: "法币记录" }
      },
      {
        path: "/finance/companyAccount",
        name: "companyAccount",
        component: () => import("views/finance/companyAccount"),
        meta: { title: "公司账户" }
      },
      // {
      //   path: "/finance/invoice",
      //   name: "invoice",
      //   component: () => import("views/finance/invoice"),
      //   meta: { title: "发票" }
      // },
      //user
      {
        path: "/user/buyer",
        name: "buyer",
        component: () => import("views/user/buyer"),
        meta: { title: "会员管理" }
      },
      {
        path: "/user/employee",
        name: "employee",
        component: () => import("views/user/employee"),
        meta: { title: "员工管理" }
      },
      {
        path: "/user/seller",
        name: "seller",
        component: () => import("views/user/seller"),
        meta: { title: "商家管理" }
      },
      //data
      {
        path: "/data/commonBar",
        name: "commonBar",
        component: () => import("views/data/commonBar"),
        meta: { title: "通用" }
      },
      {
        path: "/data/shopBar",
        name: "shopBar",
        component: () => import("views/data/shopBar"),
        meta: { title: "商品" }
      },
      {
        path: "/data/sellerBar",
        name: "sellerBar",
        component: () => import("views/data/sellerBar"),
        meta: { title: "商家" }
      },
      {
        path: "/data/platform",
        name: "platform",
        component: () => import("views/data/platform"),
        meta: { title: "平台" }
      },
      {
        path: "/data/financeBar",
        name: "financeBar",
        component: () => import("views/data/financeBar"),
        meta: { title: "财务" }
      },


      {
        path: "/Developer/OSS",
        name: "OSS",
        component: () => import("views/Developer/OSS"),
        meta: { title: "OSS" }
      },
      {
        path: "/Developer/SMSservice",
        name: "SMSservice",
        component: () => import("views/Developer/SMSservice"),
        meta: { title: "短信服务" }
      },
      // {
      //   path: "/Developer/Paymentservice",
      //   name: "Paymentservice",
      //   component: () => import("views/Developer/Paymentservice"),
      //   meta: { title: "支付服务" }
      // },
      //afterSale
      {
        path: "/afterSale/refund",
        name: "refund",
        component: () => import("views/afterSale/refund"),
        meta: { title: "退款" }
      },
      {
        path: "/afterSale/refundRecord",
        name: "refundRecord",
        component: () => import("views/afterSale/refundRecord"),
        meta: { title: "退款记录" }
      },
      {
        path: "/Developer/Application",
        name: "refundRecord",
        component: () => import("views/Developer/Application"),
        meta: { title: "第三方应用" }
      },
      {
        path: "/Developer/ThemeColors",
        name: "refundRecord",
        component: () => import("views/Developer/ThemeColors"),
        meta: { title: "App主题" }
      },
      {
        path: "/Developer/Icon",
        name: "refundRecord",
        component: () => import("views/Developer/Icon"),
        meta: { title: "App Icon" }
      },
      {
        path: "/ads/article",
        name: "refundRecord",
        component: () => import("views/ads/article"),
        meta: { title: "文章" }
      },
      {
        path: "/promotion/trees",
        name: "trees",
        component: () => import("views/promotion/trees"),
        meta: { title: "推广用户" }
      },
      {
        path: "/promotion/setting",
        name: "setting",
        component: () => import("views/promotion/setting"),
        meta: { title: "推广设置" }
      },
      {
        path: "/promotion/download",
        name: "download",
        component: () => import("views/promotion/download"),
        meta: { title: "apk信息" }
      },
    ]
  }
];

const router = new VueRouter({
  routes
});

// eventBus.$emit("titleChange", page.name);


//路由守卫
router.beforeEach((to, from, next) => {
  let store = JSON.parse(window.sessionStorage.getItem("yl-platForm-sess-state"));
  if (store?.common?.token) {
    if (to.path === "/login") {
      next({ path: "/home" });
      eventBus.$emit("titleChange", "首页");
    } else {
      if (to.path != "/home") {
        let hasPath = store.common.nav.find(_item => {
          return  _item.url === to.path
        });
        if (hasPath) {
          next();
        } else {
          next({ path: "/home" });
        }
      } else {
        next();
      }
    }
  } else {
    if (to.path === "/login") {
      //loop
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

export default router;
