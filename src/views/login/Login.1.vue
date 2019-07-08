
<template>
    <div class="account-login">
        <div class="account-title">账号密码登录</div>
        <div class="item">
            <div class="icon-box">   
                <img src="./../../assets/images/login-icon.png" alt="">
            </div>
            <div class="ipt">
                <input type="text" v-model="params.username" placeholder="请输入账号">
            </div>
        </div>
        <div class="item">
            <div class="icon-box">   
                <img src="./../../assets/images/psd-icon.png" alt="">
            </div>
            <div class="ipt">
                <input type="password" v-model="params.password" placeholder="请输入密码">
            </div>
        </div>
        <!-- <div class="item">
            <div class="icon-box">   
                <img src="./../../assets/images/yzm-icon.png" alt="">
            </div>
            <div class="ipt">
                <input type="text" placeholder="请输入密码">
            </div>
            <div class="yzm">
                验证码
            </div>
        </div> -->
        <div class="item remember-item">
            <div class="fl remember">
                <el-checkbox v-model="isChecked">记住我</el-checkbox>
            </div>
            <div class="ipt">
            </div>
            <!-- <div class="fr forget">
                忘记密码?
            </div> -->
        </div>

        <div class="login-btn">
            <el-button class="login-btn" @click="goLogin" :loading="loginLoading">{{loginText}}</el-button> 
        </div>
        <div class="go-regist">
            还没有账号? <span @click="goRegist">立即创建新账号</span> 
        </div>

    </div>
</template>

<script>
import { goLogin } from "@/api"
import { setLocalStorage } from "@/utils/localStorage"

export default {
    data() {
        return {
            isChecked:true,
            params:{
                username:"",
                password:""
            },
            loginLoading:false,
            loginText:"登录"
        }
    },
    methods: {
        async goLogin(){
            if(!this.params.username.length){
                this.$message.warning('请输入账号');
                return
            }else if(!this.params.password.length){
                this.$message.warning('请输入密码');
                return
            }else{
                this.loginLoading = true;
                this.loginText = "登陆中..."
                try {
                    let datas = await goLogin(this.params)
                    setLocalStorage('userinfo',datas)
                    this.$message.success('登陆成功');
                    setTimeout(()=>{
                        this.$router.push({
                            path:'/'
                        })
                    },1000)
                } catch (error) {
                    this.$message.error(error.message);
                }
                this.loginLoading = false;
                this.loginText = "登陆"
            }
        },
        goRegist(){
           this.$router.push('/login/regist') 
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
    .account-login{
        width: 350px;
        margin: 0 auto;
        padding: 20px 0;
        height: 500px;
        .account-title{
            text-align: center;
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .item{
            width: 100%;
            margin-bottom: 20px;
            height: 50px;
            padding: 10px 0;
            border-bottom: 1px solid #f1f1f1;
            display: flex;
            .icon-box{
                width: 30px;
                height: 30px;
                text-align: center;
                line-height:40px;
                img{
                    width: 20px;
                    height: 20px;
                }
            }
            .ipt{
                flex: 1;
                padding-left:10px; 
                input{
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    font-size: 16px;
                }
            }
            .yzm{
                width: 80px;
                height: 100%;
                background: #f1f1f1;
                border-radius: 2px;
            }
            .remember{
                display: inline-block;
                font-size: 14px;
                color: #666;
                input{
                    position: relative;
                    top: 2px;
                }
            }
            .forget{
                display: inline-block;
                font-size: 14px;
                color: #007947;
            }
        }
        .remember-item{
            border: none;
        }
        .login-btn{
            width: 100%;
            // background: #007947;
            // text-align: center;
            // height: 40px;
            // line-height: 40px;
            // color: #fff;
            // border-radius: 3px;
            // letter-spacing: 3px;
            // font-size: 16px;
            // &:hover{
            //     background: rgba(0,121,71,.9);
            // }
            .login-btn{
                background: #007947;
                width: 100%;
                color: #fff;
            }
        }
        .go-regist{
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            color: #666;
            margin-top: 30px;
            span{
                color: #007947;
            }
        }
    }
input::-webkit-input-placeholder{
    font-size: 14px;
    color: #999;
}    /* 使用webkit内核的浏览器 */
input::-moz-placeholder{
    font-size: 14px;
    color: #999;
}                  /* Firefox版本4-18 */
input::-moz-placeholder{
    font-size: 14px;
    color: #999;
}                  /* Firefox版本19+ */
input::-ms-input-placeholder{
    font-size: 14px;
    color: #999;
}           /* IE浏览器 */


</style>
<style>


.el-checkbox__input.is-checked .el-checkbox__inner, 
.el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color: #007947;
    background: #007947;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
    color: #007947;
}
</style>



