import * as types from "./mutation-types";
import getters from "./getters";
import actions from "./actions";

const roles = [
    {
        id: 1,
        name: "超级管理员",
        pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,27,28,29,30,31,32,33,34,35,36,37]
    },
    {id: 2, name: "管理员", pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
            12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 25, 26,27,31,32,33,34,35,36,37]},
    {id: 3, name: "审核员", pages: [0, 1, 2]},
    {id: 4, name: "客服", pages: [3, 4, 25, 26]},
    {id: 5, name: "财务", pages: [3, 4, 10, 11, 12, 13,27]},
    {id: 6, name: "评论监管员", pages: [5]},
    {id: 7, name: "开发者", pages: [22, 23, 24,28,29,30]},
];

const pages = [
    {id: 0, name: "商家列表", url: "/shopList"},
    {id: 1, name: "店铺列表", url: "/storeBar"},
    {id: 2, name: "商品列表", url: "/goodsList"},
    {id: 3, name: "订单", url: "/order"},
    {id: 4, name: "订单明细", url: "/orderDetail"},
    {id: 5, name: "评论", url: "/review"},
    {id: 6, name: "公告", url: "/ads/news"},
    {id: 7, name: "轮动广告", url: "/ads/banner"},
    {id: 8, name: "推荐店铺", url: "/ads/shop"},
    {id: 9, name: "推荐商品", url: "/ads/spu"},
    {id: 10, name: "商家提现", url: "/withdraw/seller"},
    {id: 11, name: "平台结算", url: "/finance/platform"},
    {id: 12, name: "法币记录", url: "/finance/legalTender"},
    {id: 13, name: "公司账户", url: "/finance/companyAccount"},
    {id: 14, name: "会员管理", url: "/user/buyer"},
    {id: 15, name: "员工管理", url: "/user/employee"},
    {id: 16, name: "商家管理", url: "/user/seller"},
    {id: 17, name: "通用", url: "/data/commonBar"},
    {id: 18, name: "商品", url: "/data/shopBar"},
    {id: 19, name: "商家", url: "/data/sellerBar"},
    {id: 20, name: "平台", url: "/data/platform"},
    {id: 21, name: "财务", url: "/data/financeBar"},
    {id: 22, name: "OSS", url: "/Developer/OSS"},
    {id: 23, name: "短信服务", url: "/Developer/SMSservice"},
    {id: 24, name: "支付服务", url: "/Developer/Paymentservice"},
    {id: 25, name: "售后申请", url: "/afterSale/refund"},
    {id: 26, name: "退款记录", url: "/afterSale/refundRecord"},
    {id: 27, name: "商家提现", url: "/withdraw/buyer"},
    {id: 28, name: "第三方应用", url: "/Developer/Application"},
    {id: 29, name: "App主题", url: "/Developer/ThemeColors"},
    {id: 30, name: "App Icon", url: "/Developer/Icon"},
    {id: 31, name: "文章", url: "/ads/article"},
    {id: 32, name: "轮动菜单", url: "/ads/rollMenu"},
    {id: 33, name: "推广用户", url: "/promotion/trees"},
    {id: 34, name: "推广设置", url: "/promotion/setting"},
    {id: 35, name: "apk信息", url: "/promotion/download"},
    {id: 36, name: "h5", url: "/h5"},
    {id: 37, name: "门店列表", url: "/storreview"},
];

const state = {
    $vm:{},
    isLoading: false,
    age: 10,
    token: "",
    inviteNo: 0,
    username: "",
    languageCode: 20,
    areaCode: 0,
    nav: [],
    roles: roles,
    role: {},
    title: "首页"
};

const stateProto = {};
Object.assign(stateProto, state);

const mutations = {
    [types.RESTORE_STATE](state, savedState) {
        Object.assign(state, savedState.common);
    },
    [types.NAV](state, status) {
        let t_page = [];
        for (let item of roles) {
            if (item.id === status) {
                t_page = item.pages;
                state.role = item;
            }
        }
        let list = [];
        for (let i of t_page) {
            list.push(pages[i]);
        }
        state.nav = list;
    },
    [types.UPDATE_LOADING](state, status) {
        state.isLoading = status;
    },
    [types.AGE](state, status) {
        state.age = status;
    },
    [types.TITLE](state, status) {
        state.title = status;
    },
    [types.TOKEN](state, status) {
        state.token = status;
    },
    [types.INVITE](state, status) {
        state.inviteNo = status;
    },
    [types.USERNAME](state, status) {
        state.username = status;
    },
    [types.LANGUAGE](state, status) {
        state.languageCode = status;
    },
    [types.AREA](state, status) {
        state.areaCode = status;
    },
    [types.VUE](state, status) {
        state.$vm = status;
    },
    [types.LOGOUT](state) {
        Object.assign(state, stateProto);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
