<template>
    <div style="height: 100%;">
        <!-- add -->
        <div id="expressage" style="height: 60px;">
            <div class="headbox">
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 18px;margin-left: 15px"
                        @click="isDialogShow"
                >
                    <i class="el-icon-plus"/>
                    {{$t('Advertisement.Add_announcement')}}
                </el-button
                >
            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px"
                  ref="listPowerSupplyTab"
                  :data="tableData"
                  border
                  highlight-current-row
                  height="75%"
                  :stripe="true"
                  v-loading="listLoading"
                  :default-sort = "{prop: 'data', order: 'descending'}">
            <el-table-column
                    fixed
                    label="ID"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column :label="$t('Advertisement.Notice_ID')" sortable prop="bannerTitle" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.bannerTitle }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="$t('Advertisement.Announcement_content')" sortable prop="bannerImageUrl" width="">
                <template slot-scope="scope">
                    <el-link v-if="scope.row.bannerImageUrl" type="primary" @click="openPic(scope.row.bannerImageUrl)">查看</el-link>
                </template>
            </el-table-column >

            <el-table-column :label="$t('common.ActionType')" sortable prop="actionType" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{$type_options[scope.row.actionType-1].label }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.ActionUrl')" sortable prop="actionUrl" width="188">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.actionUrl }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Advertisement.sort')" sortable prop="bannerSeq" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.bannerSeq }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Advertisement.Status')" sortable prop="bannerStatus" width="">

                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ bannerStatusMap(scope.row.bannerStatus) }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Advertisement.Language')" sortable prop="languageCodeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.languageCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Advertisement.Area')" sortable prop="areaCodeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper" width="188">
                        <span size="medium">{{ scope.row.areaCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Advertisement.Creation_time')" sortable prop="createTime" width="188">
                <template slot-scope="scope">
                    <span size="medium">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('Advertisement.operation')" width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary" plain
                            style="margin-right: 10px"
                            @click="edit(scope.row)"
                    >
                        <i class="el-icon-edit"/>
                        {{$t('Advertisement.edit')}}
                    </el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('Advertisement.OK')"
                            :cancelButtonText="$t('Advertisement.cancel')"
                            icon="el-icon-info"
                            iconColor="red"
                            :title="$t('Advertisement.confirm_deletion')"
                            @onConfirm="doDelete(scope.row.bannerId)"
                    >
                        <el-button
                                slot="reference"
                                size="mini"
                                type="danger"
                                v-if="$platformRole==1"
                        ><i class="el-icon-delete"/>
                            {{$t('Advertisement.delete')}}
                        </el-button
                        >
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--pagination component-->
        <pagination ref="pagination"/>
        <!--upOrOut component-->
        <upOrOut ref="upOrOut"/>
        <!-- Edit -->
        <el-dialog :visible.sync="isAddShow" width="750px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   :show-close="false"
                   center
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="140px" :rules="rules" center>
                <el-form-item :label="$t('Advertisement.notice_ID')" equired prop="bannerTitle" >
                    <el-input size="mini" v-model="form.bannerTitle" maxlength="20"></el-input>
                </el-form-item>
                <type-to-url ref="typeToUrl"/>
                <el-form-item :label="$t('Advertisement.Sort')" equired prop="bannerSeq">
                    <el-input maxlength="4" min="1" size="mini" v-model="form.bannerSeq"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Advertisement.status')" equired prop="bannerStatus">
                    <el-radio-group v-model="form.bannerStatus">
                        <el-radio :label="1">{{$t('Advertisement.Exhibition')}}</el-radio>
                        <el-radio :label="2">{{$t('Advertisement.Not_show')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('Advertisement.language')" required prop="languageCode" >
                    <el-select v-model="form.languageCode" filterable :placeholder="$t('Class.Select_lang')"
                               size="mini">
                        <el-option
                                v-for="item in myLanguage"
                                :key="item.language"
                                :label="item.language"
                                :value="item.languageCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Advertisement.area')" required prop="areaCode" >
                    <el-select v-model="form.areaCode" filterable :placeholder="$t('Payment.select_area')" size="mini">
                        <el-option
                                v-for="item in myArea"
                                :key="item.areaCode"
                                :label="item.area"
                                :value="item.areaCode"
                        />
                    </el-select>
                </el-form-item>
<!--                <el-form-item :label="$t('Advertisement.announcement_content')" equired prop="">-->
<!--                    <upload ref="upload_" type="banner" :callbackUrl="form.bannerImageUrl"/>-->
<!--                </el-form-item>-->

                <el-form-item :label="$t('Advertisement.announcement_content')" required>
                    <el-upload
                            size="mini"
                            class="upload-demo"
                            action="#"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :before-upload="beforeAvatarUpload"
                            list-type="picture">
                        <el-button v-model="form.bannerImageUrl" size="mini" style="margin-left: 0px" type="success">{{$t('Class.upload')}}</el-button>
                    </el-upload>
                    <div style="color: red;" class="el-upload__tip">注:只能上传jpg/jpeg/png/bmp文件， 图片比例3:2
                        且不超过3M
                    </div>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="confirmAdd"><i
                 class="el-icon-check"></i> {{$t('Advertisement.Submit')}}</el-button>
          <el-button @click="isDialogShow"><i class="el-icon-close"></i> {{$t('Advertisement.cancel')}}</el-button>
      </span>
        </el-dialog>
        <!--img component-->
        <my-img ref="myImg"></my-img>
        <!--operation component-->
        <operation ref="operation"/>
        <mainUpload  ref="mainUpload"/>
    </div>

</template>
<script>
    import Moment from "moment";
    import url from "api";
    import {eventBus} from "scripts/utils/BUS";
    import pagination from "@/component/pagination.vue";
    import TypeToUrl from "@/component/TypeToUrl.vue";
    import mainUpload from "@/component/mainUpload.vue";
    import operation from "@/component/operation.vue";
    import upOrOut from "@/component/upOrOut.vue";
    import myImg from "@/component/myImg.vue";
    import urls from "@/scripts/api";
    import upload from "@/component/upload.vue";
    import qs from "qs";
    import Vue from "vue";

    export default {
        components: {
            pagination,
            operation,
            upOrOut,
            upload,
            TypeToUrl,
            myImg,
            mainUpload
        },
        data() {
            return {
                eventBusUpload_bus:'banner_eventBusUpload_bus',
                fileList:[],
                typeUrl_options:[],
                loadUpload: true,
                reFlash: true,
                callbackUrl: '',
                getLanguageUrl: urls.lang_list,
                getAreaUrl: urls.area_list,
                getLanguageBus: 'getLang_eventBus',
                getAreaBus: 'getArea_eventBus',
                myLanguage: [],
                myArea: [],
                isCheck: true,
                title: this.$t('Advertisement.New_movement'),
                form: {},
                dataBusName: 'goodsBus',
                eventBusName: 'goodsEventBus',
                sellerId: null,
                status: null,
                reason: null,

                detailData: {},
                tableData: [],
                searchForm: {},
                pickerOptions: {
                    shortcuts: [
                        {
                            text: this.$t('Advertisement.Last_week'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('Advertisement.Last_month'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('Advertisement.Last_three_months'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                isAddShow: false,
                rules: {
                    bannerTitle: [
                        {required: true, message: this.$t('Advertisement.input_Title')},
                    ],
                    bannerLink: [
                        {required: true, message: this.$t('Advertisement.input_link')},
                    ],
                    bannerImageUrl: [
                        {required: true, message: this.$t('Advertisement.Upload_pictures')}
                    ],
                    bannerSeq: [
                        {required: true, message: this.$t('Advertisement.input_sort')},
                    ],
                    bannerStatus: [
                        {required: true, message: this.$t('Advertisement.Selection_state')},
                    ],
                    languageCode: [
                        {required: true, message: this.$t('shop.Select_Language')}
                    ],
                    areaCode: [
                        {required: true, message: this.$t('shop.Select_Area')}
                    ]
                },
                listLoading: false,
            };

        },

        watch: {
            form: {
                handler(val, oldVal) {
                    try {
                        this.form.bannerSeq = val.bannerSeq.replace(/\D/g, '');
                    } catch (e) {
                    }
                },
                deep: true //true 深度监听
            }
        },

        mounted() {
            eventBus.$on(this.eventBusUpload_bus, (businessUrl) => {
                let files = [];
                let split = businessUrl.split("/");
                let name = split[split.length-1];
                let url = this.$url.oss_url+businessUrl;
                let myImg = {
                    name:this.fileName,
                    url:url
                };
                files.push(myImg);
                this.fileList = files;
                this.form.bannerImageUrl = businessUrl;
            });
            this.loadUpload = false;
            eventBus.$on('getBusinessUrl', (businessUrl) => {
                this.form.bannerImageUrl = businessUrl;
            });
            eventBus.$on(this.dataBusName, (tableData) => {
                this.tableData = tableData;
            });
            eventBus.$on(this.eventBusName, () => {
                this.search();
            });
            this.search();
            this.load();
        },
        beforeDestroy() {
            eventBus.$off('getBusinessUrl');
            eventBus.$off(this.dataBusName);
            eventBus.$off(this.eventBusName);
            eventBus.$off(this.eventBusUpload_bus);
        },
        methods: {
            beforeAvatarUpload(file) {
                this.fileName = file.name;
                if (!/(jpg$)|(png$)|(bmp$)|(jpeg$)/i.test(file.type)) {
                    let context = this.$t("Class.Illegal");
                    let title = this.$t("Class.prompt");
                    let Determine = this.$t("Class.OK");
                    this.$alert(context, title, {
                        confirmButtonText: Determine
                    });
                    return false;
                }
                const isLt3M = file.size / 1024 / 1024 > 3;
                if (isLt3M) {
                    let image = "图片大小不能超过3MB！！";
                    let Determine = this.$t("Class.OK");
                    this.$alert(image, '', {
                        confirmButtonText: Determine
                    });
                    return false
                }
                this.$refs.mainUpload.uploadChange('banner', file, this.eventBusUpload_bus);
            },
            handleRemove(file, fileList) {
                this.form.bannerImageUrl = null;
            },
            openPic(url) {
                if (url == '' || url == null){
                    this.$alert('暂无图片', '', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                this.$refs.myImg.isDialogShow(url, '图片');
            },
            bannerStatusMap(x) {
                //状态  1 展示  2  不展示
                return {1: this.$t('Advertisement.Exhibition'), 2: this.$t('Advertisement.Not_show')}[x]
            },

            doDelete(id) {
                let Delete_successful = this.$t('Advertisement.Delete_successful');
                let Delete_Failed = this.$t('Advertisement.Delete_Failed');
                let s = qs.stringify({bannerId: id});
                this.$axios.post(urls.platformAdsBanner_delete, s).then(res => {
                    this.$alert(Delete_successful, '', {
                        confirmButtonText: this.$t('Advertisement.OK'),
                        callback: () => {
                            this.search();
                        }
                    });
                }).catch((e) => {
                    this.$alert(Delete_Failed, '', {
                        confirmButtonText: this.$t('Advertisement.OK'),
                    });
                    return false;
                });
            },


            reset_() {
                this.searchForm.sellerCompanyName = null,
                    this.searchForm.sellerContactPerson = null,
                    this.searchForm.sellerContactPhone = null,
                    this.searchForm.sellerApproveStatus = -1,
                    this.searchForm.times = null
            },

            buildParam() {
                let formParam = {};
                if (this.searchForm.sellerCompanyName) {
                    formParam.sellerCompanyName = this.searchForm.sellerCompanyName;
                }
                if (this.searchForm.sellerContactPerson) {
                    formParam.sellerContactPerson = this.searchForm.sellerContactPerson;
                }
                if (this.searchForm.sellerContactPhone) {
                    formParam.phone = this.searchForm.sellerContactPhone;
                }
                if (this.searchForm.sellerApproveStatus) {
                    formParam.status = this.searchForm.sellerApproveStatus;
                }
                if (this.searchForm.times != undefined) {
                    let time1 = this.searchForm.times[0];
                    let time2 = this.searchForm.times[1];
                    formParam.startTime = Moment(time1).format("YYYY-MM-DD");
                    formParam.endTime = Moment(time2).format("YYYY-MM-DD");
                }
                return formParam;
            },

            search() {
                this.isEdit = false;
                this.$refs.pagination.$query(urls.platformAdsBanner_list, this.buildParam(), this.dataBusName);
            },

            businessUrl(businessUrl) {
                if (businessUrl === 'sellerIdentityFrontUrl') {
                    businessUrl = this.detailData.sellerIdentityFrontUrl;
                } else if (businessUrl === 'sellerIdentityBackUrl') {
                    businessUrl = this.detailData.sellerIdentityBackUrl;
                } else {
                    businessUrl = this.detailData.sellerCompanyLicenseUrl;
                }
                this.$refs.myImg.isDialogShow(businessUrl);
            },
            //wrap dialog
            isDialogShow() {
                this.title = this.$t('Advertisement.New_movement');
                this.form = {};
                this.clearValidate();
                this.callbackUrl = '';
                this.isAddShow = this.isAddShow !== true;
                this.isEdit = false;
                this.reload();
                this.fileList = [];
            },

            clearValidate() {
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                })
            },

            reload() {
                this.reFresh = false
                this.$nextTick(() => {
                    this.reFresh = true
                })
            },

            edit(row) {
                this.title = this.$t('Advertisement.Edit_movement');
                // this.form.bannerImageUrl = decodeURIComponent(this.form.bannerImageUrl);
                this.form = JSON.parse(JSON.stringify(row));
                let files = [];
                let logos = this.form.bannerImageUrl.split('/');
                let name = logos[logos.length-1];
                let url = this.$url.oss_url+this.form.bannerImageUrl;
                let myImg = {
                    name:name,
                    url:url
                };
                files.push(myImg)
                this.fileList = files;
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.callbackUrl = this.form.bannerImageUrl;
                this.isAddShow = true;
                this.$nextTick(()=>{
                    this.$refs.typeToUrl.update(this.form);
                })
            },

            async confirmAdd() {
                let text = this.$t('Advertisement.New_Successful');
                if (this.isEdit) {
                    text = this.$t('Advertisement.Edit_Successful')
                }
                let currentUrl = this.isEdit ? urls.platformAdsBanner_update : urls.platformAdsBanner_create;

                this.isEdit = false;
                await this.$refs.typeToUrl.check(this.form).then(agrs => {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            // if (this.form.bannerImageUrl==null){
                            //     this.$alert('请上传图片', '', {
                            //         confirmButtonText: '确定'
                            //     });
                            //     return false
                            // }
                            if (agrs) {
                                Vue.delete(this.form, 'createTime');
                                Vue.delete(this.form, 'createTIme');
                                Vue.delete(this.form, 'updateTime');
                                Vue.delete(this.form, 'updateTIme');
                                Vue.delete(this.form, 'createBy');
                                Vue.delete(this.form, 'updateBy');
                                let data = qs.stringify(this.form, {indices: false});
                                this.$axios.post(currentUrl, data).then(res => {
                                    this.$alert(text, '', {
                                        confirmButtonText: this.$t('Advertisement.OK'),
                                        callback: () => {
                                            this.isDialogShow();
                                            this.search();
                                        }
                                    });
                                });
                            }
                        } else {
                            this.$refs.typeToUrl.check();
                            return false;
                        }
                    });

                });
            },
            load() {
                eventBus.$on(this.getLanguageBus, (language) => {
                    let languageArray = [];
                    let arry = [];
                    for (let lang of language) {
                        if (arry.indexOf(lang.language) == -1) {
                            arry.push(lang.language);
                            languageArray.push(lang);
                        }
                    }

                    this.myLanguage = languageArray;
                });
                eventBus.$on(this.getAreaBus, (area) => {
                    let areaArray = [];
                    let arry = [];
                    for (let arrayValue of area) {
                        if (arry.indexOf(arrayValue.area) == -1) {
                            arry.push(arrayValue.area);
                            areaArray.push(arrayValue);
                        }
                    }
                    this.myArea = areaArray;
                });
                this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus');
                this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getArea_eventBus');
            },
        }
    };
</script>
<style lang="scss" scoped>
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
