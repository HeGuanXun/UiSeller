<template>
    <div>
        <el-dialog :visible.sync="isShow_" width="600px"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               center
               :title="$t('service.Order_details')"
               v-if="isShow_"
    >
        <table   style="border-collapse:separate; border-spacing:10px;margin-top: -20px">
            <tr style="width: 100%;margin-top: 15px">
                <td style="text-align: right;width: 200px">{{$t('details.shop_name')}}:</td>
                <td style="text-align: left;width:400px">{{ this.detailData.shopName}}</td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Name_of_buyer')}}:</td>
                <td style="text-align: left">{{ this.detailData.orderReceiverName }}</td>
            </tr>


            <tr>
                <td style="text-align: right">{{$t('details.Order_number')}}:</td>
                <td style="text-align: left">{{ this.detailData.orderNum}}</td>
            </tr>

            <tr>
                <td style="text-align: right">{{$t('details.Order_details')}}:</td>
                <td style="text-align: left">{{ this.detailData.orderDetailNum}}</td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Receiving_information')}}:</td>
                <td style="text-align: left">
                    <p>{{ this.detailData.orderReceiverName}}</p>
                    <p>{{ this.detailData.orderReceiverPhone}}</p>
                    <p>{{ this.detailData.orderReceiverAddress}}</p>
                </td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Commodity_name')}}:</td>
                <td style="text-align: left">{{ this.detailData.spuName}}</td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Commodity_specification')}}:</td>
                <td style="text-align: left">{{ this.detailData.skuDescription}}</td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Number')}}:</td>
                <td style="text-align: left">{{ this.detailData.orderDetailQty}}</td>
            </tr>

            <tr>
                <td style="text-align: right">{{$t('details.pricing')}}:</td>
                <td style="text-align: left">{{ this.detailData.orderDetailPrice}}</td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Commodity_amount')}}:</td>
                <td style="text-align: left">{{ this.detailData.orderDetailAmount}}</td>
            </tr>


            <tr>
                <td style="text-align: right">{{$t('details.currency')}}:</td>
                <td style="text-align: left">{{ this.detailData.currencyCodeStr}}</td>
            </tr>

            <tr>
                <td style="text-align: right">{{$t('details.Whether_settlement')}}:</td>
                <td style="text-align: left">{{$platform_finace_orderDetailStatus[this.detailData.checkOutStatus-1].label }}</td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.state')}}:</td>
                <td style="text-align: left">{{$platform_orderDetailStatus_deliverMethod[this.detailData.orderDetailStatus-1].label }}</td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Logistics_mode')}}:</td>
                <td style="text-align: left">{{this.detailData.platformDeliverMethodCodeStr }}</td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Logistics_company')}}:</td>
                <td style="text-align: left">{{ this.detailData.deliverCompany}}</td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Logistics_number')}}:</td>
                <td style="text-align: left">
                    <el-link
                            type="primary"
                            size="mini"
                            style="margin-right:20px;">
                        {{ this.detailData.deliverNum }}
                    </el-link>
                </td>
            </tr>
            <tr>
                <td style="text-align: right">{{$t('details.Order_time')}}:</td>
                <td style="text-align: left">{{ this.detailData.createTime}}</td>
            </tr>
        </table>
    </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                reFresh:true,
                detailData: {},
                isShow_: false,
            };
        },

        methods: {
             openHandleConfirm(form) {
                this.detailData = form;
                this.isShow_ = true;
            },
        }
    };
</script>

<style lang="scss" scoped>

</style>
