<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.buyerId"
                        :placeholder="$t('trees.phone')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.parentId"
                        :placeholder="$t('trees.previous')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.grandPaId"
                        :placeholder="$t('trees.superior')"
                        class="searchbox"
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
            <el-table-column :label="$t('trees.user')" sortable prop="userNameStr">
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                    <span size="medium">{{ scope.row.buyerPhoneStr}}</span>
                </div>
            </template>
        </el-table-column>
            <el-table-column :label="$t('trees.Referrer')" sortable prop="parentStr">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.parentStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('trees.referrer')" sortable prop="grandPaStr">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{scope.row.grandPaStr}}</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation  ref="operation"/>
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
            operation
        },
        data() {
            return {
                eventBusUpload_bus:'trees_eventBusUpload_bus',
                fileList:[],
                //--------------need to edit
                list_url:urls.promotionTrees_list,
                eventBus:'trees_eventBus',
                idType:'treesId',
                usePagination:true,
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {treesStatus:1},
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
            };
        },

        mounted() {
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
                let url = this.$url.h5+"?content="+content;
                window.open(url,'_blank');
            },
            openPic(url) {
                if (url == '' || url == null){
                    this.$alert('暂无封面图', '', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                this.$refs.myImg.isDialogShow(url, '封面图');
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
                this.title = this.editTitle;
                this.form.cover = decodeURIComponent(this.form.cover);
                this.form = JSON.parse(JSON.stringify(row));
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
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.form.content = decodeURIComponent(this.form.content);
                this.isShowDialog();

            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = "新增成功！";
                if (this.isEdit) {
                    text = "编辑成功！";
                    url = this.update_url;
                } else {
                    url = this.create_url;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.form.des == null && this.form.cover==null){
                            this.$alert('请上传封面图或者填写第一段文本', '', {
                                confirmButtonText: '确定'
                            });
                            return false
                        }
                        if (this.form.content == undefined){
                            this.$alert('请填写文章内容', '', {
                                confirmButtonText: '确定',
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
