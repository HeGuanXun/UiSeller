import Vue from "vue";

// Vue.prototype.$type_options = [
//     {value: 1, label: '单个商品，跳转到商品详情'},
//     {value: 2, label: '多个商品，进入商品列表'},
//     {value: 3, label: '单个店铺 '},
//     {value: 4, label: '内部url，如文章，海报'},
//     {value: 5, label: 'URL，外部浏览器 '},
//     {value: 6, label: '唤醒APP'}
// ]

Vue.prototype.$successAddText = "新增成功!";
Vue.prototype.$successEditText = "编辑成功！";
Vue.prototype.$approve_option_text = "请选择审核状态";
Vue.prototype.$approve_reason_text = "审核原因不能为空";
Vue.prototype.$approve_success_text = "审核成功";
Vue.prototype.$confirmButtonText = "确定";
Vue.prototype.$ROLE = [
    {
        value: 1,
        label: "超级管理员"
    },
    {
        value: 2,
        label: "管理员"
    },
    {
        value: 3,
        label: "审核员"
    },
    {
        value: 4,
        label: "客服"
    },
    {
        value: 5,
        label: "财务"
    },
    {
        value: 6,
        label: "评论管理员"
    },
    {
        value: 7,
        label: "开发者"
    }
];
Vue.prototype.$platform_user_status = [
    {
        value: 1,
        label: "激活"
    },
    {
        value: 1,
        label: "禁用"
    }
];
Vue.prototype.$platform_SellerSpu_status = [
    {
        value: 0,
        label: "未申请"
    },
    {
        value: 1,
        label: "待审核"
    },
    {
        value: 2,
        label: "上架"
    },
    {
        value: 3,
        label: "已拒绝"
    },
    {
        value: 4,
        label: "下架"
    }
];
Vue.prototype.$platform_legalTender_status = [
    {label: '交易中', value: 1},
    {label: '成功', value: 2},
    {label: '失败', value: 3}
];
Vue.prototype.$platform_legalTender_reason = [
    {label: '充值', value: 1},
    {label: '提现', value: 2},
];
Vue.prototype.$platform_legalTender_txnInOrOut = [
    {label: '收入', value: 1},
    {label: '支出', value: 2},
];
Vue.prototype.$platform_rule_type = [
    {label: '商品订单', value: 1},
    {label: '平台订单', value: 2},
];
Vue.prototype.$platform_legalTender_object_status = [
    {label: '商家', value: 1}, {label: '会员', value: 2}, {label: '其他', value: 3}
];
Vue.prototype.$platform_status = [
    {
        value: 0,
        label: "待审核"
    },
    {
        value: 1,
        label: "通过"
    },
    {
        value: -1,
        label: "已拒绝"
    }
];
Vue.prototype.$platform_status_vo = [
    {
        value: -1,
        label: "已拒绝"
    },
    {
        value: 0,
        label: "待审核"
    },
    {
        value: 1,
        label: "通过"
    },
];
Vue.prototype.$platform_orderStatus = [
    {
        value: 1,
        label: "未付款"
    },
    {
        value: 2,
        label: "已付款"
    },
    {
        value: 3,
        label: "已取消"
    }
];
Vue.prototype.$platform_approve_status = [
    {
        value: 1,
        label: "审核通过"
    },
    {
        value: -1,
        label: "已拒绝"
    }
];
Vue.prototype.$platform_approve_status_cashOutStatus = [
    {
        value: 1,
        label: "通过"
    },
    {
        value: -1,
        label: "已拒绝"
    }
];
Vue.prototype.$platform_approve_status_cashOutStatus_ = [
    {
        value: 2,
        label: "审核通过"
    },
    {
        value: 3,
        label: "已拒绝"
    }
];
Vue.prototype.$platform_sellerType = [
    {
        value: 1,
        label: "个人"
    },
    {
        value: 2,
        label: "企业"
    }
];
Vue.prototype.$platform_orderDetailStatus = [
    {
        value: 0,
        label: "取消"
    },
    {
        value: 1,
        label: "待付款"
    },
    {
        value: 2,
        label: "待发货"
    },
    {
        value: 3,
        label: "待收货"
    },
    {
        value: 4,
        label: "待评价"
    },
    {
        value: 5,
        label: "售后"
    }
];
Vue.prototype.$platform_brandStatus = [
    {
        value: 1,
        label: "显示"
    },
    {
        value: 2,
        label: "不显示"
    }
];
Vue.prototype.$platform_categoryStatus = [
    {
        value: 1,
        label: "显示"
    },
    {
        value: 2,
        label: "不显示"
    }
];
Vue.prototype.$platform_order_afterSalesType = [
    {
        value: 1,
        label: "退款"
    },
    {
        value: 2,
        label: "换货"
    },
    {
        value: 3,
        label: "保修"
    },
    {
        value: 4,
        label: "退货"
    }
];
Vue.prototype.$platform_finace_orderDetailStatus = [
    {label: '未结算', value: 1},
    {label: '已结算', value: 2}
];
Vue.prototype.$platform_refundMethod = [
    {label: '原路退回', value: 1},
    {label: '其它途径', value: 2}
];
Vue.prototype.$platform_payType = [
    {label: '在线支付', value: 1},
    {label: '货到付款', value: 2}
];
Vue.prototype.$platform_refundStatus = [
    {label: '退款中', value: 0},
    {label: '成功', value: 1},
    {label: '失败', value: 2}
];
Vue.prototype.$platform_orefundStatus = [
    {label: '待审核', value: 1},
    {label: '同意', value: 2},
    {label: '拒绝', value: 3},
    {label: '申诉', value: 4},
    {label: '完成', value: 5}
];
Vue.prototype.$platform_orderDetailStatus_deliverMethod = [
    {label: '取消', value: 1},
    {label: '待付款', value: 2},
    {label: '待发货', value: 3},
    {label: '待收货', value: 4},
    {label: '待评价', value: 5},
    {label: '售后', value: 6}
];
Vue.prototype.$platform_orders = [
    {
        value: 1,
        label: "商品订单"
    },
    {
        value: 2,
        label: "平台订单"
    }
];
Vue.prototype.$platform_orderDetailStatus_object = [
    {label: '平台', value: 1},
    {label: '物流', value: 2},
    {label: '买家', value: 3},
    {label: '卖家', value: 4}
];
Vue.prototype.$platform_orderDetailStatus_ = [
    {label: '取消', value: 1},
    {label: '待付款', value: 2},
    {label: '待发货', value: 3},
    {label: '待收货', value: 4},
    {label: '待评价', value: 5},
    {label: '售后', value: 6}
]
Vue.prototype.$platform_pickerOptions = {
    shortcuts: [
        {
            text: "最近一周",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
            }
        },
        {
            text: "最近一个月",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
            }
        },
        {
            text: "最近三个月",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
            }
        }
    ]
};
export const AREA = [
    {
        value: -1,
        label: "全部"
    },
    {
        value: 1,
        label: "国内"
    },
    {
        value: 2,
        label: "国际"
    }
];
export const EXPRESS = [
    {
        value: -1,
        label: "全部"
    },
    {
        value: 1,
        label: "快递"
    },
    {
        value: 2,
        label: "自提"
    }
];
Vue.prototype.$SPU = [
    {
        value: 1,
        label: "预售"
    },
    {
        value: 2,
        label: "现货"
    },
    {
        value: 3,
        label: "只读"
    }
];
export const TAG = [
    {
        value: -1,
        label: "全部"
    },
    {
        value: 1,
        label: "退货"
    },
    {
        value: 2,
        label: "商品服务"
    },
    {
        value: 3,
        label: "退货"
    },
    {
        value: 4,
        label: "是否包邮"
    }
];
Vue.prototype.$PAY_WAY = [
    {
        value: 1,
        label: "微信"
    },
    {
        value: 2,
        label: "支付宝"
    },
    {
        value: 3,
        label: "银联"
    },
    {
        value: 4,
        label: "电子货币"
    }
];
export const APPROVE_STATUS = [
    {
        value: 1,
        label: "审核通过"
    },
    {
        value: 2,
        label: "已拒绝"
    }
];
