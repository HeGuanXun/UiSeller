<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px">
            <div class="headbox">
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 14px;margin-left: 15px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    {{$t('setting.Add')}}
                </el-button
                >
            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px;"
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
            <el-table-column :label="$t('setting.banners')" sortable prop="promotionTitle" >
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                    <span size="medium">{{ scope.row.promotionTitle}}</span>
                </div>
            </template>
        </el-table-column>
            <el-table-column :label="$t('setting.poster')"  sortable prop="posterUrl">
                <template slot-scope="scope">
                    <el-link v-if="scope.row.posterUrl" type="primary" @click="openPic(scope.row.posterUrl)">{{$t('setting.View')}}</el-link>
                </template>
            </el-table-column >
            <el-table-column label="是否显示" sortable prop="showFlag" width="">
                <template slot-scope="scope">
                        <span size="medium">{{ $ifShow[scope.row.showFlag].label}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('setting.Article')" sortable prop="primary">
                <template slot-scope="scope">
                   <el-link type="primary" @click="openAtical(scope.row)" >{{$t('setting.Preview')}}</el-link>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('setting.operating')"  width="200">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    ><i class="el-icon-edit"/>
                        {{$t('setting.Edit')}}</el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('setting.OK')"
                            :cancelButtonText="$t('setting.Cancel')"
                            Theme="el-Theme-info"
                            ThemeColor="red"
                            :title="$t('setting.sure')"
                            @onConfirm="doDelete(scope.row.settingId)"
                    >
                        <el-button style="margin-left: 10px"
                                   slot="reference"
                                   size="mini"
                                   type="danger"
                                   v-if="$platformRole==1"
                        >  <i class="el-icon-delete"/>
                            {{$t('setting.Delete')}}</el-button
                        >
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--add-->
        <el-dialog :visible.sync="isShow" width="700px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="100px" :rules="rules" center>
                <el-form-item :label="$t('setting.Banners')" required  prop="promotionTitle">
                    <el-input size="mini" type="textarea" resize="none" :rows="6" maxlength="300"  show-word-limit v-model="form.promotionTitle"/>
                </el-form-item>
                <el-form-item :label="$t('setting.Poster')" required >
                    <el-upload
                            size="mini"
                            class="upload-demo"
                            action="#"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :before-upload="beforeAvatarUpload"
                            list-type="picture">
                        <el-button v-model="form.posterUrl" size="mini" type="success">{{$t('Class.upload')}}</el-button>
                        <div style="color: red" slot="tip" class="el-upload__tip">{{$t('setting.Note')}}</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="是否显示：" required prop="showFlag">
                    <el-radio-group v-model="form.showFlag">
                        <el-radio :label="1">显示</el-radio>
                        <el-radio :label="0">不显示</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item :label="$t('setting.rule')" required prop="promotionRule" >
                    <wangEnduit v-model="form.promotionRule" :isClear="false" :type="2"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-Theme-check"></i><i class="el-icon-check"></i>{{$t('setting.submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-Theme-close"></i><i class="el-icon-close"></i>{{$t('setting.Cancel')}}</el-button>
      </span>
        </el-dialog>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation  ref="operation"/>
        <!--mainUpload component-->
        <mainUpload  ref="mainUpload"/>
        <!--myImg component-->
        <myImg ref="myImg"/>
        <constant ref="constant"/>
    </div>
</template>
<script>
    import Moment from "moment";
    import myImg from "@/component/myImg.vue";
    import wangEnduit from "@/component/wangEnduit.vue";
    import mainUpload from "@/component/mainUpload.vue";
    import constant from "@/component/constant.vue";
    import {eventBus} from "@/scripts/utils/BUS";
    import urls from "@/scripts/api";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";

    export default {
        components: {
            pagination,
            mainUpload,
            wangEnduit,
            myImg,
            operation,
            constant
        },
        data() {
            return {
                eventBusUpload_bus:'setting_eventBusUpload_bus',
                fileList:[],
                //--------------need to edit
                list_url:urls.promotionSetting_list,
                create_url:urls.promotionSetting_create,
                update_url:urls.promotionSetting_update,
                delete_url:urls.promotionSetting_delete,
                eventBus:'setting_eventBus',
                editTitle:this.$t('setting.settings'),
                addTitle:this.$t('setting.New'),
                idType:'settingId',
                usePagination:true,
                rules: {
                    showFlag: [
                        {required: true, message: "Please choose whether to show"}
                    ],
                    promotionTitle: [
                        {required: true, message: this.$t('setting.enter')},
                    ],
                    promotionRule: [
                        {required: true, message: this.$t('setting.fill')},
                    ],
                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {settingStatus:1},
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
            };
        },

        watch: {
            form:{
                handler(val) {
                    try{
                        this.form.themeFlag = val.themeFlag.replace(/\D/g,'');
                    }catch (e) {

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
                this.form.posterUrl = businessUrl;
            });
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
            //Whether or not to use paging queries
            this.usePagination ? this.query() : this.noPageQuery();
        },

        beforeDestroy() {
            eventBus.$off(this.eventBus);
            eventBus.$off(this.eventBusUpload_bus);
        },

        methods: {
            Status(x) {
                // 文章状态
                return {1: "发布", 0: "未发布"}[x]
            },


            openAtical(content){
                let routeData = this.$router.resolve({
                    path: "/h5",
                    query: {
                        content:content.promotionRule
                    }
                });
                window.open(routeData.href, '_blank ',content.promotionTitle);
            },
            openPic(url) {
                if (url == '' || url == null){
                    this.$alert('暂无封面图', '', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                this.$refs.myImg.isDialogShow(url, '海报');
            },
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
                const isLt3M = file.size / 1024 / 1024 > 1;
                if (isLt3M) {
                    let image = this.$t("common.imgSize");
                    let Determine = this.$t("Class.OK");
                    this.$alert(image, '', {
                        confirmButtonText: Determine
                    });
                    return false
                }
                this.$refs.mainUpload.uploadChange('rollMenu', file, this.eventBusUpload_bus);
            },

            handleRemove(file, fileList) {
                this.form.posterUrl = null;
            },
            // reset(){
            //     this.searchForm = {};
            //     this.usePagination ? this.query() : this.noPageQuery();
            // },
            reset(){
                this.searchForm = {};
                this.query()
            },

            query() {
                this.listLoading = true;
                this.$refs.pagination.$query(this.list_url, this.searchForm, this.eventBus);
            },

            doDelete(id) {
                this.$refs.operation.$deleteById(this.delete_url, id, this.eventBus,this.idType);
            },

            noPageQuery() {
                this.listLoading = true;
                this.$refs.operation.$noPageQuery(this.list_url, this.eventBus);
            },

            toAdd() {
                this.isEdit=false,
                    this.title = this.addTitle;
                this.form = {};
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate();
                        this.fileList = [];
                    }
                });
                this.isShowDialog();
            },

            isShowDialog() {
                this.isShow = this.isShow !== true;
            },

            toEdit(row){
                this.title = this.editTitle;
                this.form = JSON.parse(JSON.stringify(row));
                this.form.promotionRule = decodeURIComponent(this.form.promotionRule);
                let files = [];
                let logos = this.form.posterUrl.split('/');
                let name = logos[logos.length-1];
                let url = this.$url.oss_url+this.form.posterUrl;
                let myImg = {
                    name:name,
                    url:url
                };
                files.push(myImg)
                this.fileList = files;
                this.isEdit = true;
                this.isShowDialog();
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = this.$t('setting.added');
                if (this.isEdit) {
                    text = this.$t('setting.edit');
                    url = this.update_url;
                } else {
                    url = this.create_url;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let upload = this.$t('setting.upload');
                        if (this.form.posterUrl==null){
                            this.$alert(upload, '', {
                                confirmButtonText: this.$t('setting.OK')
                            });
                            return false
                        }
                         let form = JSON.parse(JSON.stringify(this.form));
                             form.promotionRule = encodeURIComponent(form.promotionRule);
                        this.$refs.operation.$confirmData(url, form, text, this.eventBus);
                    } else {
                        return false;
                    }
                });
            }
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
