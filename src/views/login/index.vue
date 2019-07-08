
<template>
    <div class="login-box">
        <img class="bg-img" src="./../../assets/images/loginbg.png" alt="">
        <div class="wrapper">
            <img class="login-bg" @click="goHome" src="./../../assets/images/logo.png" alt="">
            <div class="login-title">
                <router-link to="/login/login" tag="div">用户登陆</router-link>
                <router-link to="/login/regist" tag="div">用户注册</router-link>
            </div>
            <div class="contenr-box">
                <router-view></router-view>
            </div>

            <div class="bottom-tip">
                <p>Copyright 2013 ©深圳市易仓科技有限公司. ALL Rights Reserved 粤ICP备13020851号</p>
                <p>广东省 深圳市 南山区 西丽 新围工业区9栋1楼</p>
            </div>
        </div>

            <!-- <my-bottom></my-bottom> -->
        
    </div>
</template>


<script>
import MyBottom from '@/views/bottom'

export default {
    methods: {
        goHome(){
            this.$router.push('/')
        }
    },
    components:{
        MyBottom
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
    .login-box{
        text-align: center;
        background: #f1f1f1;
        .bg-img{
            height: 440px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -10;
            width: 100%;
        }
        .wrapper{
            position: absolute;
            top: 100px;
            left: 0;
            bottom: 0;
            right:0;
            width: 800px;
            // background: #fff;
            height: 500px;
            
            margin: 0 auto;
            text-align: center;
            .login-bg{
                text-align: center;
                width: 125px;
                cursor: pointer;
            }
            .login-title{
                width: 200px;
                height: 30px;
                margin: 0 auto;
                display: flex;
                border: 1px solid #fff;
                border-radius: 5px;
                margin-top: 30px;
                overflow: hidden;
                margin-bottom: 30px;
                cursor: pointer;
                div{
                    flex: 1;
                    height: 100%;
                    color: #fff;
                    line-height: 30px;
                    font-size: 15px;
                    text-align: center;
                    &.router-link-active{
                        background: #fff;
                        color: #007947;
                    }

                }
            }
            .contenr-box{
                width: 100%;
                // height: 500px;
                background: #fff;
                box-shadow: 0px 2px 3px #f3f3f3;;
                border-radius: 3px;
            }
            .bottom-tip{
                height: 120px;
                padding: 30px 0;
                margin-top: 70px;
                p{
                    height:30px;
                    line-height: 30px;
                    text-align: center;
                    color: #a7a0a0;
                    font-size: 13px;
                }
            }
        }
    }
</style>
