<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px;">
            <div class="headbox">
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 14px;margin-left: 15px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    Add
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
            <el-table-column label="Application Name" sortable prop="applicationName">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.applicationName}}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Application icon" width="" sortable prop="applicationIcon">
                <template slot-scope="scope">
                    <el-link v-if="scope.row.applicationIcon" type="primary" @click="openPic(scope.row.applicationIcon)">View</el-link>
                </template>
            </el-table-column >

            <el-table-column label="ShowFlag" sortable prop="showFlag" width="200" >
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ $ifShow[scope.row.showFlag].label}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Sort" sortable prop="seq" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.seq }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="ActionType" sortable prop="actionType" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{$type_options[scope.row.actionType-1].label }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="ActionUrl" sortable prop="actionUrl" width="450">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.actionUrl }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operating"  width="220">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    ><i class="el-icon-edit"/>
                        Edit</el-button
                    >
                    <el-popconfirm
                            confirmButtonText="OK"
                            cancelButtonText="Cancel"
                            Theme="el-Theme-info"
                            ThemeColor="red"
                            title="Delete or not？"
                            @onConfirm="doDelete(scope.row.applicationId)"
                    >
                        <el-button style="margin-left: 10px"
                                   slot="reference"
                                   size="mini"
                                   type="danger"
                                   v-if="$platformRole==1"
                        >  <i class="el-icon-delete"/>
                            Delete</el-button
                        >
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--add-->
        <el-dialog :visible.sync="isShow" width="650px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="140px" :rules="rules" center>
                <el-form-item label="Application Name:" required prop="applicationName">
                    <el-input size="mini" maxlength="50"  v-model="form.applicationName"/>
                </el-form-item>
                <el-form-item label="Application Icon:" required>
                    <el-upload
                            class="upload-demo"
                            action="#"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :before-upload="beforeAvatarUpload"
                            list-type="picture">
                        <el-button v-model="form.applicationIcon" size="mini" type="success">{{$t('Class.upload')}}</el-button>
                        <div style="color: red;" slot="tip" class="el-upload__tip">Note: Only jpg / jpeg / png / bmp files can be uploaded, the picture ratio is 1: 1 and no more than 1M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="ShowFlag:" required prop="showFlag">
                    <el-radio-group v-model="form.showFlag">
                        <el-radio :label="1">Show</el-radio>
                        <el-radio :label="0">Hide</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Sort:" required prop="seq">
                    <el-input size="mini" maxlength="8"  v-model="form.seq"/>
                </el-form-item>
                <type-to-url ref="typeToUrl"/>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>Submit</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>Cancel</el-button>
      </span>
        </el-dialog>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation  ref="operation"/>
        <myImg  ref="myImg"/>
        <mainUpload  ref="mainUpload"/>
    </div>
</template>
<script>
    import {eventBus} from "@/scripts/utils/BUS";
    import urls from "@/scripts/api";
    import myImg from "@/component/myImg.vue";
    import mainUpload from "@/component/mainUpload.vue";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";
    import TypeToUrl from "@/component/EnglishTypeToUrl.vue";

    export default {
        components: {
            pagination,
            TypeToUrl,
            operation,
            myImg,
            mainUpload
        },
        data() {
            return {
                eventBusUpload_bus:'Application_eventBusUpload_bus',
                fileList:[],
                //--------------need to edit
                list_url:urls.platformAppThirdApplication_list,
                create_url:urls.platformAppThirdApplication_create,
                update_url:urls.platformAppThirdApplication_update,
                delete_url:urls.platformAppThirdApplication_delete,
                eventBus:'platformAppThirdApplication_eventBus',
                editTitle:"Edit",
                addTitle:"Add",
                idType:'applicationId',
                usePagination:true,
                rules: {
                    applicationName: [
                        {required: true, message: "Please enter the application name"},
                    ],
                    showFlag: [
                        {required: true, message: "Please choose whether to show"}
                    ],
                    seq: [
                        {required: true, message: "Please enter the serial number"}
                    ]
                },
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
                        this.form.seq = val.seq.replace(/\D/g,'');
                    }catch (e) {

                    }
                },
                deep: true //true 深度监听
            }
        },

        mounted() {
            eventBus.$on(this.eventBusUpload_bus, (businessUrl) => {
                let files = [];
                let url = this.$url.oss_url+businessUrl;
                let myImg = {
                    name:this.fileName,
                    url:url
                };
                files.push(myImg);
                this.fileList = files;
                this.form.applicationIcon = businessUrl;
                console.log(businessUrl);
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
            openPic(url) {
                if (url == '' || url == null){
                    this.$alert('No icon', '', {
                        confirmButtonText: 'OK'
                    });
                    return false
                }
                this.$refs.myImg.isDialogShow(url, 'Application icon');
            },
            handleRemove(file, fileList) {
                this.form.applicationIcon = null;
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

            reset(){
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },

            doDelete(id) {
                this.$refs.operation.$DeleteById(this.delete_url, id, this.eventBus,this.idType);
            },

            noPageQuery() {
                this.listLoading = true;
                this.$refs.operation.$noPageQuery(this.list_url, this.eventBus);
            },

            query() {
                this.listLoading = true;
                this.$refs.pagination.$query(this.list_url, this.searchForm, this.eventBus);
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
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));

                let files = [];
                let logos = this.form.applicationIcon.split('/');
                let name = logos[logos.length-1];
                let url = this.$url.oss_url+this.form.applicationIcon;
                let myImg = {
                    name:name,
                    url:url
                };
                files.push(myImg)
                this.fileList = files;

                this.isShowDialog();
                this.$nextTick(()=>{
                    this.$refs.typeToUrl.update(this.form);
                })
            },

            //Add with the editor go this method
            async confirmData() {
                let url;
                let text = "Added successfully！";
                if (this.isEdit) {
                    text = "Edit successfully！";
                    url = this.update_url;
                } else {
                    url = this.create_url;
                }
                await this.$refs.typeToUrl.check(this.form).then(agrs => {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            if (this.form.applicationIcon==null){
                                this.$alert('Please upload app icon', '', {
                                    confirmButtonText: 'OK'
                                });
                                return false
                            }
                            if (agrs){
                                this.$refs.operation.$confirmData(url, this.form, text, this.eventBus);
                            }
                        } else {
                            return false;
                        }
                    });
                })

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
