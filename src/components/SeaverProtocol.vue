<template>
    <div>
        <el-dialog
            title="海鸥派平台服务条款"
            :visible.sync="seaverVisible"
            width="800px"
            :before-close="handleClose">
            <div class="seaver-box">
                <p class="seaver-title">卖家客户使用“海鸥派运单管理系统”，在海鸥派系统注册前请认真阅读本协议内容，在本协议中加粗、下划线等方式显著标识的文字，请商家着重阅读，慎重考虑。</p>
                <p class="seraver-center">前言</p>
                <p class="seraver-pt">海鸥派平台是一家具有丰富资源和行业经验的物流服务平台，有条件及能力向客户<strong>提供优质的物流服务商</strong>进行国际货物运输及其配套服务；客户有意就其持有或管理的货物向海鸥派平台<strong>间接</strong>购买服务。</p>
                <p class="seraver-pt"><strong>就此，双方本着自愿平等、互惠互利、诚实信用的原则，经友好协商，就国际货物运输服务事宜订立本协议，以资双方共同遵守。</strong></p>
                <p class="seraver-title">一．注册须知</p>
                <p class="seraver-text">在您完成注册程序或使用平台时，您应当是具备完全民事行为能力的自然人、法人或其他组织。若您不具备前述主体资格，则您及您的监护人应承担因此而导致的一切后果。</p>
                <p class="seraver-text">您在使用平台、接受或购买我们的产品或服务时，您可能需要提供法律法规要求的必要身份信息及资料。</p>
                <p class="seraver-title">二.声明与承诺</p>
                <p class="seraver-text">（一）您承诺已阅读、理解并同意接受本协议，本协议内容包括协议正文及平台所有已经发布或将来可能发布的各类规则、细则、协议等文本，以上内容均为本协议不可分割的一部分，与协议正文具有同等法律效力。</p>
                <p class="seraver-text">（二）您完成注册程序或使用平台时向平台发出的指令将视为您本人所为，所以特别提醒您，请妥善保管平台账号及平台允许登陆平台的账号，不要将其提供给任何第三方或交于任何第三方使用。</p>
                <p class="seraver-text">（三）您同意您的信息可根据合作要求展示于平台，我们会根据法律法规、监管部门要求使用，不会为满足第三方的营销目的而披露您的信息。</p>
                <p class="seraver-text">（四）您承诺不为任何非法目的或以任何非法方式使用平台的产品或服务，并承诺遵守中国相关法律、法规及互联网之使用惯例。如我们发现或经第三方举报并经核实您存在前述行为或情形，我们可能会暂停或终止全部或部分平台产品或服务，并视需要报告监管部门，并可能移送司法机关。</p>
                <p class="seraver-text">（五）我们有权根据业务需要酌情修订本协议的相关条款,并以平台公告的形式进行更新,不再单独通知予您。经修订的“条款”一经在平台公布,即产生效力。</p>

                <p class="seraver-title">三．服务内容</p>
                <p class="seraver-text">平台为卖家客户推荐合适的优质物流服务产品，并提供物流系统进行业务交易。业务交易过程中卖家客户线下直接和物流服务商沟通，本平台只提供前期的业务撮合和后期系统支持服务。</p>
                <p class="seraver-title">四．权利和责任</p>
                <p class="seraver-text">1.平台的权利和责任</p>
                <p class="seraver-text">1.2平台为卖家客户和物流服务商提供系统支持服务，将物流服务商的产品进行线上发布，供卖家客户选择下单。</p>
                <p class="seraver-text">1.3 平台代收物流服务费用保障一定程度上的监管。卖家将物流费用支付给平台，3-5个工作日后平台再将物流费用转到物流服务商账户。</p>
                <p class="seraver-text">1.4 平台为卖家客户和对接的物流服务商之间确定后期的理赔标准，具体详情可见《海鸥派国际货物运输服务合同》。</p>
                <p class="seraver-text">2.卖家客户的权利和责任</p>
                <p class="seraver-text">2.1卖家客户的物流需求由平台提供合适的优质物流服务商进行解决</p>
                <p class="seraver-text">2.2 卖家客户有权使用平台的物流系统进行产品和订单的管理，在平台系统上的数据需要受到保护。</p>
                <p class="seraver-text">2.3 卖家客户收到物流合作商的物流账单后，卖家客户需要在和物流服务商约定的账期内向平台支付物流费用。</p>
                <p class="seraver-text">2.4卖家客户需要保障自身平台账号的隐私，因账号泄露导致出现的问题由自身承担。（发现账号问题后第一时间修改密码并向平台反馈）</p>

                <p class="seraver-title">三．运输费用结算方式</p>
                <p class="seraver-text">1.结算周期：运输费用的结算周期以卖家客户和物流服务商之间协商为准，具体可在《海鸥派国际货物运输服务合同》中进行确认。</p>
                <p class="seraver-text">2.结算方式：卖家客户将物流费用付清给平台，平台再付给对应的物流服务商</p>
                <p class="seraver-text">平台银行账号信息如下：</p>
                <p class="seraver-bank">户名：深圳市塰鸥派科技物流有限公司</p>
                <p class="seraver-bank">收款帐户：41013900040022986</p>
                <p class="seraver-bank">收款银行：中国农业银行深圳大学城支行</p>

                <p class="seraver-title">六．协议的生效和终止</p>
                <p class="seraver-text">本协议自卖家客户在线上注册时同意开始生效，当卖家客户不再使用平台系统进行线上下单时截止。</p>
                <p class="seraver-title">七．协议的生效和终止</p>
                <p class="seraver-text">7.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
                <p class="seraver-text">7.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
                <p class="seraver-text">7.3 本协议解释权及修订权归海鸥派平台所有。</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:{
        seaverProtocolVisible:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            seaverVisible: false
        }
    },
    watch: {
        seaverProtocolVisible(newVal){
            this.seaverVisible = newVal
        }
    },
    methods: {
        handleClose(done) {
            done();
            this.$emit('closeSeaverVisible',false)
        }
    },
}
</script>

<style scoped lang="scss">
.seaver-box{
    max-height: 600px;
    overflow-y: auto;
    .seaver-title{
        font-size: 16px;
        color: #000;
        margin-bottom: 20px;
        line-height: 24px;
    }
    .seraver-center{
        font-size: 16px;
        color: #000;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .seraver-title{
        text-align: left;
        margin-top: 20px;
        margin-bottom: 10px;
        color: #333;
        font-weight: bold;
        font-size: 16px;
    }
    .seraver-text{
        font-size: 15px;
        color: #666;
        line-height: 24px;
        text-align: left;
    }
    .seraver-bank{
        text-align: left;
        color: #333;
        font-size: 16px;
        margin-top: 10px;
    }
    .seraver-pt{
        line-height: 24px;
        text-align: left;
    }
    strong{
        color: #000;
        font-size: 15px;
        font-weight: bold;
        text-align: left;
    }
}
</style>
