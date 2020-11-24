let server = "/apiproxy";
let server7 = "/api7proxy";

let urls = {
    //登录,登出
    login: `${server}/oauth/token`,
    //用户信息
    navbar_url: `${server}/userPlatform/userPlatformInfo`,
    //上传图片
    oss_url: "http://ylshop.oss-cn-shenzhen.aliyuncs.com/",
    //h5
    h5: `${server7}/h5/`,
    /*
    *商城区域：
    */
    area_create: `${server7}/platformInformationArea/create`,
    area_update: `${server7}/platformInformationArea/update`,
    area_list: `${server7}/platformInformationArea/list`,
    area_delete: `${server7}/platformInformationArea/delete`,
    /*
    *提货方式：
    */
    pickup_create: `${server7}/PlatformInformationDeliverMethods/create`,
    pickup_update: `${server7}/PlatformInformationDeliverMethods/update`,
    pickup_list: `${server7}/PlatformInformationDeliverMethods/list`,
    pickup_delete: `${server7}/PlatformInformationDeliverMethods/delete`,
    /*
    *支付方式:
    */
    payWay_create: `${server7}/platformPaymentMethods/create`,
    payWay_update: `${server7}/platformPaymentMethods/update`,
    payWay_list: `${server7}/platformPaymentMethods/list`,
    payWay_delete: `${server7}/platformPaymentMethods/delete`,
    /*
     *币种:
     */
    maintain_create: `${server7}/platformCurrency/create`,
    maintain_update: `${server7}/platformCurrency/update`,
    maintain_list: `${server7}/platformCurrency/list`,
    maintain_delete: `${server7}/platformCurrency/delete`,
    /*
     *店铺类型:
     */
    storeType_create: `${server7}/platformShopType/create`,
//  maintain_update: `${server7}/platformCurrency/update`,
    storeType_list: `${server7}/platformShopType/list`,
    storeType_delete: `${server7}/platformShopType/delete`,
    platformCategory_list: `${server7}/platformCategory/selectList`,
    /*
      *经营许可证:
      */
    certificate_create: `${server7}/platformLicenseType/create`,
//  maintain_update: `${server7}/platformCurrency/update`,
    certificate_list: `${server7}/platformLicenseType/list`,
    certificate_delete: `${server7}/platformLicenseType/delete`,

    /*
      *品牌管理:
      */
    brand_create: `${server7}/platformBrands/create`,
    brand_list: `${server7}/platformBrands/list`,
    brand_delete: `${server7}/platformBrands/delete`,
    /*
     *商品分类分类:
     */
    commodityType_create: `${server7}/platformCategory/create`,
    commodityType_list: `${server7}/platformCategory/list`,
    commodityType_delete: `${server7}/platformCategory/delete`,
    commodityType_selectList: `${server7}/platformCategory/selectList`,

    // 门店列表
    // 门店审核
    sellerBrandStoreslist: `${server7}/sellerBrandStores/list`,
    sellerBrandStoresqueryById: `${server7}/sellerBrandStores/queryById`,
    sellerBrandStoresreview: `${server7}/sellerBrandStores/review`,
    sellerBrandStoresdelete: `${server7}/sellerBrandStores/delete`,
    platformBrandslistAll: `${server7}/platformBrands/listAll`,
    // 库存审核
    sellerBrandStoresSkulist: `${server7}/sellerBrandStoresSku/list`,
    sellerBrandStoresSkuqueryById: `${server7}/sellerBrandStoresSku/queryById`,
    sellerBrandStoresSkureview: `${server7}/sellerBrandStoresSku/review`,
    sellerBrandStoresSkudelete: `${server7}/sellerBrandStoresSku/delete`,



    /*
 *商品类型:
 */
    spuType_create: `${server7}/platformInformationSpuType/create`,
    spuType_list: `${server7}/platformInformationSpuType/list`,
    spuType_delete: `${server7}/platformInformationSpuType/delete`,

    /*
     *广告类型:
     */
    ads_create: `${server7}/platformAdsType/create`,
    ads_list: `${server7}/platformAdsType/list`,
    ads_delete: `${server7}/platformAdsType/delete`,

    /*
 *轮动广告:
 */
    platformAdsBanner_create: `${server7}/platformAdsBanner/create`,
    platformAdsBanner_update: `${server7}/platformAdsBanner/update`,
    platformAdsBanner_list: `${server7}/platformAdsBanner/list`,
    platformAdsBanner_delete: `${server7}/platformAdsBanner/delete`,
    /*
*公告:
*/
    platformAdsNews_create: `${server7}/platformAdsNews/create`,
    platformAdsNews_queryById: `${server7}/platformAdsNews/queryById`,
    platformAdsNews_list: `${server7}/platformAdsNews/list`,
    platformAdsNews_update: `${server7}/platformAdsNews/update`,
    platformAdsNews_delete: `${server7}/platformAdsNews/delete`,

    /*
*推荐店铺:
*/
    platformAdsShop_create: `${server7}/platformAdsShop/create`,
    platformAdsShop_update: `${server7}/platformAdsShop/update`,
    platformAdsShop_list: `${server7}/platformAdsShop/list`,
    platformAdsShop_delete: `${server7}/platformAdsShop/delete`,


    /*
*推荐商品:
*/
    platformAdsSpu_create: `${server7}/platformAdsSpu/create`,
    platformAdsSpu_update: `${server7}/platformAdsSpu/update`,
    platformAdsSpu_list: `${server7}/platformAdsSpu/list`,
    platformAdsSpu_delete: `${server7}/platformAdsSpu/delete`,


    /*
     *语言信息:
     */
    lang_create: `${server7}/languageInfo/create`,
    lang_list: `${server7}/languageInfo/list`,
    lang_delete: `${server7}/languageInfo/delete`,

    /*
    *地址信息：
    */
    address_create: `${server7}/platformInformationLocations/create`,
    address_update: `${server7}/platformInformationLocations/update`,
    address_list: `${server7}/platformInformationLocations/list`,
    address_delete: `${server7}/platformInformationLocations/delete`,
    /*
    *国际电话区号：
    */
    AreaCode_create: `${server7}/platformInformationPhoneCode/create`,
    AreaCode_update: `${server7}/platformInformationPhoneCode/update`,
    AreaCode_list: `${server7}/platformInformationPhoneCode/list`,
    AreaCode_delete: `${server7}/platformInformationPhoneCode/delete`,
    /*
    *商品服务：
    */
    service_create: `${server7}/platformInformationService/create`,
    service_update: `${server7}/platformInformationService/update`,
    service_list: `${server7}/platformInformationService/list`,
    service_delete: `${server7}/platformInformationService/delete`,
    /*
    *商家列表：
    */
    seller_findById: `${server7}/sellerProfile/findById`,
    seller_update: `${server7}/sellerProfile/update`,
    seller_list: `${server7}/sellerProfile/list`,
    seller_review: `${server7}/sellerProfile/review`,
    /*
  *商品列表：
  */
    goodsList_queryDetailsById: `${server7}/SellerSpu/queryDetailsById`,
    goodsList_updateBatchById: `${server7}/SellerSpu/downShelfBatch`,
    goodsList_list: `${server7}/SellerSpu/list`,
    goodsList_review: `${server7}/SellerSpu/review`,
    /*
  *店铺列表：
  */
//  goodsList_queryById: `${server7}/SellerSpu/queryById`,
    storeList_findById: `${server7}/sellerShopProfile/findById`,
    storeList_listAll: `${server7}/sellerShopProfile/listAll`,
    storeList_list: `${server7}/sellerShopProfile/list`,
    storeList_review: `${server7}/sellerShopProfile/review`,
    /*
     *店铺分类：
     */
//  goodsList_queryById: `${server7}/SellerSpu/queryById`,
    storeType_queryById: `${server7}/sellerShopCategory/queryById`,
    storeType_shop_list: `${server7}/sellerShopCategory/list`,
    storeType_review: `${server7}/sellerShopCategory/review`,
    /*
      *经营许可证：
      */
    sellerShopLicense_queryById: `${server7}/sellerShopLicense/queryById`,
    sellerShopLicense_list: `${server7}/sellerShopLicense/list`,
    sellerShopLicense_review: `${server7}/sellerShopLicense/review`,
    /*
    *员工管理：
    */
    user_create: `${server7}/userPlatform/create`,
    user_update: `${server7}/userPlatform/update`,
    user_list: `${server7}/userPlatform/list`,
    user_delete: `${server7}/userPlatform/delete`,
    user_review: `${server7}/userPlatform/review`,
    user_updatePassword: `${server7}/userPlatform/updatePassword`,


    /*
    *商家管理：
    */
    user_seller_list: `${server7}/userSeller/list`,
    user_seller_delete: `${server7}/userSeller/delete`,
    user_seller_review: `${server7}/userSeller/review`,

    /*
    *会员管理：
    */
    user_Buyer_list: `${server7}/userBuyer/list`,
    user_Buyer_delete: `${server7}/userBuyer/delete`,
    user_Buyer_changeStatus: `${server7}/userBuyer/changeStatus`,
    /*
    *订单：
    */
    order_list: `${server7}/order/list`,
    order_queryById: `${server7}/order/queryById`,

    /*
  *评论：
  */
    review_update: `${server7}/orderDetailReviews/update`,
    review_batchDelete: `${server7}/orderDetailReviews/batchDelete`,
    review_list: `${server7}/orderDetailReviews/list`,
    review_delete: `${server7}/orderDetailReviews/delete`,

    /*
    *公司账户：
    */
    bankAccounts_list: `${server7}/bankAccounts/list`,
    bankAccounts_create: `${server7}/bankAccounts/create`,
    bankAccounts_delete: `${server7}/bankAccounts/delete`,
    //法币
    bankTransactions_list: `${server7}/bankTransactions/list`,

    checkOutRule_create: `${server7}/checkOutRule/create`,
    checkOutRule_list: `${server7}/checkOutRule/listAll`,
    checkOutRule_delete: `${server7}/checkOutRule/delete`,
    //结算明细-查询
    checkOut_list: `${server7}//checkOut/list`,
    //订单明细
    orderDetail_list: `${server7}/orderDetail/list`,
    orderDetail_listForFinance: `${server7}/orderDetail/listForFinance`,
    orderDetail_queryById: `${server7}/orderDetail/queryById`,
    orderDetail_queryByOrderDetailNum: `${server7}/orderDetail/queryByOrderDetailNum`,
    orderDetail_checkOutBatch: `${server7}/checkOut/checkOutBatch`,
    /*
    *提现：
    */
    platformCashOut_list: `${server7}/platformCashOut/list`,
    platformCashOut_queryById: `${server7}/platformCashOut/queryById`,
    platformCashOut_review: `${server7}/platformCashOut/review`,
    /*
    *OSS：
    */
    OSS_list: `${server7}/platformDevAliyunOss/list`,
    OSS_create: `${server7}/platformDevAliyunOss/create`,
    OSS_delete: `${server7}/platformDevAliyunOss/delete`,
    OSS_update: `${server7}/platformDevAliyunOss/update`,
    /*
    *短信服务：
    */
    SMS_list: `${server7}/platformDevAliyunMessage/list`,
    SMS_create: `${server7}/platformDevAliyunMessage/create`,
    SMS_update: `${server7}/platformDevAliyunMessage/update`,
    SMS_delete: `${server7}/platformDevAliyunMessage/delete`,

    /*
      *退款：
      */
    orderDetailAfterSales_refund: `${server7}/orderDetailAfterSales/refund`,
    orderDetailAfterSales_close: `${server7}/orderDetailAfterSales/close`,
    orderDetailAfterSales_list: `${server7}/orderDetailAfterSales/list`,
    //退款记录
    orderDetailRefundRecords_list: `${server7}/orderDetailRefundRecords/list`,

    platformCategory_queryLevelThree: `${server7}/platformCategory/queryLevelThree`,

    SellerSpu_queryDetailsById: `${server7}/SellerSpu/queryDetailsById`,
    /*
     *开发者：Icon
     */
    platformAppIcon_list: `${server7}/platformAppIcon/list`,
    platformAppIcon_create: `${server7}/platformAppIcon/create`,
    platformAppIcon_update: `${server7}/platformAppIcon/update`,
    platformAppIcon_delete: `${server7}/platformAppIcon/delete`,
    platformAppTheme_saveBatch: `${server7}/platformAppTheme/saveBatch`,
    platformAppTheme_updateBatchById: `${server7}/platformAppTheme/updateBatchById`,
    /*
     *开发者：theme colors
     */
    platformAppTheme_list: `${server7}/platformAppTheme/list`,
    platformAppTheme_create: `${server7}/platformAppTheme/create`,
    platformAppTheme_update: `${server7}/platformAppTheme/update`,
    platformAppTheme_delete: `${server7}/platformAppTheme/delete`,
    platformAppTheme_listTwo: `${server7}/platformAppTheme/listTwo`,
    /*
     *开发者：third Application
     */
    platformAppThirdApplication_list: `${server7}/platformAppThirdApplication/list`,
    platformAppThirdApplication_create: `${server7}/platformAppThirdApplication/create`,
    platformAppThirdApplication_update: `${server7}/platformAppThirdApplication/update`,
    platformAppThirdApplication_delete: `${server7}/platformAppThirdApplication/delete`,
    /*
    *广告：轮动菜单
    */
    platformRolliMenu_list: `${server7}/platformRolliMenu/list`,
    platformRolliMenu_create: `${server7}/platformRolliMenu/create`,
    platformRolliMenu_update: `${server7}/platformRolliMenu/update`,
    platformRolliMenu_delete: `${server7}/platformRolliMenu/delete`,
    /*
   *广告：文章
   */
    article_list: `${server7}/article/list`,
    article_create: `${server7}/article/create`,
    article_update: `${server7}/article/update`,
    article_delete: `${server7}/article/delete`,

    /**
    *推广：用户
    */
    promotionTrees_list: `${server7}/promotionTrees/list`,
    /**
     *推广：设置
     */
    promotionSetting_list: `${server7}/promotionSetting/list`,
    promotionSetting_create: `${server7}/promotionSetting/create`,
    promotionSetting_update: `${server7}/promotionSetting/update`,
    promotionSetting_delete: `${server7}/promotionSetting/delete`,
    /**
     *推广：apk信息
     */
    promotionDownload_list: `${server7}/promotionDownload/list`,
    promotionDownload_create: `${server7}/promotionDownload/create`,
    promotionDownload_update: `${server7}/promotionDownload/update`,
    promotionDownload_delete: `${server7}/promotionDownload/delete`,



};

export default urls;
