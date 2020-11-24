<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px;">
            <div class="headbox">
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 14px;margin-left: 25px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    Add
                </el-button
                >
            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 25px;"
                  ref="listPowerSupplyTab"
                  :data="tableData"
                  border
                  height="75%"
                  highlight-current-row
                  :stripe="true"
                  v-loading="listLoading"
                  :default-sort = "{prop: 'data', order: 'descending'}">
            <el-table-column
                    fixed
                    label="ID"
                    type="index"
                    width="50"/>
            <el-table-column label="Theme Name" sortable prop="themeNameStr" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.themeNameStr}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Icon Name" sortable prop="iconName" width="200" >
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.iconName}}</span>
                    </div>
                </template>
            </el-table-column>
<!--            <el-table-column label="图标描述" width="250">-->
<!--                <template slot-scope="scope">-->
<!--                    <div slot="reference" class="name-wrapper">-->
<!--                        <span size="medium">{{ scope.row.iconDescription }}</span>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column label="Static icon URL" sortable prop="iconInactiveUrl" width="400">
                <template slot-scope="scope" v-if="scope.row.iconInactiveUrl">
                    <el-tooltip content="Click to see larger picture" :hide-after="1000" placement="top">
                        <el-image
                                style="width: 100px; height: 40px"
                                :src="$url.oss_url+scope.row.iconInactiveUrl"
                                :preview-src-list="[$url.oss_url+scope.row.iconInactiveUrl]"/>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="Activate icon URL" sortable prop="iconActiveUrl" width="400">
                <template slot-scope="scope" v-if="scope.row.iconActiveUrl">
                    <el-tooltip content="Click to see larger picture" :hide-after="1000" placement="top">
                        <el-image
                                style="width: 100px; height: 40px"
                                :src="$url.oss_url+scope.row.iconActiveUrl"
                                :preview-src-list="[$url.oss_url+scope.row.iconActiveUrl]"/>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="Serial number" sortable prop="iconSeq" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.iconSeq }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operation"  width="220">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    ><i class="el-icon-edit"/>
                        Edit</el-button
                    >
