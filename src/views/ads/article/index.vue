<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.title"
                        :placeholder="$t('Article.title')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.author"
                        :placeholder="$t('Article.Author')"
                        class="searchbox"
                />

                <el-select
                        size="mini"
                        v-model="searchForm.articleStatus"
                        :placeholder="$t('Article.status')"
                        class="searchbox"
                >
                    <el-option
                            size="mini"
                            v-for="item in STATUS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>
                <el-date-picker style="width: 240px"
                                size="mini"
                                class="searchbox"
                                v-model="searchForm.times"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                :range-separator="$t('seller.To')"
                                :start-placeholder="$t('seller.start_time')"
                                :end-placeholder="$t('seller.End_time')"
                                align="right"
                />
                <el-button
                        size="mini"
                        type="primary" style="height: 30px;margin-top: 14px;"
                        @click="query"
                >
                    <i class="el-icon-search"/>
                    {{$t('seller.search')}}</el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('seller.Reset')}}</el-button
                >
            </div>
        </div>
        <div id="expressage" style="height: 60px;">
            <div class="headbox">
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 14px;margin-left: 15px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    {{$t('Article.Add')}}
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
            <el-table-column :label="$t('Article.title')" sortable prop="title" width="200">
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                    <span size="medium">{{ scope.row.title}}</span>
                </div>
            </template>
        </el-table-column>
            <el-table-column :label="$t('Article.Author')" sortable prop="author" width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.author }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Article.time')" sortable prop="publishTime" width="200" >
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{scope.row.publishTime}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Article.Cover')" sortable prop="cover" width="150">
                <template slot-scope="scope">
                    <el-link v-if="scope.row.cover" type="primary" @click="openPic(scope.row.cover)">{{$t('Article.View')}}</el-link>
                </template>
            </el-table-column >
            <el-table-column :label="$t('Article.text')" sortable prop="des" width="500">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.des }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Article.Status')" sortable prop="articleStatus" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ Status(scope.row.articleStatus)}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Article.content')" sortable prop="content">
                <template slot-scope="scope">
                   <el-link type="primary" @click="openAtical(scope.row)" >{{$t('Article.preview')}}</el-link>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('Article.operation')"  width="220">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    ><i class="el-icon-edit"/>
                        {{$t('Article.edit')}}</el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('Article.OK')"
                            :cancelButtonText="$t('Article.Cancel')"
                            Theme="el-Theme-info"
                            ThemeColor="red"
                            :title="$t('Article.sure')"
                            @onConfirm="doDelete(scope.row.articleId)"
                    >
                        <el-button style="margin-left: 10px"
                                   slot="reference"
                                   size="mini"
                                   type="danger"
                                   v-if="$platformRole==1"
                        >  <i class="el-icon-delete"/>
                            {{$t('Article.Delete')}}</el-button
                        >
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--add-->
        <el-dialog :visible.sync="isShow" width="950px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="130px" :rules="rules" center>
                <el-form-item :label="$t('Article.Title')" required prop="title">
                    <el-input size="mini" maxlength="50"  v-model="form.title"/>
                </el-form-item>
                <el-form-item :label="$t('Article.author')" required prop="author">
                    <el-input size="mini" maxlength="50"  v-model="form.author"/>
                </el-form-item>
                <el-form-item :label="$t('Article.issuing')" required prop="publishTime">
                    <el-date-picker
                            size="mini"
                            v-model="form.publishTime"
                            type="datetime"
                            :placeholder="$t('Article.select')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('Article.cover')" >
                    <el-upload
                            size="mini"
                            class="upload-demo"
                            action="#"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :before-upload="beforeAvatarUpload"
                            list-type="picture">
                        <el-button v-model="form.cover" size="mini" type="success">{{$t('Class.upload')}}</el-button>
                    </el-upload>
                    <div style="color: red;" class="el-upload__tip">{{$t('Article.Note')}}
                    </div>
                </el-form-item>
                <el-form-item :label="$t('Article.one')"  >
                    <el-input size="mini" type="textarea" resize="none" :rows="6" maxlength="300"  show-word-limit v-model="form.des"/>
                </el-form-item>
                <el-form-item :label="$t('Article.state')" required prop="articleStatus">
                    <el-radio-group v-model="form.articleStatus">
                        <el-radio :label="1">{{$t('Article.release')}}</el-radio>
                        <el-radio :label="0">{{$t('Article.Unpublished')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('Article.content')" required >
                    <wangEnduit v-model="form.content" :isClear="false"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-Theme-check"></i>{{$t('Article.submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-Theme-close"></i>{{$t('Article.Cancel')}}</el-button>
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
    </div>
</template>
<script>
    import Moment from "moment";
    import myImg from "@/component/myImg.vue";
    import wangEnduit from "@/component/wangEnduit.vue";
    import mainUpload from "@/component/mainUpload.vue";
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
            operation
        },
        data() {
            return {
                STATUS : [
                    {
                        label:this.$t('Article.release'),
                        value:0
                    },
                    {
                        label:this.$t('Article.Unpublished'),
                        value:1
                    },

                ],
                pickerOptions: {
                    shortcuts: [
                        {
                            text: this.$t('seller.Last_week'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('seller.Last_month'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('seller.Last_three_months'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                eventBusUpload_bus:'article_eventBusUpload_bus',
                fileList:[],
                //--------------need to edit
                list_url:urls.article_list,
                create_url:urls.article_create,
                update_url:urls.article_update,
                delete_url:urls.article_delete,
                eventBus:'article_eventBus',
                editTitle:this.$t('Article.Edit'),
                addTitle:this.$t('Article.New'),
                idType:'articleId',
                usePagination:true,
                rules: {
                    title: [
                        {required: true, message: this.$t('Article.input_Title')},
                    ],
                    author: [
                        {required: true, message: this.$t('Article.enter')},
                    ],
                    publishTime: [
                        {required: true, message: this.$t('Article.publication')}
                    ],
                    articleStatus: [
                        {required: true, message: this.$t('Article.Please')}
                    ]
                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {articleStatus:1},
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
                this.form.cover = businessUrl;
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
                return {1: this.$t('Article.release'), 0: this.$t('Article.Unpublished')}[x]
            },
            openAtical(content){
                let routeData = this.$router.resolve({
                    path: "/h5",
                    query: {
                        content:content.content
                    }
                });
                window.open(routeData.href, '_blank ',content.publishTime);
            },
            openPic(url) {
                let image = this.$t('Article.image')
                if (url == '' || url == null){
                    this.$alert(image, '', {
                        confirmButtonText: this.$t('Article.OK')
                    });
                    return false
                }
                this.$refs.myImg.isDialogShow(url, this.$t('Article.Cover'));
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
                this.form.cover = null;
            },
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

            // query() {
            //     this.listLoading = true;
            //     this.$refs.pagination.$query(this.list_url, this.searchForm, this.eventBus);
            // },

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
                this.fileList=[];
                this.title = this.editTitle;
                this.form = JSON.parse(JSON.stringify(row));
                if (this.form.cover != '') {
                    let files = [];
                    let logos = this.form.cover.split('/');
                    let name = logos[logos.length-1];
                    let url = this.$url.oss_url+this.form.cover;
                    let myImg = {
                        name:name,
                        url:url
                    };
                    files.push(myImg)
                    this.fileList = files;
                }
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.form.content = decodeURIComponent(this.form.content);
                this.isShowDialog();

            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = this.$t('Article.New_Successful');
                if (this.isEdit) {
                    text = this.$t('Article.Edit_Successful');
                    url = this.update_url;
                } else {
                    url = this.create_url;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let upload = this.$t('Article.upload');
                        if (this.form.des == null && this.form.cover==null){
                            this.$alert(upload, '', {
                                confirmButtonText: this.$t('Article.OK')
                            });
                            return false
                        }
                        if (this.form.content == undefined){
                            let fill = this.$t('Article.fill');
                            this.$alert(fill, '', {
                                confirmButtonText: this.$t('Article.OK'),
                            });
                            return false
                        }
                         let form = JSON.parse(JSON.stringify(this.form));
                             form.content = encodeURIComponent(form.content);
                        form.publishTime = Moment(form.publishTime).format("YYYY-MM-DD HH:mm:ss");
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
