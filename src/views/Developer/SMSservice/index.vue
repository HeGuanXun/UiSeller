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
        <!-- search -->

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
            <el-table-column label="MessageCode" sortable prop="messageCode" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.messageCode }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Region"  sortable prop="region" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.region}}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="AccessKeyId" sortable prop="accessKeyId" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.accessKeyId}}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="AccessSecret" sortable prop="accessSecret" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.accessSecret }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Sign" sortable prop="sign" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.sign }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Template" sortable prop="template" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.template}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Endpoint" sortable prop="endpoint" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.endpoint }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="ApiVersion" sortable prop="apiVersion">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.apiVersion }}</span>
                    </div>
                </template>
            </el-table-column>

<!--            <el-table-column label="Status"  prop="" width="170">-->
<!--                <template slot-scope="scope">-->
<!--                    <div slot="reference" class="name-wrapper">-->
<!--                        <div>{{Status[scope.row.status].label }}</div>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </el-table-column>-->

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

                    <el-popconfirm
                            confirmButtonText="OK"
                            cancelButtonText="Cancel"
                            icon="el-icon-info"
                            iconColor="red"
                            title="Delete or not？"
                            @onConfirm="doDelete(scope.row.messageId)"
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
        <!-- table -->

        <!--add-->
        <el-dialog :visible.sync="isShow" width="500px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="130px" :rules="rules" center>
                <el-form-item label="MessageCode" required prop="messageCode">
                    <el-input size="mini" maxlength="10" :disabled="isEdit" v-model="form.messageCode"></el-input>
                </el-form-item>


                <el-form-item label="region" required prop="region">
                    <el-input size="mini" maxlength="25" v-model="form.region" placeholder="Please enter region"></el-input>
                </el-form-item>



                <el-form-item label="AccessKeyId" required prop="accessKeyId">
                    <el-input size="mini" maxlength="20" v-model="form.accessKeyId"></el-input>
                </el-form-item>

                <el-form-item label="AccessSecret" required prop="accessSecret">
                    <el-input size="mini" maxlength="25" v-model="form.accessSecret "></el-input>
                </el-form-item>

                <el-form-item label="Sign" required prop="sign">
                    <el-input size="mini" maxlength="10"  v-model="form.sign"></el-input>
                </el-form-item>

                <el-form-item label="Template" required prop="template">
                    <el-input size="mini" maxlength="10"  v-model="form.template"></el-input>
                </el-form-item>
                <el-form-item label="Endpoint" required prop="endpoint">
                    <el-input size="mini" maxlength="10"  v-model="form.endpoint"></el-input>
                </el-form-item>
                <el-form-item label="ApiVersion" required prop="apiVersion">
                    <el-input size="mini" maxlength="10"  v-model="form.apiVersion"></el-input>
                </el-form-item>

                <el-form-item label="Status" required prop="status">
                    <el-radio v-model="form.status" label="0"> Enable</el-radio>
                    <el-radio v-model="form.status" label="1">Disable</el-radio>
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
            const isNaN_ = (rule, value, callback) => {
                let account = this.$t('account.numCompany');
                if (value.toString().indexOf('.')!= -1){
                    callback(new Error(account))
                }
                if (isNaN(value)) {
                    callback(new Error(""))
                } else {
                    callback()
                }
            }
            return {
                //--------------need to edit
                listUrl:urls.SMS_list,
                createUrl:urls.SMS_create,
                deleteUrl:urls.SMS_delete,
                updateUrl:urls.SMS_update,
                eventBus:'SMS_eventBus',
                editTitle:"Edit SMS",
                addTitle:"Add SMS",
                idType:'messageId',
                usePagination:true,
                rules: {
                    messageCode: [
                        {required: true, message: "Please enter messageCode"},
                    ],
                    region: [
                        {required: true, message: "Please select region"},
                    ],
                    accessKeyId: [
                        {required: true, message: "Please enter accessKeyId"}
                    ],
                    accessSecret: [
                        {required: true, message: "Please enter accessSecret"}
                    ],
                    sign: [
                        {required: true, message: "Please enter sign"}
                    ],
                    template: [
                        {required: true, message: "Please enter template"}
                    ],
                    endpoint: [
                        {required: true, message: "Please enter endpoint"}
                    ],
                    apiVersion: [
                        {required: true, message: "Please enter apiVersion"}
                    ],
                    status: [
                        {required: true, message: "Please select status"}
                    ],
                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {},
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
                Status : [
                    {
                        value: 0,
                        label: "Enable"
                    },
                    {
                        value: 1,
                        label: "Disable"
                    }
                ],
                region:[
                    {
                        value: 0,
                        label: "国内"
                    },
                    {
                        value: 1,
                        label: "国际"
                    }
                ],
            };
        },
        watch: {
            form:{
                handler(val,oldVal) {
                    try{
                        this.form.messageCode = val.messageCode.replace(/\D/g,'');
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
                    this.usePagination ? this.query() : this.noPageQuery();
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
                this.$refs.operation.$DeleteById(this.deleteUrl, id, this.eventBus,this.idType);
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
                this.form.status = this.form.status.toString();
                console.log(this.form);
                this.isShowDialog();
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = "新增成功！";
                if (this.isEdit) {
                    text = "编辑成功！";
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$refs.operation.$confirmData(url, this.form, text, this.eventBus);
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