<!--                    <el-popconfirm-->
<!--                            confirmButtonText="确定"-->
<!--                            cancelButtonText="取消"-->
<!--                            icon="el-icon-info"-->
<!--                            iconColor="red"-->
<!--                            title="是否删除？"-->
<!--                            @onConfirm="doDelete(scope.row.iconId)"-->
<!--                    >-->
<!--                        <el-button style="margin-left: 10px"-->
<!--                                   slot="reference"-->
<!--                                   size="mini"-->
<!--                                   type="danger"-->
<!--                                   v-if="$platformRole==1"-->
<!--                        >  <i class="el-icon-delete"/>-->
<!--                            删除</el-button-->
<!--                        >-->
<!--                    </el-popconfirm>-->
                </template>
            </el-table-column>
        </el-table>
        <!--add-->
        <el-dialog :visible.sync="isShow" width="1120px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" size="mini"  :model="form" label-width="80px" :rules="rules" center>
                <el-form-item label="Theme" size="mini" required prop="myThemeId">
                    <el-select v-model="form.myThemeId" placeholder="Please select a theme" size = "mini" style="width: 32%">
                        <el-option
                                v-for="item in themes"
                                :key="item.myThemeId"
                                :label="item.themeName"
                                :value="item.myThemeId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <table width="1070px" border="1" cellpadding="0" cellspacing="0">
                <tr style="text-align: center">
                    <td style="width: 65%" colspan="2" valign="top">
                        My
                        <table width="100%"  border="1" cellpadding="0" cellspacing="0">
                            <tr>
                                <td valign="top" style="width: 33%">Order
                                    <table width="100%" border="1" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="width: 70%">
                                                <span style="color: red;">*</span>1201-Pending <br/> Payment
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="oder.oder1Bus" :callbackUrl="oder.oder1"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <span style="color: red;">*</span>1202-Pending <br/> Receipt
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="oder.oder2Bus" :callbackUrl="oder.oder2"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <span style="color: red;">*</span>1203-Evaluation
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="oder.oder3Bus" :callbackUrl="oder.oder3"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td  >
                                                <span style="color: red;">*</span>1204-After Sale
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="oder.oder4Bus" :callbackUrl="oder.oder4"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="width: 35%">Menu
                                    <table width="100%" border="1" cellpadding="0" cellspacing="0">
                                        <tr >
                                            <td style="width: 70%">
                                                <span style="color: red;">*</span>1205-My Purse
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="menu.menu1Bus" :callbackUrl="menu.menu1"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <span style="color: red;">*</span>1206-My Pass
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="menu.menu2Bus" :callbackUrl="menu.menu2"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <span style="color: red;">*</span>1207-My Collect
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="menu.menu3Bus" :callbackUrl="menu.menu3"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <span style="color: red;">*</span>1208-Third-party Usage
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="menu.menu4Bus" :callbackUrl="menu.menu4"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <span style="color: red;">*</span>1209-Address Manage
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="menu.menu5Bus" :callbackUrl="menu.menu5"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <span style="color: red;">*</span>1210-Check Updates
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="menu.menu6Bus" :callbackUrl="menu.menu6"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <span style="color: red;">*</span>1212-My Settings
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="menu.menu7Bus" :callbackUrl="menu.menu7"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <span style="color: red;">*</span>1213-My Share
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="menu.menu8Bus" :callbackUrl="menu.menu8"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="width: 31%" valign="top">Avatar
                                    <table width="100%" border="1" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="width: 70%">
                                                <span style="color: red;">*</span>1211-Default Avatar
                                            </td>
                                            <td>
                                                <upload ref="upload_" type="icon" :bus="head.head1Bus" :callbackUrl="head.head1"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width: 35%" valign="top" colspan="2">
                        Home
                        <table width="100%"  border="1" cellpadding="0" cellspacing="0">
                            <tr >
                                <td style="width: 58%">
                                    <span style="color: red;">*</span>1001-News
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home1Bus" :callbackUrl="home.home1"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1002-Search
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home2Bus" :callbackUrl="home.home2"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1003-Home
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home3Bus" :callbackUrl="home.home3"/>
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home4Bus" :callbackUrl="home.home4"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1004-Class
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home5Bus" :callbackUrl="home.home5"/>
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home6Bus" :callbackUrl="home.home6"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1005-Customer Service
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home7Bus" :callbackUrl="home.home7"/>
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home8Bus" :callbackUrl="home.home8"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1006-Shopping Cart
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home9Bus" :callbackUrl="home.home9"/>
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home10Bus" :callbackUrl="home.home10"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1007-My
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home11Bus" :callbackUrl="home.home11"/>
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="home.home12Bus" :callbackUrl="home.home12"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr style="text-align: center">
                    <td >
                        Product details
                        <table width="100%"  border="1" cellpadding="0" cellspacing="0">
                            <tr style="width: 200px">
                                <td style="width: 55%">
                                    <span style="color: red;">*</span>1101-Shop
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="spu.spu1Bus" :callbackUrl="spu.spu1"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1102-Collect
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="spu.spu2Bus" :callbackUrl="spu.spu2"/>
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="spu.spu3Bus" :callbackUrl="spu.spu3"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1103-Upper Right Menu
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="spu.spu4Bus" :callbackUrl="spu.spu4"/>
                                </td>
                            </tr>
                            <tr style="width: 200px">
                                <td >
                                    <span style="color: red;">*</span>1104-Share
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="spu.spu5Bus" :callbackUrl="spu.spu5"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1105-Video Player
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="spu.spu6Bus" :callbackUrl="spu.spu6"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1106-Shopping cart
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="spu.spu7Bus" :callbackUrl="spu.spu7"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td  valign="top">
                        Shop
                        <table width="100%"  border="1" cellpadding="0" cellspacing="0">
                            <tr style="width: 200px">
                                <td style="width: 55%">
                                    <span style="color: red;">*</span>1301-Class
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="shop.shop1Bus" :callbackUrl="shop.shop1"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1302-Commodity
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="shop.shop2Bus" :callbackUrl="shop.shop2"/>
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="shop.shop3Bus" :callbackUrl="shop.shop3"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1303-Collect
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="shop.shop4Bus" :callbackUrl="shop.shop4"/>
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="shop.shop5Bus" :callbackUrl="shop.shop5"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1304-Customer Service
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="shop.shop6Bus" :callbackUrl="shop.shop6"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td  valign="top"> App Cover
                        <table width="100%" border="1" cellpadding="0" cellspacing="0">
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1501-App Cover
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="cover.cover1Bus" :callbackUrl="cover.cover1"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width: 20%" valign="top">
                        Login,Register,Forget Password
                        <table width="100%" border="1" cellpadding="0" cellspacing="0">
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1401-Login
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="login.login1Bus" :callbackUrl="login.login1"/>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <span style="color: red;">*</span>1402-Register
                                </td>
                                <td>
                                    <upload ref="upload_" type="icon" :bus="login.login2Bus" :callbackUrl="login.login2"/>
                                </td>
                            </tr>
                            <tr>
                                <td  style="width: 60%">
                                    <span style="color: red;">*</span>1403-Forget <br/> Password
                                </td>
                                <td style="width: 40%">
                                    <upload ref="upload_" type="icon" :bus="login.login3Bus" :callbackUrl="login.login3"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>Submit</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>Cancel</el-button>
      </span>
        </el-dialog>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation  ref="operation"/>
        <!--myImg component-->
        <myImg  ref="myImg"/>
        <!--mainUpload component-->
        <mainUpload ref="mainUpload"/>
        <!--add-->
        <el-dialog :visible.sync="isShowEdit" width="600px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   title="Edit Icon"
        >
            <el-form ref="form" :model="form" label-width="150px" :rules="rules" center>
                <el-form-item label="Topic Name:">
