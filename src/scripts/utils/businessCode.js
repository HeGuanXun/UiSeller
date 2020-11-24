let code={
    code:{
        1001:{
            ch:'系统错误',
            en:'system error'
        },
        1002:{
            ch:'需要登录',
            en:'need login'
        },
        1003:{
            ch:'非法参数',
            en:'illegal argument'
        },
        1004:{
            ch:'电子邮件或电话或用户名存在',
            en:'email or phone or username exist'
        },
        1005:{
            ch:'用户名不存在',
            en:'username does not exist'
        },
        1006:{
            ch:'注销失败',
            en:'logout fail'
        },
        1007:{
            ch:'未知令牌',
            en:'unknown token'
        },
        1008:{
            ch:'企业已存在',
            en:'businessNo exist'
        },
        1009:{
            ch:'id不存在',
            en:'id is not exist'
        },
        1010:{
            ch:'时间格式错误',
            en:'time is format error'
        },
        1011:{
            ch:'数据库中不存在邀请码',
            en:'inviteNum not exist in database'
        },
        1012:{
            ch:'重复操作',
            en:'repetitive operation'
        },
        1013:{
            ch:'原始密码错误',
            en:'original password error'
        },

        1014:{
            ch:'已被拒绝',
            en:'someone is rejected'
        },
        1015:{
            ch:'验证码已过期',
            en:'verifyCode is expired'
        },
        1016:{
            ch:'数据库中不存在区域编码',
            en:'area code not exist in database'
        },
        1017:{
            ch:'数据库中不存在语言编码',
            en:'languageCode not exist in database'
        },
        1018:{
            ch:'数据库中不存在钱包',
            en:'wallet not exist in database'
        },

        1024:{
            ch:'钱包金额不够',
            en:'walletAmount is not enough'
        },
        1025:{
            ch:'数据库中不存在规则ID',
            en:'ruleId not exist in database'
        },
        1026:{
            ch:'支付系统暂未开放',
            en:'pay failed'
        },
        1027:{
            ch:'该商品分类的上级分类code不存在',
            en:'parentCategoryCode not exist in database'
        },
        1028: {
            ch: '该广告类型不存在',
            en: 'adsTypeCode not exist in database'
        },
        1029: {
            ch: '商品不是“待审核”状态，无法进行此操作',
            en: '"the product is not in “to be approved” status, so this operation cannot be performed'
        },
        1030: {
            ch: '商品信息尚未提交审核，无法进行此操作',
            en: 'the product information has not been submitted for approval. This operation cannot be performed'
        },
        1031: {
            ch: '商品待审核中，无法进行此操作',
            en: 'this operation cannot be performed while the product is pending approval'
        },
        1032: {
            ch: '商品审核不通过，无法进行此操作',
            en: 'this operation cannot be performed because the product is not approved'
        },
        1033: {
            ch: '商品已下架，请勿重复操作',
            en: 'the product has been removed from the shelves, please do not repeat the operation'
        },
        1034: {
            ch: '当前为默认状态，默认不允许修改',
            en: 'Currently the default state, no modification is allowed'
        },
        4003: {
            ch: '无效的categoryCode,必须大于0',
            en: 'invalid categoryCode,must >0'
        },




        2001:{
            ch:'电子邮件为空',
            en:'email null'
        },
        2002:{
            ch:'电话号码为空',
            en:'phone null'
        },
        2003:{
            ch:'用户名为空',
            en:'username null'
        },
        2004:{
            ch:'更新为空',
            en:'updateBy null'
        },
        2005:{
            ch:'新建为空',
            en:'createBy null'
        },
        2006:{
            ch:'公司名称为空',
            en:'companyName null'
        },
        2007:{
            ch:'请上传营业执照',
            en:'businessUrl null'
        },
        2008:{
            ch:'业务为空',
            en:'businessNo null'
        },
        2009:{
            ch:'邀请码为空',
            en:'inviteNo null'
        },
        2010:{
            ch:'id为空',
            en:'id null'
        },
        2011:{
            ch:'审核原因为空',
            en:'audit reason null'
        },
        2012:{
            ch:'审核状态为空',
            en:'status null'
        },
        2013:{
            ch:'昵称为空',
            en:'nickname null'
        },
        2014:{
            ch:'性别为空',
            en:'gender null'
        },
        2015:{
            ch:'密码为空',
            en:'password null'
        },
        2016:{
            ch:'角色为空',
            en:'role null'
        },
        2017:{
            ch:'备注为空',
            en:'remark null'
        },
        2018:{
            ch:'密码为空',
            en:'password null'
        },
        2019:{
            ch:'姓名为空',
            en:'realname null'
        },
        2020:{
            ch:'商家类型为空',
            en:'sellerType null'
        },
        2021:{
            ch:'联系人姓名为空',
            en:'sellerContactPerson null'
        },
        2022:{
            ch:'联系地址为空',
            en:'sellerContactAddress null'
        },
        2023:{
            ch:'身份证正面为空',
            en:'sellerIdentityFrontUrl null'
        },
        2024:{
            ch:'身份证反面为空',
            en:'sellerIdentityBackUrl null'
        },
        2025:{
            ch:'企业名称为空',
            en:'sellerCompanyName null'
        },
        2026:{
            ch:'企业账号为空',
            en:'sellerCompanyIdentity null'
        },
        2027:{
            ch:'企业地址为空',
            en:'sellerCompanyAddress null'
        },
        2028:{
            ch:'企业营业执照为空',
            en:'sellerCompanyLicenseUrl null'
        },
        2029:{
            ch:'审核原因为空',
            en:'sellerApproveCause null'
        },
        2030:{
            ch:'审核状态为空',
            en:'sellerApproveStatus null'
        },
        2031:{
            ch:'审核人为空',
            en:'sellerApproveBy null'
        },
        2032:{
            ch:'区域为空',
            en:'area null'
        },
        2033:{
            ch:'品牌名称为空',
            en:'brandName null'
        },
        2034:{
            ch:'店铺名称为空',
            en:'shopName null'
        },
        2035:{
            ch:'店铺Logo为空',
            en:'shopLogo null'
        },
        2036:{
            ch:'店铺封面为空',
            en:'shopCover null'
        },
        2037:{
            ch:'国家为空',
            en:'shopAddressCountry null'
        },
        2038:{
            ch:'省份为空',
            en:'shopAddressProvince null'
        },
        2039:{
            ch:'城市为空',
            en:'shopAddressCity null'
        },
        2040:{
            ch:'营业执照为空',
            en:'shopBusinessLicense null'
        },
        2041:{
            ch:'店铺分类ID为空',
            en:'shopCategoryId null'
        },
        2042:{
            ch:'平台分类ID为空',
            en:'platformCategoryId null'
        },
        2043:{
            ch:'商品名称为空',
            en:'spuName null'
        },
        2044:{
            ch:'商品状态为空',
            en:'spuStatus null'
        },
        2045:{
            ch:'市场价为空',
            en:'priceOriginal null'
        },
        2046:{
            ch:'库存为空',
            en:'spuQty null'
        },
        2047:{
            ch:'商品列表ID为空',
            en:'spuId null'
        },
        2048:{
            ch:'属性名称为空',
            en:'spuAttributeName null'
        },
        2049:{
            ch:'属性值为空',
            en:'spuAttributeValue null'
        },
        2050:{
            ch:'商品明细为空',
            en:'spuDetail null'
        },
        2051:{
            ch:'spu图片为空',
            en:'spuImageUrl null'
        },
        2052:{
            ch:'店铺列表id为空',
            en:'shopType null'
        },
        2053:{
            ch:'店铺详细地址为空',
            en:'shopAddressDetail null'
        },
        2054:{
            ch:'店铺详细地址伟度为空',
            en:'shopAddressX null'
        },
        2055:{
            ch:'店铺详细地址经度为空',
            en:'shopAddressY null'
        },
        2056:{
            ch:'经营类型为空',
            en:'licenseType null'
        },
        2057:{
            ch:'支付方式为空',
            en:'platformPaymentMethodList null'
        },
        2058:{
            ch:'运费为空',
            en:'deliverChargeAmount null'
        },
        2059:{
            ch:'运费类型为空',
            en:'deliverChargeType null'
        },
        2060:{
            ch:'物流列表为空',
            en:'sellerSpuDeliverMethodsList null'
        },
        2061:{
            ch:'物流ID为空',
            en:'spuDeliverMethodId null'
        },
        2062:{
            ch:'物流单号为空',
            en:'deliverNum null'
        },
        2063:{
            ch:'商品属性列表为空',
            en:'sellerSpuAttributesList null'
        },
        2064:{
            ch:'Spu图片为空',
            en:'sellerSpuImagesList null'
        },
        2065:{
            ch:'商家商品服务列表为空',
            en:'sellerSpuServiceList null'
        },
        2066:{
            ch:'物流公司为空',
            en:'deliverCompany null'
        },
        2067:{
            ch:'订单状态为空',
            en:'afterSalesStatus null'
        },
        2068:{
            ch:'商家审核原因为空',
            en:'approveBySellerCause null'
        },
        2069:{
            ch:'开户行为空',
            en:'sellerBank null'
        },
        2070:{
            ch:'银行分行为空',
            en:'sellerBankBranch null'
        },
        2071:{
            ch:'银行卡号为空',
            en:'sellerBankAccountNum null'
        },
        2072:{
            ch:'开户人姓名为空',
            en:'sellerBankAccountOwner null'
        },
        2073:{
            ch:'申请金额为空',
            en:'cashOutAmount null'
        },
        2074:{
            ch:'银行卡ID为空',
            en:'sellerBankAccountId null'
        },
        2075:{
            ch:'语言为空',
            en:'language null'
        },
        2076:{
            ch:'一级分类为空',
            en:'categoryLevelOne null'
        },
        2077:{
            ch:'状态为空',
            en:'categoryStatus null'
        },
        2078:{
            ch:'品牌Logo为空',
            en:'brandLogo null'
        },
        2079:{
            ch:'排序为空',
            en:'brandSeq null'
        },
        2080:{
            ch:'经营类别名称为空',
            en:'licenseTypeName null'
        },
        2081:{
            ch:'币种为空',
            en:'currency null'
        },
        2082:{
            ch:'支付名称为空',
            en:'platformPaymentMethod null'
        },
        2083:{
            ch:'支付公司为空',
            en:'platformPaymentMethodCompany null'
        },
        2084:{
            ch:'广告类型为空',
            en:'adsType null'
        },
        2085:{
            ch:'本地ID为空',
            en:'locationid null'
        },
        2086:{
            ch:'国家为空',
            en:'country null'
        },
        2087:{
            ch:'城市为空',
            en:'country null'
        },
        2088:{
            ch:'省份为空',
            en:'province null'
        },
        2089:{
            ch:'服务为空',
            en:'service null'
        },
        2090:{
            ch:'物流方式为空',
            en:'deliverMethod null'
        },
        2091:{
            ch:'申请状态为空',
            en:'cashOutStatus null'
        },
        2092:{
            ch:'结算种类为空',
            en:'checkOutType null'
        },
        2093:{
            ch:'结算平台佣金率为空',
            en:'checkOutPercentage null'
        },
        2094:{
            ch:'订单明细号为空',
            en:'orderDetailNum null'
        },
        2095:{
            ch:'平台开户行姓名为空',
            en:'platformBankAccountOwner null'
        },
        2096:{
            ch:'平台银行卡号为空',
            en:'platformBankAccountNum null'
        },
        2097:{
            ch:'平台开户行为空',
            en:'platformBank null'
        },
        2098:{
            ch:'平台银行分行为空',
            en:'platformBankBranch null'
        },
        2099:{
            ch:'品牌名称重复',
            en:'platformBankAccountFunction null'
        },
        2100:{
            ch:'开户行类型为空',
            en:'platformBankAccountType null'
        },
        2101:{
            ch:'公告标题为空',
            en:'platformAdsNewsTitle null'
        },
        2102:{
            ch:'对应用户类型为空',
            en:'platformAdsNewsTarget null'
        },
        2103:{
            ch:'公告类目为空',
            en:'platformAdsNewsType null'
        },
        2104:{
            ch:'公告内容为空',
            en:'platformAdsNewsContent null'
        },
        2105:{
            ch:'公告类型为空',
            en:'platformAdsNewsContentType null'
        },
        2106:{
            ch:'公告链接为空',
            en:'platformAdsNewsContentURL null'
        },
        2107:{
            ch:'是否置顶为空',
            en:'platformAdsIsHot null'
        },
        2108:{
            ch:'状态为空',
            en:'platformAdsNewsStatus null'
        },
        2109:{
            ch:'轮动广告标题为空',
            en:'platformAdsBannerTitle null'
        },
        2110:{
            ch:'跳转链接为空',
            en:'platformAdsBannerLink null'
        },
        2111:{
            ch:'请上传图片',
            en:'platformAdsBannerImageUrl null'
        },
        2112:{
            ch:'状态为空',
            en:'platformAdsBannerStatus null'
        },
        2113:{
            ch:'店铺id为空',
            en:'platformAdsShopId null'
        },
        2114:{
            ch:'状态为空',
            en:'platformAdsType null'
        },
        2115:{
            ch:'排序为空',
            en:'platformAdsSeq null'
        },
        2116:{
            ch:'类型为空',
            en:'platformAdsStatus null'
        },
        2117:{
            ch:'商品id为空',
            en:'platformAdsSpuId null'
        },

        2118:{
            ch:'售后订单ID为空',
            en:'orderDetailAfterSalesId null'
        },
        2119:{
            ch:'语言编码为空',
            en:'languageCode null'
        },
        2120:{
            ch:'区域编码为空',
            en:'areaCode null'
        },
        2121:{
            ch:'地址编码为空',
            en:'locationCode null'
        },
        2123:{
            ch:'服务编码为空',
            en:'serviceCode null'
        },
        2124:{
            ch:'物流方式编码为空',
            en:'deliverMethodCode null'
        },
        2125:{
            ch:'平台支付方式编码为空',
            en:'platformPaymentMethodCode null'
        },
        2126:{
            ch:'许可证类型为空',
            en:'licenseTypeCode null'
        },
        2127:{
            ch:'店铺类型编码为空',
            en:'shopTypeCode null'
        },
        2128:{
            ch:'广告类型为空',
            en:'adsTypeCode null'
        },
        2129:{
            ch:'品牌为空',
            en:'brandCode null'
        },
        2130:{
            ch:'分类为空',
            en:'categoryCode null'
        },
        2131:{
            ch:'商品类型为空',
            en:'spuType null'
        },
        2168:{
            ch:'MenuIcon为空',
            en:'MenuIcon null'
        },
        2153:{
            ch:'图标名称为空',
            en:'"IconName null'
        },
        2154:{
            ch:'图标描述为空',
            en:'IconDescription null'
        },
        2155:{
            ch:'静态图标URL为空',
            en:'IconInactiveUrl null'
        },
        2156:{
            ch:'激活图标URL为空',
            en:'IconActiveUrl null'
        },
        2157:{
            ch:'图标序列号为空',
            en:'IconSeq null'
        },
        2158:{
            ch:'主题名称为空',
            en:'ThemeName null'
        },
        2159:{
            ch:'主题标识为空',
            en:'ThemeFlag null'
        },
        2160:{
            ch:'是否显示为空',
            en:'showFlag null'
        },
        2161:{
            ch:'主题浅色为空',
            en:'lightColor null'
        },
        2162:{
            ch:'主题中色为空',
            en:'baseColor null'
        },
        2163:{
            ch:'主题深色为空',
            en:'deepColor null'
        },
        2164:{
            ch:'应用名称为空',
            en:'ApplicationName null'
        },
        2165:{
            ch:'排序为空',
            en:'seq null'
        },
        2166:{
            ch:'跳转类型为空',
            en:'actionType null'
        },
        2167:{
            ch:'跳转资源定位符为空',
            en:'actionUrl null'
        },
        2169:{
            ch:'名称为空',
            en:'MenuName null'
        },
        2170:{
            ch:'标题为空',
            en:'Title null'
        },
        2171:{
            ch:'作者为空',
            en:'author null'
        },
        2172:{
            ch:'发表时间为空',
            en:'publishTime null'
        },
        2173:{
            ch:'文章内容为空',
            en:'content null'
        },
        2174:{
            ch:'封面图为空',
            en:'cover null'
        },
        2175:{
            ch:'第一段文本为空',
            en:'des null'
        },
        2176:{
            ch:'跳转类型为空',
            en:'actionType null'
        },
        2177:{
            ch:'跳转资源定位符为空',
            en:'actionUrl null'
        },
        2178:{
            ch:'跳转资源定位符为空',
            en:'categoryType null'
        },
        2179:{
            ch:'应用图标为空',
            en:'ApplicationIcon null'
        },





        3001:{
            ch:'电子邮件重复',
            en:'email duplicate'
        },
        3002:{
            ch:'电话号码重复',
            en:'phone duplicate'
        },
        3003:{
            ch:'用户名重复',
            en:'username duplicate'
        },
        3004:{
            ch:'昵称重复',
            en:'nickname duplicate'
        },
        3005:{
            ch:'姓名重复',
            en:'realName duplicate'
        },
        3006:{
            ch:'商家公司身份重复',
            en:'sellerCompanyIdentity duplicate'
        },
        3007:{
            ch:'商家公司名称重复',
            en:'sellerCompanyName duplicate'
        },
        3008:{
            ch:'店铺名称重复',
            en:'shopName duplicate'
        },
        3009:{
            ch:'商家银行账号重复',
            en:'sellerBankAccountNum duplicate'
        },
        3010:{
            ch:'一级分类名称重复',
            en:'categoryLevelOne duplicate'
        },
        3011:{
            ch:'品牌名称重复',
            en:'brandName duplicate'
        },


        3012:{
            ch:'订单明细退款记录重复',
            en:'orderDetailRefundRecords duplicate'
        },
        3013:{
            ch:'币种编码 不存在',
            en:'currency code not exist in database'
        },
        3014:{
            ch:'币编码重复',
            en:'currency code duplicate'
        },
        3015:{
            ch:'语言编码重复',
            en:'language code duplicate'
        },
        3016:{
            ch:'区域编码重复',
            en:'area code duplicate'
        },


        3017:{
            ch:'服务编码重复',
            en:'serviceCode duplicate'
        },
        3018:{
            ch:'支付方式编码重复',
            en:'platformPaymentMethodCode duplicate'
        },
        3019:{
            ch:'经营许可证编码重复',
            en:'licenseTypeCode duplicate'
        },
        3020:{
            ch:'店铺类型编码重复',
            en:'shopTypeCode duplicate'
        },
        3021:{
            ch:'广告类型编码重复',
            en:'adsTypeCode duplicate'
        },
        3022:{
            ch:'品牌编码重复',
            en:'brandCode duplicate'
        },
        3023:{
            ch:'分类编码重复',
            en:'categoryCode duplicate'
        },
        3024:{
            ch:'位置编码重复',
            en:'locationCode duplicate'
        },
        3025:{
            ch:'提货方式编码重复',
            en:'deliverMethodCode duplicate'
        },
        3026:{
            ch:'国际电话区号重复',
            en:'RegionCode duplicate'
        },
        3027:{
            ch:'短信服务code重复',
            en:'MessageCode duplicate'
        },
        3028:{
            ch:'ossCode重复',
            en:'OssCode duplicate'
        },
        3031:{
            ch:'分类名称重复',
            en:'spuTypeCode duplicate'
        },
        4004:{
            ch:'禁止删除默认值',
            en:'disable deleting defaults'
        },
        1036:{
            ch:'超级管理员已存在，不能添加',
            en:'Super administrator already exists, cannot add'
        },
        1038:{
            ch:'非普通分类只能有一个',
            en:'There can only be one non common classification'
        },
    }
}

export default code
