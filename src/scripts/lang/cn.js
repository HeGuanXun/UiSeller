// let common = require("./common/common");
let home = require("./cnpages/cn_homepage");
let login = require("./cnpages/cn_loginpage");
let common = require("./common/cn_common");
let currency = require("./common/cnpages/Currencypage");
let Audit = require("./common/cnpages/SellerAuditpage");
let commodity = require("./cnpages/cn_AbsSpu");
let Advertisement = require("./cnpages/cn_Absbanner");
let Notice = require("./cnpages/cn_Absnews");
let shop = require("./cnpages/cn_Absshop");
let service = require("./cnpages/cn_AfterSalerefund");
let Record = require("./cnpages/cn_AfterSalerefundRecord");
let Brand = require("./cnpages/cn_DataShopbarBrand");
let Class = require("./cnpages/cn_DataShopbarCommoditytype");
let Address = require("./cnpages/cn_Datacommonaddresspage");
let region = require("./cnpages/cn_Datacommonareapage");
let language = require("./cnpages/cn_Datacommonlangpage");
let Payment = require("./cnpages/cn_DatafinanceBarPayWay");
let Currency = require("./cnpages/cn_DatafinanceBarmaintain");
let ads = require("./cnpages/cn_Dataplatformabs");
let store = require("./cnpages/cn_DatasellerBarServe");
let Store = require("./cnpages/cn_DatasellerBarStoreType");
let SpuType = require("./cnpages/cn_DatasellerSpuType");
let jingying = require("./cnpages/cn_DatasellerBarcertificate");
let pickup = require("./cnpages/cn_DatasellerBarpickup");
let details = require("./cnpages/cn_Orderdetailspage");
let Order = require("./cnpages/cn_Orderpage");
let Report = require("./cnpages/cn_Reportpage");
let comment = require("./cnpages/cn_Reviewpage");
let seller = require("./cnpages/cn_ShopListpage");
let Shop = require("./cnpages/cn_ShopStoreListpage");
let license = require("./cnpages/cn_ShopbusinessLicense");
let Commodity = require("./cnpages/cn_ShopgoodsListpage");
let area = require("./cnpages/cn_ShoppingArea");
let Type = require("./cnpages/cn_ShopstoreType");
let Userbuyer = require("./cnpages/cn_Userbuyer");
let mployee = require("./cnpages/cn_Useremployee");
let Merchant = require("./cnpages/cn_Userseller");
let account = require("./cnpages/cn_financecompanyAccount");
let invoice = require("./cnpages/cn_financeinvoice");
let Legal = require("./cnpages/cn_financelegalTender");
let cleardetail = require("./cnpages/cn_financeplatformclearDetail");
let orderdetail = require("./cnpages/cn_financeplatformorderDetail");
let Settlement = require("./cnpages/cn_financeplatformrule");
let Member = require("./cnpages/cn_withdrawbuyer");
let Cash = require("./cnpages/cn_withdrawseller");
let merchandise = require("./cnpages/cn_goodsaddpage");
let Area_code = require("./cnpages/cn_DatacommonAreacode");
let download = require("./cnpages/cn_promotiondownload");
let setting = require("./cnpages/cn_promotionSeting");
let trees = require("./cnpages/cn_promotiontrees");
let Menu = require("./cnpages/cn_AdsrollMenu");
let Article = require("./cnpages/cn_adsarticle");
let Url = require("./cnpages/cn_TypeToUrl");
let review = require("./cnpages/cn_storreview");
let Review = require("./cnpages/cn_storereview");
let sku = require("./cnpages/cn_skureview");
let main = Object.assign({}, home, login,common,currency,Audit,commodity,merchandise,
    Advertisement,Notice,shop,service,Record,Brand,Class,Address,region,
    language,Payment,Currency,ads,Store,SpuType,store,jingying,pickup,details,
    Order,Report,comment,seller,Shop,license,Commodity,area,Type,Userbuyer,
    mployee,Merchant,account,invoice,Legal,cleardetail,orderdetail,Settlement,Member,Cash,Area_code,download,setting,trees,Menu,Article,Url,review,Review,sku);
module.exports = main;
