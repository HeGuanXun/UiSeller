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
            <el-table-column label="Theme Name" sortable prop="themeName" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.themeName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Theme Flag" sortable prop="themeFlag" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.themeFlag }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Whether to show" sortable prop="showFlag" width="" >
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ $ifShow[scope.row.showFlag].label}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Theme Light" sortable prop="lightColor" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper" style="font-size: xx-large">
                        <span :style="{backgroundColor:scope.row.lightColor}">______</span>
                    </div>
                </template>
            </el-table-column >
            <el-table-column label="Theme Neutral" sortable prop="baseColor" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper" style="font-size: xx-large">
                        <span :style="{backgroundColor:scope.row.baseColor}">______</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Theme Dark" sortable prop="deepColor" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper" style="font-size: xx-large">
                        <span :style="{backgroundColor:scope.row.deepColor}">______</span>
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
                            @onConfirm="doDelete(scope.row.themeId)"
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
        <el-dialog :visible.sync="isShow" width="500px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="130px" :rules="rules" center>
                <el-form-item label="Theme Name:" required prop="themeName">
                    <el-input size="mini" maxlength="50"  v-model="form.themeName"/>
                </el-form-item>
                <el-form-item label="Theme Flag:" required prop="themeFlag">
                    <el-input size="mini" maxlength="8z "  v-model="form.themeFlag"/>
                </el-form-item>
                <el-form-item label="Whether:" required prop="showFlag">
                    <el-radio-group v-model="form.showFlag">
                        <el-radio :label="1">Show</el-radio>
                        <el-radio :label="0">Hide</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Theme Light:" required prop="lightColor">
                    <!--<el-input size="mini" maxlength="50" v-model="form.lightColor"/>-->
                    <el-color-picker maxlength="50" v-model="form.lightColor"/>
                </el-form-item>
                <el-form-item label="Theme Neutral:" required prop="baseColor">
                    <el-color-picker maxlength="50" v-model="form.baseColor"/>
                </el-form-item>
                <el-form-item label="Theme Dark:" required prop="deepColor">
                    <el-color-picker maxlength="50" v-model="form.deepColor"/>
                </el-form-item>
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
    </div>
</template>
<script>
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
                //--------------need to edit
                list_url:urls.platformAppTheme_list,
                create_url:urls.platformAppTheme_create,
                update_url:urls.platformAppTheme_update,
                delete_url:urls.platformAppTheme_delete,
                eventBus:'Theme_eventBus',
                editTitle:"Edit theme colors",
                addTitle:"New theme color",
                idType:'themeId',
                usePagination:true,
                rules: {
                    themeName: [
                        {required: true, message: "Please enter the subject name"},
                    ],
                    themeFlag: [
                        {required: true, message: "Please enter the subject logo description"},
                    ],
                    showFlag: [
                        {required: true, message: "Please choose whether to show"}
                    ],
                    lightColor: [
                        {required: true, message: "Please enter a light theme"}
                    ],
                    baseColor: [
                        {required: true, message: "Please enter the theme color"}
                    ],
                    deepColor: [
                        {required: true, message: "Please enter the theme dark"}
                    ]
                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {
                    lightColor:'#409EFF'
                },
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
                        this.form.themeFlag = val.themeFlag.replace(/\D/g,'');
                    }catch (e) {

                    }
                },
                deep: true //true 深度监听
            }
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
            eventBus.$off(this.eventBus)
        },

        methods: {

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
                        this.$refs.form.clearValidate()
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
                this.isShowDialog();
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = "Added successfully！";
                if (this.isEdit) {
                    text = "Edit successfully！";
                    url = this.update_url;
                } else {
                    url = this.create_url;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$refs.operation.$ConfirmData(url, this.form, text, this.eventBus);
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
