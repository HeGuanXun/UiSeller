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
                    {{$t('account.add')}}
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
                  v-loading="listLoading">
            <el-table-column
                    label="ID"
                    type="index"
                    width="55"/>
            <el-table-column :label="$t('account.name')" width="120">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.platformBankAccountOwner }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('account.Account_number')" width="120">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.platformBankAccountNum }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('account.Account_opening_bank')"  prop="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.platformBank }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('account.Account_bank')">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.platformBankBranch }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('account.Account_function')">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.platformBankAccountFunction }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('account.Account_type')">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.platformBankAccountType }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('account.operation')"  width="220">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    ><i class="el-icon-edit"/>
                        {{$t('account.edit')}}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!-- table -->

        <!--add-->
        <el-dialog :visible.sync="isShow" width="25%"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="130px" :rules="rules" center>
                <el-form-item :label="$t('account.Name')" required prop="platformBankAccountOwner">
                    <el-input size="mini" maxlength="10"  v-model="form.platformBankAccountOwner"></el-input>
                </el-form-item>
                <el-form-item :label="$t('account.Number')" required prop="platformBankAccountNum">
                    <el-input size="mini" maxlength="25" v-model="form.platformBankAccountNum"></el-input>
                </el-form-item>
                <el-form-item :label="$t('account.opening_bank')" required prop="platformBank">
                    <el-input size="mini" maxlength="10"  v-model="form.platformBank"></el-input>
                </el-form-item>
                <el-form-item :label="$t('account.bank')" required prop="platformBankBranch">
                    <el-input size="mini" maxlength="20" v-model="form.platformBankBranch"></el-input>
                </el-form-item>
                <el-form-item :label="$t('account.function')" required prop="platformBankAccountFunction">
                    <el-input size="mini" maxlength="10"  v-model="form.platformBankAccountFunction"></el-input>
                </el-form-item>
                <el-form-item :label="$t('account.type')" required prop="platformBankAccountType">
                    <el-input size="mini" maxlength="15" v-model="form.platformBankAccountType"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('account.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('account.cancel')}}</el-button>
      </span>
        </el-dialog>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation  ref="operation"/>
    </div>
</template>
<script>
    import {eventBus} from "scripts/utils/BUS";
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
                listUrl:urls.bankAccounts_list,
                createUrl:urls.bankAccounts_create,
                updateUrl:urls.bankAccounts_create,
                //deleteUrl:urls.bankAccounts_delete,
                eventBus:'bankAccounts_eventBus',
                editTitle:this.$t('account.Edit'),
                addTitle:this.$t('account.Add'),
                idType:'platformBankAccountId',
                usePagination:true,
                rules: {
                    platformBankAccountOwner: [
                        {required: true, message: this.$t('account.Input')},
                        {required: true, message: this.$t('account.open'),max:20}
                    ],
                    platformBankAccountNum: [
                        {required: true, message: this.$t('account.pless')},
                        {required: true, message: this.$t('account.figure'),validator:isNaN_}
                    ],
                    platformBank: [
                        {required: true, message: this.$t('account.accounts')}
                    ],
                    platformBankBranch: [
                        {required: true, message: this.$t('account.branch')}
                    ],
                    platformBankAccountFunction: [
                        {required: true, message: this.$t('account.Function')}
                    ],
                    platformBankAccountType: [
                        {required: true, message: this.$t('account.Type'),max:15}
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
            };
        },

        mounted() {
            eventBus.$on(this.eventBus, (tableData) => {
                if (tableData) {
                    this.listLoading = false;
                    this.tableData = tableData;
                } else {
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
                this.$refs.operation.$deleteById(this.deleteUrl, id, this.eventBus);
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

            toEdit(row) {
                this.title = this.editTitle;
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.isShowDialog();
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = this.$t('mployee.New_success');
                if (this.isEdit) {
                    text = this.$t('mployee.Editorial_success');
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                this.isEdit = false;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // let str = this.form.platformBankAccountType
                        // if (!this.isRealNum(str)){
                        //   this.$alert('账户类型只能是数字', '', {
                        //     confirmButtonText: '确定',
                        //   });
                        //   return false;
                        // }
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
