<template>
    <div class="title-tip">
        <p class="tip-title">{{titles}}</p>
        <img src="./../../assets/images/down.png">
    </div>
</template>

<script>
export default {
    props:{
        titles:{
            type:String,
            default:""
        }
    }
    
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
    .title-tip{
        width: 100%;
        text-align: center;
        .tip-title{
            font-size: 20px;
            color: #333;
            text-align: center;
        }
        img{
            width: 16px;
            height: 16px;
            margin-top: 10px;
        }

    }
</style>
