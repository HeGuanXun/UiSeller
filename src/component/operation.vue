<template >
</template>
<script>
    import Vue from "vue";
    import { eventBus } from "scripts/utils/BUS";
    import qs from 'qs';
    // eslint-disable-next-line no-irregular-whitespace
    export default {
        // eslint-disable-next-line no-irregular-whitespace
        data () {
            return {
                listLoading:false
            }
        },
        mounted(){

        },
        // eslint-disable-next-line no-irregular-whitespace
        methods: {

            //All delete by id  use this method
            $deleteById(url,id,bus,idType){
                let form = {};
                let str = "form." + idType + "=" + id;
                eval(str);
                for(let key  in form){
                    if (key.indexOf(idType)!=-1){
                        form[key] = id;
                        break;
                    }
                }
                let aa = this.$t('mployee.Delete_successful')
                let bb = this.$t('mployee.please')
                let data = qs.stringify(form, {indices: false});
                // eslint-disable-next-line no-unused-vars
                this.$axios.post(url,data).then(res => {
                    this.$alert(aa, '', {
                        confirmButtonText: this.$t('mployee.Determine'),
                        callback: () => {
                            //to bus
                            eventBus.$emit(bus);
                        }
                    });
                }).catch((e) => {
                    this.$alert(bb, '', {
                        confirmButtonText: this.$t('mployee.Determine'),
                    });
                    return false;
                });
            },
            $deleteById(url,id,bus,idType){
                let form = {};
                let str = "form." + idType + "=" + id;
                eval(str);
                for(let key  in form){
                    if (key.indexOf(idType)!=-1){
                        form[key] = id;
                        break;
                    }
                }
                let aa = this.$t('mployee.Delete_successful')
                let bb = this.$t('mployee.please')
                let data = qs.stringify(form, {indices: false});
                this.$axios.post(url,data).then(res => {
                    this.$alert(aa, '', {
                        confirmButtonText: this.$t('mployee.Determine'),
                        callback: () => {
                            //to bus
                            eventBus.$emit(bus);
                        }
                    });
                }).catch((e) => {
                    this.$alert(bb, '', {
                        confirmButtonText: this.$t('mployee.Determine'),
                    });
                    return false;
                });
            },
            $DeleteById(url,id,bus,idType){
                let form = {};
                let str = "form." + idType + "=" + id;
                eval(str);
                for(let key  in form){
                    if (key.indexOf(idType)!=-1){
                        form[key] = id;
                        break;
                    }
                }
                let aa = "Delete Successful"
                let bb = "Failed to delete, please contact the administrator"
                let data = qs.stringify(form, {indices: false});
                this.$axios.post(url,data).then(res => {
                    this.$alert(aa, '', {
                        confirmButtonText: "OK",
                        callback: () => {
                            //to bus
                            eventBus.$emit(bus);
                        }
                    });
                }).catch((e) => {
                        this.$alert(bb, '', {
                        confirmButtonText: "OK",
                    });
                    return false;
                });
            },

            //All no use page queries use this method
            $noPageQuery(url,bus){
                this.$axios.post(url,null).then(res => {
                    let tableData = res.data.data;
                    let data = res.data.data;
                    for(let key  in data){
                        if (key.indexOf('List')!=-1){
                            tableData =  tableData[key]
                            break;
                        }
                    }
                    //to bus
                    eventBus.$emit(bus,tableData);
                }).catch((e) => {
                    this.$alert('查询失败，请联系管理员', '', {
                        confirmButtonText: '确定',
                    });
                });
            },

            //All add or edit opertation use this methon
            $confirmData(url,form,text,bus){
                Vue.delete(form, 'createTime' );
                Vue.delete(form, 'createTIme' );
                Vue.delete(form, 'updateTime' );
                Vue.delete(form, 'updateTIme' );
                Vue.delete(form, 'createBy' );
                Vue.delete(form, 'updateBy' );
                let data = qs.stringify(form, {indices: false});
                this.$axios.post(url, data).then(res => {
                    this.$alert(text, '', {
                        confirmButtonText: this.$t('mployee.Determine'),
                        callback: () => {
                            eventBus.$emit(bus,null);
                        }
                    });
                });
            },
            $ConfirmData(url,form,text,bus){
                Vue.delete(form, 'createTime' );
                Vue.delete(form, 'createTIme' );
                Vue.delete(form, 'updateTime' );
                Vue.delete(form, 'updateTIme' );
                Vue.delete(form, 'createBy' );
                Vue.delete(form, 'updateBy' );
                let data = qs.stringify(form, {indices: false});
                this.$axios.post(url, data).then(res => {
                    this.$alert(text, '', {
                        confirmButtonText: "OK",
                        callback: () => {
                            eventBus.$emit(bus,null);
                        }
                    });
                });
            },
        }
    }
</script>
