<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 50px;margin-left: 10px;">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.username"
                        :placeholder="$t('mployee.VIP_name')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.platformPhone"
                        :placeholder="$t('mployee.phone')"
                        class="searchbox"
                />
                <el-button
                        size="mini"
                        type="primary" style="height: 30px;margin-top: 14px;"
                        @click="query"
                >
                    <i class="el-icon-search"/>
                    {{$t('mployee.search')}}
                </el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('mployee.Reset')}}
                </el-button
                >
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 14px;margin-left: 15px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    {{$t('mployee.add')}}
                </el-button
                >
            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px;margin-top: 15px;"
                  ref="listPowerSupplyTab"
                  :data="tableData"
                  border
                  highlight-current-row
                  :stripe="true"
                  v-loading="listLoading"
                  :default-sort = "{prop: 'data', order: 'descending'}">
            <el-table-column
                    fixed
                    label="ID"
                    type="index"
                    width="50"/>
            <el-table-column :label="$t('mployee.VIP_name')" sortable prop="username" width="240">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.username }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('mployee.phone')" sortable prop="platformPhone"  width="240">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.platformPhone }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('mployee.mailbox')" sortable prop="platformEmail" width="240">
                <template slot-scope="scope">
                    <span size="medium">{{ scope.row.platformEmail }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('mployee.role')" sortable prop="platformRole" width="240">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <div>{{ROLE_[scope.row.platformRole] }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('mployee.state')" sortable prop="status" width="240">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <div>{{$platform_user_status[scope.row.status-1].label }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('mployee.Creation_time')" sortable prop="createTime" width="240">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.createTime }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('mployee.operation')" width="380">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    >
                        <i class="el-icon-edit"/>
                        {{$t('mployee.Edit')}}
                    </el-button
                    >
                    <el-button
                            v-if="scope.row.status===2"
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="doHide(scope.row.platformId,'show')"
                    >
                        <i class="el-icon-success"/>
                        {{$t('mployee.Enable')}}
                    </el-button
                    >
                    <el-button
                            v-else
                            style="margin-left: 10px"
                            size="mini"
                            type="danger" plain
                            @click="doHide(scope.row.platformId,'hide')"
                    >
                        <i class="el-icon-error"/>
                        {{$t('mployee.Disable')}}
                    </el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('mployee.Determine')"
                            :cancelButtonText="$t('mployee.Cancel')"
                            icon="el-icon-info"
                            iconColor="red"
                            :title="$t('mployee.ss')"
                            @onConfirm="doDelete(scope.row.platformId)"
                    >
                        <el-button style="margin-left: 10px"
                                   slot="reference"
                                   size="mini"
                                   v-if="$platformRole==1"
                                   type="danger"
                        ><i class="el-icon-delete"/>
                            {{$t('mployee.delete')}}
                        </el-button
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
            <el-form ref="form" :model="form" label-width="155px" :rules="rules" center>
                <el-form-item  :label="$t('mployee.password')" required prop="platformPassword">
                    <el-input size="mini" :disabled="isEdit" type="password" maxlength="128" v-model="form.platformPassword"/>
                </el-form-item>
                <el-form-item v-if="isEdit" :label="$t('mployee.Reset_password')">
                    <el-input size="mini" type="password" maxlength="128" v-model="form.platformPassword"/>
                </el-form-item>
                <el-form-item v-if="isEdit" :label="$t('mployee.Determine_password')">
                    <el-input size="mini" type="password" maxlength="128" v-model="form.platformPasswordN"/>
                </el-form-item>
                <el-form-item :label="$t('mployee.Phone')" required prop="platformPhone">
                    <el-input size="mini" maxlength="20" v-model="form.platformPhone" onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
                </el-form-item>
                <el-form-item :label="$t('mployee.Mailbox')">
                    <el-input size="mini" maxlength="30" v-model="form.platformEmail"/>
                </el-form-item>
                <el-form-item :label="$t('mployee.Role')" required prop="platformRole">
                    <el-select v-model="form.platformRole" :placeholder="$t('mployee.roles')" size="mini">
                        <el-option
                                size="mini"
                                v-for="(item,index) of ROLE"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i
                class="el-icon-check"></i>{{$t('currency.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('currency.cancel')}}</el-button>
      </span>
        </el-dialog>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation ref="operation"/>
    </div>
</template>
<script>
    import {eventBus} from "scripts/utils/BUS";
    import urls from "@/scripts/api";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";
    import {validateMobile, validateEmail} from "scripts/utils/rule"
    import qs from "qs";

    export default {
        components: {
            pagination,
            operation
        },
        data() {
            // ddefine
            let aa = this.$t('mployee.input')
            let bb = this.$t('mployee.Phon')
            let cc = this.$t('mployee.Sure')
            // ddefine
            var validatePass = (rule, value, callback) => {
                if (value === '' || value == 'undefined') {
                    callback(new Error(aa, ''));
                } else {
                    callback();
                }
            };
            const checkMobile = (rule, value, callback) => {
                if (!validateMobile(value)) {
                    callback(new Error(bb, ''))
                } else {
                    callback()
                }
            };
            const checkEmail = (rule, value, callback) => {
                if (!validateEmail(value)) {
                    //"请填写正确的邮箱!"
                    callback(new Error(cc, ''))
                } else {
                    callback()
                }
            }
            return {
                //--------------need to edit
                listUrl: urls.user_list,
                reviewUrl: urls.user_review,
                createUrl: urls.user_create,
                updateUrl: urls.user_update,
                hideUrl: urls.user_create,
                deleteUrl: urls.user_delete,
                eventBus: 'user_eventBus',
                editTitle: this.$t('mployee.Edit'),
                addTitle: this.$t('mployee.Add'),
                idType: 'platformId',
                usePagination: true,
                rules: {
                    platformPassword: [
                        {
                            required: true,
                            message: this.$t('mployee.six'),
                            min: 6
                        },
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    platformPhone: [
                        {
                            required: true,
                            message: this.$t('mployee.fill')
                        },
                        {validator: checkMobile, trigger: "blur"},
                    ],
                    platformRole: [
                        {required: true, message: this.$t('mployee.roles')}
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
                ROLE_:{
                    1:this.$t('mployee.Super'),
                    2:this.$t('mployee.Administrator'),
                    3:this.$t('mployee.Reviewer'),
                    4:this.$t('mployee.Service'),
                    5:this.$t('mployee.Finance'),
                    6:this.$t('mployee.Comment_Manager'),
                    7:this.$t('mployee.Developer'),
                    21:this.$t('mployee.Commodity_review_board'),
                    31:this.$t('mployee.Exchange_admin'),
                    41:this.$t('mployee.Bonus_system_admin'),
                    51:this.$t('mployee.C2C_transaction_admin')
                },
                ROLE: [
                    {
                        value: 1,
                        label: this.$t('mployee.Super')
                    },
                    {
                        value: 2,
                        label: this.$t('mployee.Administrator')
                    },
                    {
                        value: 3,
                        label: this.$t('mployee.Reviewer')
                    },
                    {
                        value: 4,
                        label: this.$t('mployee.Service')
                    },
                    {
                        value: 5,
                        label: this.$t('mployee.Finance')
                    },
                    {
                        value: 6,
                        label: this.$t('mployee.Comment_Manager')
                    },
                    {
                        value: 7,
                        label: this.$t('mployee.Developer')
                    },
                    {
                        value: 21,
                        label: this.$t('mployee.Commodity_review_board')
                    },
                    {
                        value: 31,
                        label: this.$t('mployee.Exchange_admin')
                    },
                    {
                        value: 41,
                        label: this.$t('mployee.Bonus_system_admin')
                    },
                    {
                        value: 51,
                        label: this.$t('mployee.C2C_transaction_admin')
                    }
                ],
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
                this.isEdit = false;
            });
            //Whether or not to use paging queries
            this.usePagination ? this.query() : this.noPageQuery();
        },
        watch: {
            form(newValue, oldValue) {
                console.log(newValue.platformPassword);
            }
        },
        beforeDestroy() {
            eventBus.$off(this.eventBus)
        },
        methods: {
            doHide(id, type) {
                let text = this.$t('mployee.Enabled_success');
                let status = 1;
                if (type === 'hide') {
                    status = 2;
                    text = this.$t('mployee.Disabled_success')
                }
                let form = {"platformId": id, 'status': status}
                let data = qs.stringify(form, {indices: false});
                this.$axios.post(this.reviewUrl, data).then(res => {
                    this.$alert(text, '', {
                        confirmButtonText: this.$t('mployee.Determine'),
                        callback: () => {
                            this.query();
                        }
                    });
                });
            },
            reset() {
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },

            doDelete(id) {
                this.$refs.operation.$deleteById(this.deleteUrl, id, this.eventBus, this.idType);
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
                this.isEdit = false;
                this.form = {};
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                })
                this.isShowDialog();
            },

            isShowDialog() {
                this.isShow = this.isShow !== true;
            },

            toEdit(row) {
                this.title = this.editTitle;
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.form.platformPassword = '';
                this.isShowDialog();
            },

            //Add with the editor go this method
            confirmData() {
                // ddefine
                let a = this.$t('mployee.Less_Six')
                let b = this.$t('mployee.null')
                let c = this.$t('mployee.password')
                let d = this.$t('mployee.Sure')
                // ddefine
                if (this.isEdit && this.form.platformPassword.trim() != '') {
                    if (this.form.platformPassword.length < 6) {
                        this.$alert(a, '', {
                            confirmButtonText: this.$t('mployee.Determine')
                        });
                        return;
                    }
                    if (!this.form.platformPasswordN) {
                        this.$alert(b, '', {
                            confirmButtonText: this.$t('mployee.Determine')
                        });
                        return;
                    }
                    if (this.form.platformPasswordN !== this.form.platformPassword) {
                        this.$alert(c, '', {
                            confirmButtonText: this.$t('mployee.Determine')
                        });
                        return;
                    }
                }
                let url;
                let text = this.$t('mployee.New_success');
                if (this.isEdit) {
                    text = this.$t('mployee.Editorial_success');
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.form.platformEmail) {
                            let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                            if (!reg.test(this.form.platformEmail)) {
                                this.$alert(d, '', {
                                    confirmButtonText: this.$t('mployee.Determine'),
                                });
                                return false;
                            }
                        }
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
