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
                    {{$t('Menu.Add')}}
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
            <el-table-column :label="$t('Menu.image')"  sortable prop="menuIcon">
                <template slot-scope="scope">
                        <el-link v-if="scope.row.menuIcon" type="primary" @click="openPic(scope.row.menuIcon)">{{$t('Menu.View')}}</el-link>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Menu.name')" sortable prop="menuName">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.menuName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Menu.Whether')" sortable prop="showFlag" width="200" >
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ $ifShow[scope.row.showFlag].label}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Menu.Sort')" sortable prop="seq" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.seq }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.ActionType')" sortable prop="actionType" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{$type_options[scope.row.actionType-1].label }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.ActionUrl')" sortable prop="actionUrl" width="450">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.actionUrl }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('Menu.operation')"  width="220">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    ><i class="el-icon-edit"/>
                        {{$t('Menu.edit')}}</el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('Menu.OK')"
                            :cancelButtonText="$t('Menu.Cancel')"
                            Theme="el-Theme-info"
                            ThemeColor="red"
                            :title="$t('Menu.sure')"
                            @onConfirm="doDelete(scope.row.menuId)"
                    >
                        <el-button style="margin-left: 10px"
                                   slot="reference"
                                   size="mini"
                                   type="danger"
                                   v-if="$platformRole==1"
                        >  <i class="el-icon-delete"/>
                            {{$t('Menu.Delete')}}</el-button
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
            <el-form ref="form" :model="form" label-width="150px" :rules="rules" center>
                <el-form-item :label="$t('Menu.Image')" required prop="">
                    <el-upload
                            class="upload-demo"
                            action="#"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :before-upload="beforeAvatarUpload"
                            list-type="picture">
                        <el-button v-model="form.menuIcon" size="mini" type="success">{{$t('Class.upload')}}</el-button>
                    </el-upload>
<!--                    <div slot="tip" class="el-upload__tip">注:只能上传jpg/jpeg/png/bmp文件，图片比例1：1 且不超过1M</div>-->
                    <div style="color: red;" class="el-upload__tip">{{$t('Menu.Note')}}
                    </div>
                </el-form-item>
                <el-form-item :label="$t('Menu.Name')" required prop="menuName">
                    <el-input size="mini" maxlength="50"  v-model="form.menuName"/>
                </el-form-item>
                <el-form-item :label="$t('Menu.whether')" required prop="showFlag">
                    <el-radio-group v-model="form.showFlag">
                        <el-radio :label="1">{{$t('Menu.show')}}</el-radio>
                        <el-radio :label="0">{{$t('Menu.No')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('Menu.sort')" required prop="seq">
                    <el-input size="mini" maxlength="8"  v-model="form.seq"/>
                </el-form-item>
                <type-to-url ref="typeToUrl"/>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('Menu.submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('Menu.Cancel')}}</el-button>
      </span>
        </el-dialog>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation  ref="operation"/>
        <!--mainUpload component-->
        <mainUpload  ref="mainUpload"/>
        <myImg  ref="myImg"/>
    </div>
</template>
<script>
    import {eventBus} from "@/scripts/utils/BUS";
    import urls from "@/scripts/api";
    import myImg from "@/component/myImg.vue";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";
    import TypeToUrl from "@/component/TypeToUrl.vue";
    import mainUpload from "@/component/mainUpload.vue";

    export default {
        components: {
            pagination,
            TypeToUrl,
            mainUpload,
            operation,
            myImg
        },
        data() {
            return {
                //--------------need to edit
                list_url:urls.platformRolliMenu_list,
                create_url:urls.platformRolliMenu_create,
                update_url:urls.platformRolliMenu_update,
                delete_url:urls.platformRolliMenu_delete,
                eventBus:'platformRolliMenu_eventBus',
                eventBusUpload_bus:'eventBusUpload_bus',
                editTitle:this.$t('Menu.Edit'),
                addTitle:this.$t('Menu.New'),
                idType:'menuId',
                usePagination:true,
                fileList:[],
                rules: {
                    MenuIcon: [
                        {required: true, message: this.$t('Menu.upload')},
                    ],
                    menuName: [
                        {required: true, message: this.$t('Menu.enter')},
                    ],
                    showFlag: [
                        {required: true, message: this.$t('Menu.select')}
                    ],
                    seq: [
                        {required: true, message: this.$t('Menu.Please')}
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
                let split = businessUrl.split("/");
                let name = split[split.length-1];
                let url = this.$url.oss_url+businessUrl;
                let myImg = {
                    name:this.fileName,
                    url:url
                };
                files.push(myImg)
                this.fileList = files;
                this.form.menuIcon = businessUrl;
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
            beforeAvatarUpload(file) {
                this.fileName = file.name;
                // const file = this.$refs.businessUrl.files[0];
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
            openPic(url) {
                let picture = this.$t('Menu.picture');
                let Picture = this.$t('Menu.Picture')
                if (url == '' || url == null){
                    this.$alert(picture, '', {
                        confirmButtonText: this.$t('Menu.OK')
                    });
                    return false
                }
                this.$refs.myImg.isDialogShow(url, Picture,1);
            },

            handleRemove(file, fileList) {
                this.form.menuIcon = null;
            },
            reset(){
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },

            doDelete(id) {
                this.$refs.operation.$deleteById(this.delete_url, id, this.eventBus,this.idType);
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

            async isShowDialog() {
                this.isShow = this.isShow !== true;
            },

            toEdit(row){
                this.title = this.editTitle;
                this.form = JSON.parse(JSON.stringify(row));
                let files = [];
                let logos = this.form.menuIcon.split('/');
                let name = logos[logos.length-1];
                let url = this.$url.oss_url+this.form.menuIcon;
                let myImg = {
                    name:name,
                    url:url
                };
                files.push(myImg)
                this.fileList = files;
                this.isEdit = true;
                this.isShow = true;
                this.$nextTick(()=>{
                    this.$refs.typeToUrl.update(this.form);
                })
            },
            //Add with the editor go this method
            async confirmData() {
                let url;
                let text = this.$t('Menu.New_Successful');
                if (this.isEdit) {
                    text = this.$t('Menu.Edit_Successful');
                    url = this.update_url;
                } else {
                    url = this.create_url;
                }
                await this.$refs.typeToUrl.check(this.form).then(agrs => {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            if (agrs){
                                let fill = this.$t('Menu.fill');
                                if (this.form.menuIcon == undefined){
                                    this.$alert(fill, '', {
                                        confirmButtonText: this.$t('Menu.OK')
                                    });
                                    return false
                                }
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
