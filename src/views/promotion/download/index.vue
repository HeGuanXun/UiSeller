<template>
    <div style="height: 100%;">
        <div id="expressage" style="height: 60px;">
            <div class="headbox">
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 14px;margin-left: 15px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    {{$t('download.Add')}}
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
            <el-table-column :label="$t('download.Client')" sortable prop="client" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ clients[scope.row.client-1].label}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('download.version')" sortable prop="version" width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.version }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('download.link')" sortable prop="downloadUrl">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{scope.row.downloadUrl}}</span>

                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('download.name')" sortable prop="appName" width="150">
                <template slot-scope="scope">
                    <span size="medium">{{scope.row.appName}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('download.method')" sortable prop="downloadSource" width="300">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ downloadSources[scope.row.downloadSource-1].label}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('download.operating')" width="220">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    ><i class="el-icon-edit"/>
                        {{$t('download.Edit')}}
                    </el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('download.OK')"
                            :cancelButtonText="$t('download.Cancel')"
                            Theme="el-Theme-info"
                            ThemeColor="red"
                            :title="$t('download.sure')"
                            @onConfirm="doDelete(scope.row.downloadId)"
                    >
                        <el-button style="margin-left: 10px"
                                   slot="reference"
                                   size="mini"
                                   type="danger"
                                   v-if="$platformRole==1"
                        ><i class="el-icon-delete"/>
                            {{$t('download.Delete')}}
                        </el-button
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
                <el-form-item :label="$t('download.client')" required prop="client">
                    <el-select v-model="form.client" :placeholder="$t('download.select')" size="mini">
                        <el-option
                                v-for="item in clients"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('download.Version')" required prop="version">
                    <el-input size="mini" maxlength="20" v-model="form.version"/>
                </el-form-item>
                <el-form-item :label="$t('download.Link')" required prop="downloadUrl">
                    <el-input size="mini" type="textarea" resize="none" :rows="6" maxlength="300"  show-word-limit v-model="form.downloadUrl"/>
                </el-form-item>
                <el-form-item :label="$t('download.Name')" required prop="appName">
                    <el-input size="mini" maxlength="300" v-model="form.appName"/>
                </el-form-item>
                <el-form-item :label="$t('download.Method')" required prop="downloadSource">
                    <el-select v-model="form.downloadSource" :placeholder="$t('download.Select')" size="mini">
                        <el-option
                                v-for="item in downloadSources"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('download.submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('download.Cancel')}}</el-button>
      </span>
        </el-dialog>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation ref="operation"/>
        <!--mainUpload component-->
        <mainUpload ref="mainUpload"/>
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
                eventBusUpload_bus: 'download_eventBusUpload_bus',
                fileList: [],
                //--------------need to edit
                list_url: urls.promotionDownload_list,
                create_url: urls.promotionDownload_create,
                update_url: urls.promotionDownload_update,
                delete_url: urls.promotionDownload_delete,
                eventBus: 'download_eventBus',
                editTitle: this.$t('download.edit'),
                addTitle: this.$t('download.New'),
                idType: 'downloadId',
                usePagination: true,
                rules: {
                    client: [
                        {required: true, message: this.$t('download.select_client'),trigger:'change'},
                    ],
                    version: [
                        {required: true, message: this.$t('download.input')},
                    ],
                    downloadUrl: [
                        {required: true, message: this.$t('download.download')}
                    ],
                    appName: [
                        {required: true, message: this.$t('download.input_app')}
                    ],
                    downloadSource: [
                        {required: true, message: this.$t('download.download_method'),trigger:'change'}
                    ]
                },
                clients: [
                    {
                        label: "IOS",
                        value: 1
                    },
                    {
                        label: "Android",
                        value: 2
                    },
                ],
                downloadSources: [
                    {
                        label: "AppStore",
                        value: 1
                    },
                    {
                        label: "Google Play",
                        value: 2
                    },
                    {
                        label: this.$t('download.directly'),
                        value: 3
                    },
                ],
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {downloadStatus: 1},
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
            };
        },

        watch: {
            form: {
                handler(val) {
                    try {
                        this.form.themeFlag = val.themeFlag.replace(/\D/g, '');
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
                let name = split[split.length - 1];
                let url = this.$url.oss_url + businessUrl;
                let myImg = {
                    name: this.fileName,
                    url: url
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

            reset() {
                this.searchForm = {};
                this.query()
            },

            query() {
                this.listLoading = true;
                this.$refs.pagination.$query(this.list_url, this.searchForm, this.eventBus);
            },

            doDelete(id) {
                this.$refs.operation.$deleteById(this.delete_url, id, this.eventBus, this.idType);
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
                this.isEdit = false,
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

            toEdit(row) {
                this.title = this.editTitle;
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.isShowDialog();
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = this.$t('download.added');
                if (this.isEdit) {
                    text = this.$t('download.Edit_successfully');
                    url = this.update_url;
                } else {
                    url = this.create_url;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
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