<!--                    <el-input size="mini" maxlength="10" :disabled="true" v-model="form.themeNameStr"/>-->
                    {{form.themeNameStr}}
                </el-form-item>
                <el-form-item label="Icon Name:">
<!--                    <el-input size="mini" maxlength="10" :disabled="true" v-model="form.inconName"/>-->
                    {{form.iconName}}
                </el-form-item>
                <el-form-item label="Static iconURL:" required>
                    <el-upload
                            class="upload-demo"
                            action="#"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :before-upload="beforeAvatarUpload"
                            list-type="picture">
                        <el-button size="mini" type="success">{{$t('Class.upload')}}</el-button>
                        <div slot="tip" class="el-upload__tip">{{$t('Class.Only')}}</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="Activation iconURL:">
                    <el-upload
                            class="upload-demo"
                            action="#"
                            :on-preview="handlePreview"
                            :on-remove="handleRemoveActive"
                            :file-list="fileListActive"
                            :before-upload="beforeAvatarUploadActive"
                            list-type="picture">
                        <el-button size="mini" type="success">Click to upload</el-button>
                        <div style="color: red;" slot="tip" class="el-upload__tip">Note: Only jpg / jpgs / png / bmp files can be uploaded, and no more than 200 KB</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>Submit</el-button>
        <el-button @click="isShowEdit = false"><i class="el-icon-close"></i>Cancel</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
    import {eventBus} from "@/scripts/utils/BUS";
    import myImg from "@/component/myImg.vue";
    import urls from "@/scripts/api";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";
    import mainUpload from "@/component/mainUpload.vue";
    import upload from "@/component/iconUpload.vue";

    export default {
        components: {
            pagination,
            mainUpload,
            operation,
            upload,
            myImg
        },
        data() {
            return {
                isShowEdit:false,
                login:{
                    login1:'',
                    login2:'',
                    login3:'',
                    login1Bus:'login1Bus',
                    login2Bus:'login2Bus',
                    login3Bus:'login3Bus'
                },
                cover:{
                    cover1:'',
                    cover1Bus:'cover1Bus',
                },
                shop:{
                    shop1:'',
                    shop2:'',
                    shop3:'',
                    shop4:'',
                    shop5:'',
                    shop6:'',
                    shop1Bus:'shop1Bus',
                    shop2Bus:'shop2Bus',
                    shop3Bus:'shop3Bus',
                    shop4Bus:'shop4Bus',
                    shop5Bus:'shop5Bus',
                    shop6Bus:'shop6Bus'
                },
                spu:{
                    spu1:'',
                    spu2:'',
                    spu3:'',
                    spu4:'',
                    spu5:'',
                    spu6:'',
                    spu7:'',
                    spu1Bus:'spu1Bus',
                    spu2Bus:'spu2Bus',
                    spu3Bus:'spu3Bus',
                    spu4Bus:'spu4Bus',
                    spu5Bus:'spu5Bus',
                    spu6Bus:'spu6Bus',
                    spu7Bus:'spu7Bus',
                },
                home:{
                    home1:'',
                    home2:'',
                    home3:'',
                    home4:'',
                    home5:'',
                    home6:'',
                    home7:'',
                    home8:'',
                    home9:'',
                    home10:'',
                    home11:'',
                    home12:'',
                    home1Bus:'home1Bus',
                    home2Bus:'home2Bus',
                    home3Bus:'home3Bus',
                    home4Bus:'home4Bus',
                    home5Bus:'home5Bus',
                    home6Bus:'home6Bus',
                    home7Bus:'home7Bus',
                    home8Bus:'home8Bus',
                    home9Bus:'home9Bus',
                    home10Bus:'home10Bus',
                    home11Bus:'home11Bus',
                    home12Bus:'home12Bus',
                },
                head:{
                    head1:'',
                    head1Bus:'head1Bus',
                },
                oder:{
                    oder1:'',
                    oder2:'',
                    oder3:'',
                    oder4:'',
                    oder1Bus:'oder1Bus',
                    oder2Bus:'oder2Bus',
                    oder3Bus:'oder3Bus',
                    oder4Bus:'oder4Bus',
                },
                menu:{
                    menu1:'',
                    menu2:'',
                    menu3:'',
                    menu4:'',
                    menu5:'',
                    menu6:'',
                    menu7:'',
                    menu8:'',
                    menu1Bus:'menu1Bus',
                    menu2Bus:'menu2Bus',
                    menu3Bus:'menu3Bus',
                    menu4Bus:'menu4Bus',
                    menu5Bus:'menu5Bus',
                    menu6Bus:'menu6Bus',
                    menu7Bus:'menu7Bus',
                    menu8Bus:'menu8Bus',
                },
                eventBusUpload: 'icon_eventBusUpload',
                eventBusUploadActive: 'icon_eventBusUploadActive',
                fileList:[],
                fileListActive:[],
                //--------------need to edit
                listUrl:urls.platformAppIcon_list,
                createUrl:urls.platformAppIcon_create,
                updateUrl:urls.platformAppIcon_update,
                deleteUrl:urls.platformAppIcon_delete,
                eventBus:'Icon_eventBus',
                editTitle:"Edit Icon",
                addTitle:"Add Icon",
                idType:'iconId',
                usePagination:true,
                rules: {
                    myThemeId: [
                        {required: true, message: "Please select a theme"},
                    ],
                },
                themes:[],
                platformAppIconList:[],
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {},
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
            };
        },

        watch: {
            form:{
                handler(val,oldVal) {
                    try{
                        this.form.iconSeq = val.iconSeq.replace(/\D/g,'');
                    }catch (e) {

                    }
                },
                deep: true //true 深度监听
            }
        },

        mounted() {
            this.load();
            //------------------------login-------------------------------
            eventBus.$on(this.login.login1Bus, (businessUrl) => {
                this.wrapIcons(1401,'Login',businessUrl)
            });
            eventBus.$on(this.login.login2Bus, (businessUrl) => {
                this.wrapIcons(1402,'Register',businessUrl)
            });
            eventBus.$on(this.login.login3Bus, (businessUrl) => {
                this.wrapIcons(1403,'Forget Password',businessUrl)
            });
            //------------------------cover-------------------------------
            eventBus.$on(this.cover.cover1Bus, (businessUrl) => {
                this.wrapIcons(1501,'App Cover',businessUrl)
            });
            //------------------------shop-------------------------------
            eventBus.$on(this.shop.shop1Bus, (businessUrl) => {
                this.wrapIcons(1301,'Class',businessUrl)
            });
            eventBus.$on(this.shop.shop2Bus, (businessUrl) => {
                this.wrapIcons(1302,'Commodity',businessUrl)
            });
            eventBus.$on(this.shop.shop3Bus, (businessUrl) => {
                this.wrapIcons(1302,'SPU',this.shop.shop2,businessUrl)
            });
            eventBus.$on(this.shop.shop4Bus, (businessUrl) => {
                this.wrapIcons(1303,'Collect',businessUrl)
            });
            eventBus.$on(this.shop.shop5Bus, (businessUrl) => {
                this.wrapIcons(1303,'Collect',this.shop.shop4,businessUrl)
            });
            eventBus.$on(this.shop.shop6Bus, (businessUrl) => {
                this.wrapIcons(1304,'Customer Service',businessUrl)
            });
            //------------------------spu-------------------------------
            eventBus.$on(this.spu.spu1Bus, (businessUrl) => {
                this.wrapIcons(1101,'Shop',businessUrl)
            });
            eventBus.$on(this.spu.spu2Bus, (businessUrl) => {
                this.wrapIcons(1102,'Collect',businessUrl)
            });
            eventBus.$on(this.spu.spu3Bus, (businessUrl) => {
                this.wrapIcons(1102,'Collect',this.spu.spu2,businessUrl)
            });
            eventBus.$on(this.spu.spu4Bus, (businessUrl) => {
                this.wrapIcons(1103,'Upper Right Menu',businessUrl)
            });
            eventBus.$on(this.spu.spu5Bus, (businessUrl) => {
                this.wrapIcons(1104,'Share',businessUrl)
            });
            eventBus.$on(this.spu.spu6Bus, (businessUrl) => {
                this.wrapIcons(1105,'Video Player',businessUrl)
            });
            eventBus.$on(this.spu.spu7Bus, (businessUrl) => {
                this.wrapIcons(1106,'Shopping cart',businessUrl)
            });
            //------------------------home-------------------------------
            eventBus.$on(this.home.home1Bus, (businessUrl) => {
                this.wrapIcons(1001,'News',businessUrl)
            });
            eventBus.$on(this.home.home2Bus, (businessUrl) => {
                this.wrapIcons(1002,'Search',businessUrl)
            });
            eventBus.$on(this.home.home3Bus, (businessUrl) => {
                this.wrapIcons(1003,'Home',businessUrl)
            });
            eventBus.$on(this.home.home4Bus, (businessUrl) => {
                this.wrapIcons(1003,'Home',this.home.home3,businessUrl)
            });
            eventBus.$on(this.home.home5Bus, (businessUrl) => {
                this.wrapIcons(1004,'Class',businessUrl)
            });
            eventBus.$on(this.home.home6Bus, (businessUrl) => {
                this.wrapIcons(1004,'Class',this.home.home5,businessUrl)
            });
            eventBus.$on(this.home.home7Bus, (businessUrl) => {
                this.wrapIcons(1005,'Customer Service',businessUrl)
            });
            eventBus.$on(this.home.home8Bus, (businessUrl) => {
                this.wrapIcons(1005,'Customer',this.home.home7,businessUrl)
            });
            eventBus.$on(this.home.home9Bus, (businessUrl) => {
                this.wrapIcons(1006,'Shopping Cart',businessUrl)
            });
            eventBus.$on(this.home.home10Bus, (businessUrl) => {
                this.wrapIcons(1006,'Shopping cart',this.home.home9,businessUrl)
            });
            eventBus.$on(this.home.home11Bus, (businessUrl) => {
                this.wrapIcons(1007,'My',businessUrl)
            });
            eventBus.$on(this.home.home12Bus, (businessUrl) => {
                this.wrapIcons(1007,'My',this.home.home11,businessUrl)
            });
            //------------------------head-------------------------------
            eventBus.$on(this.head.head1Bus, (businessUrl) => {
                this.wrapIcons(1211,'Default Avatar',businessUrl)
            });
            //------------------------menu-------------------------------
            eventBus.$on(this.menu.menu1Bus, (businessUrl) => {
                this.wrapIcons(1205,'My Purse',businessUrl)
            });
            eventBus.$on(this.menu.menu2Bus, (businessUrl) => {
                this.wrapIcons(1206,'My Pass',businessUrl)
            });
            eventBus.$on(this.menu.menu3Bus, (businessUrl) => {
                this.wrapIcons(1207,'My Collect',businessUrl)
            });
            eventBus.$on(this.menu.menu4Bus, (businessUrl) => {
                this.wrapIcons(1208,'Third-party Usage',businessUrl)
            });
            eventBus.$on(this.menu.menu5Bus, (businessUrl) => {
                this.wrapIcons(1209,'Address Manage',businessUrl)
            });
            eventBus.$on(this.menu.menu6Bus, (businessUrl) => {
                this.wrapIcons(1210,'Check Updates',businessUrl)
            });
            eventBus.$on(this.menu.menu7Bus, (businessUrl) => {
                this.wrapIcons(1212,'My Settings',businessUrl)
            });
            eventBus.$on(this.menu.menu8Bus, (businessUrl) => {
                this.wrapIcons(1213,'My Share',businessUrl)
            });

            //------------------------oder-------------------------------
            eventBus.$on(this.oder.oder1Bus, (businessUrl) => {
                this.wrapIcons(1201,'Pending Payment',businessUrl)
            });
            eventBus.$on(this.oder.oder2Bus, (businessUrl) => {
                this.wrapIcons(1202,'Pending Receipt',businessUrl)
            });
            eventBus.$on(this.oder.oder3Bus, (businessUrl) => {
                this.wrapIcons(1203,'Comment',businessUrl)
            });
            eventBus.$on(this.oder.oder4Bus, (businessUrl) => {
                this.wrapIcons(1204,'After Sale',businessUrl)
            });
        },

        beforeDestroy() {
            eventBus.$off(this.eventBus);
            eventBus.$off(this.login.login1Bus);
            eventBus.$off(this.login.login2Bus);
            eventBus.$off(this.login.login3Bus);
            eventBus.$off(this.cover.cover1Bus);
            eventBus.$off(this.shop.shop1Bus);
            eventBus.$off(this.shop.shop2Bus);
            eventBus.$off(this.shop.shop3Bus);
            eventBus.$off(this.shop.shop4Bus);
            eventBus.$off(this.shop.shop5Bus);
            eventBus.$off(this.shop.shop6Bus);
            eventBus.$off(this.spu.spu1Bus);
            eventBus.$off(this.spu.spu2Bus);
            eventBus.$off(this.spu.spu3Bus);
            eventBus.$off(this.spu.spu4Bus);
            eventBus.$off(this.spu.spu5Bus);
            eventBus.$off(this.spu.spu6Bus);
            eventBus.$off(this.spu.spu7Bus);
            eventBus.$off(this.home.home1Bus);
            eventBus.$off(this.home.home2Bus);
            eventBus.$off(this.home.home3Bus);
            eventBus.$off(this.home.home4Bus);
            eventBus.$off(this.home.home5Bus);
            eventBus.$off(this.home.home6Bus);
            eventBus.$off(this.home.home7Bus);
            eventBus.$off(this.home.home8Bus);
            eventBus.$off(this.home.home9Bus);
            eventBus.$off(this.home.home10Bus);
            eventBus.$off(this.home.home11Bus);
            eventBus.$off(this.home.home12Bus);
            eventBus.$off(this.oder.oder1Bus);
            eventBus.$off(this.oder.oder2Bus);
            eventBus.$off(this.oder.oder3Bus);
            eventBus.$off(this.oder.oder4Bus);
            eventBus.$off(this.menu.menu1Bus);
            eventBus.$off(this.menu.menu2Bus);
            eventBus.$off(this.menu.menu3Bus);
            eventBus.$off(this.menu.menu4Bus);
            eventBus.$off(this.menu.menu5Bus);
            eventBus.$off(this.menu.menu6Bus);
            eventBus.$off(this.menu.menu7Bus);
            eventBus.$off(this.menu.menu8Bus);
            eventBus.$off(this.head.head1Bus);
        },

        methods: {

            wrapIcons(iconSeq,iconName,iconInactiveUrl,iconActiveUrl){
                if (!this.updateIcons(iconSeq,iconName,iconInactiveUrl,iconActiveUrl)){
                    let obj = {};
                    this.$set(obj, 'themeId', this.form.myThemeId);
                    this.$set(obj, 'iconName', iconName);
                    this.$set(obj, 'iconInactiveUrl', iconInactiveUrl);
                    if (iconActiveUrl){
                        this.$set(obj, 'iconActiveUrl', iconActiveUrl);
                    }
                    this.$set(obj, 'iconSeq', iconSeq);
                    this.platformAppIconList.push(obj);
                }
            },

            updateIcons(iconSeq,iconName,iconInactiveUrl,iconActiveUrl){
                let flag = false;
                if (this.platformAppIconList.length>0){
                    for (let i=0;i<this.platformAppIconList.length;i++){
                        if (this.platformAppIconList[i].iconSeq == iconSeq){
                            if (iconActiveUrl){
                                this.platformAppIconList[i].iconActiveUrl = iconActiveUrl;
                            }else {
                                this.platformAppIconList[i].iconInactiveUrl = iconInactiveUrl;
                            }
                            flag = true;
                            break;
                        }
                    }
                }
                return flag;
            },

            beforeAvatarUpload(file) {
                if (this.buildUploadParam(file)){
                    this.$refs.mainUpload.uploadChange('category', file, this.eventBusUpload);
                }
            },

            beforeAvatarUploadActive(file) {
                if (this.buildUploadParam(file)){
                    this.$refs.mainUpload.uploadChange('category', file, this.eventBusUploadActive);
                }
            },

            buildUploadParam(file){
                this.fileName = file.name;
                if (!/(jpg$)|(png$)|(bmp$)|(jpeg$)/i.test(file.type)) {
                    let context = "Picture format can only upload jpg / png / bmp / jpeg";
                    let title = "Check";
                    let Determine = "OK";
                    this.$alert(context, title, {
                        confirmButtonText: Determine
                    });
                    return false;
                }
                const isLt3M = file.size / 1024 / 1024 > 0.2;
                if (isLt3M) {
                    let image = "Image size cannot exceed 200 KB！";
                    let Determine = "OK";
                    this.$alert(image, '', {
                        confirmButtonText: Determine
                    });
                    return false
                }
                return true;
            },

            handleRemove(file, fileList) {
                this.form.iconInactiveUrl = null;
            },

            handleRemoveActive(file, fileList) {
                this.form.iconActiveUrl = null;
            },

            handlePreview(file) {
                console.log("file");
            },

            load(){
                eventBus.$on(this.eventBus, (tableData) => {
                    if (tableData) {
                        this.listLoading = false;
                        this.tableData = tableData;
                    } else {
                        this.isEdit = false;
                        this.query()
                    }
                    this.isShow = false;
                });
                this.usePagination ? this.query() : this.noPageQuery();
                eventBus.$on(this.eventBusUpload, (businessUrl) => {
                    let files = [];
                    let split = businessUrl.split("/");
                    let name = split[split.length-1];
                    let url = this.$url.oss_url+businessUrl;
                    let myImg = {
                        name:this.fileName,
                        url:url
                    };
                    files.push(myImg)
                    this.fileList = files;
                    this.form.iconInactiveUrl = businessUrl;
                });

                eventBus.$on(this.eventBusUploadActive, (businessUrl) => {
                    let files = [];
                    let split = businessUrl.split("/");
                    let name = split[split.length-1];
                    let url = this.$url.oss_url+businessUrl;
                    let myImg = {
                        name:this.fileName,
                        url:url
                    };
                    files.push(myImg)
                    this.fileListActive = files;
                    this.form.iconActiveUrl = businessUrl;
                });

                this.$axios.get(this.$url.platformAppTheme_listTwo).then(res => {
                    let themes = [];
                    if (res.data.data){
                        res.data.data.forEach((data,index)=>{
                            let obj={};
                            obj={...obj,myThemeId:data.themeId,themeName:data.themeName};
                            themes.push(obj);
                        })
                    }
                    this.themes = themes;
                })
            },

            isRealNum(val){
                if(val === "" || val ==null){
                    return false;
                }
                if(!isNaN(val)){
                    return true;
                }
                else{
                    return false;
                }
            },

            reset(){
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },

            doDelete(id) {
                this.$refs.operation.$deleteById(this.deleteUrl, id, this.eventBus,this.idType);
            },

            noPageQuery() {
                this.listLoading = true;
                this.$refs.operation.$noPageQuery(this.listUrl, this.eventBus);
            },

            query() {
                this.listLoading = true;
                this.$refs.pagination.$query(this.listUrl, this.searchForm, this.eventBus);
            },

            toAdd() {
                this.isEdit=false,
                this.title = this.addTitle;
                this.form = {};
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                });
               // this.form.myThemeId = this.themes[0].myThemeId;
               // this.form.themeName = this.themes[0].themeName;
                this.platformAppIconList = [];
                this.isShowDialog();
            },

            isShowDialog() {
                this.isShow = this.isShow !== true;
            },

            toEdit(row){
                this.fileList = [];
                this.fileListActive = [];
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                let files = [];
                let split = this.form.iconInactiveUrl.split("/");
                let name = split[split.length-1];
                let url = this.$url.oss_url+this.form.iconInactiveUrl;
                let myImg = {
                    name:this.fileName,
                    url:url
                };
                files.push(myImg);
                this.fileList = files;
                if (this.form.iconActiveUrl){
                    let files = [];
                    let split = this.form.iconActiveUrl.split("/");
                    let name = split[split.length-1];
                    let urlActive = this.$url.oss_url+this.form.iconActiveUrl;
                    let myImg = {
                        name:this.fileName,
                        url:urlActive
                    };
                    files.push(myImg);
                    this.fileListActive = files;
                }
                this.isShowEdit = true;
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = "Added successfully！";
                if (this.isEdit) {
                    text = "Edit successfully！";
                    url = this.updateUrl;
                } else {
                    url = this.$url.platformAppTheme_saveBatch;
                    this.form.themeId = this.spuId;
                    this.form.platformAppIconList = this.platformAppIconList;
                }
                // if (this.platformAppIconList.length<33){
                //     this.$alert('请检查完善所有信息！', '', {
                //         confirmButtonText: '确定'
                //     });
                //     return
                // }
                this.form.themeId = this.form.myThemeId;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.form.platformAppIconList.length>0){
                            let platformAppIconList = [];
                            this.form.platformAppIconList.forEach((data,index)=>{
                                data = {...data,themeId:this.form.myThemeId};
                                platformAppIconList.push(data);
                            })
                            this.form.platformAppIconList = platformAppIconList;
                        }else {
                            this.$alert('Please upload picture！', '', {
                                confirmButtonText: 'OK'
                            });
                            return false;
                        }
                        let form = JSON.parse(JSON.stringify(this.form));
                        this.$axios.post(url, form
                        ).then(res => {
                            this.$alert(text, '', {
                                confirmButtonText: 'OK',
                                callback: () => {
                                    this.platformAppIconList = [];
                                    this.isShow = false;
                                    this.isShowEdit = false;
                                    this.query();
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    table{ background-color:#fff; line-height:25px;}
    th{ background-color:#fff;}
    td{ background-color:#fff; text-align:center}
    #expressage {
        .infobox {
            margin: 12px 0;
        }

        .headbox {
            display: flex;
            flex-wrap: nowrap;
            width: 100%;
        }

        .searchbox {
            margin: 15px;
            width: 10.6%;
        }
    }
</style>
