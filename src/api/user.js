import axios from '@/utils/axiosUser'
// 用户


//用户注册
export function goRegister(data = {}) {
    return axios({
        // url:`/seagull-front/common/register`,
        // url:`/web/seagull/sign-up`,
        url: `/user/sign-up`,
        method: "post",
        data
    })
};

//发送验证码
export function getCaptcha(data = {}) {
    return axios({
        // url:`/web/tool/phone-verify?verify-type=${data.vilide}&phone=${data.phone}`,
        url: `/tool/phone/registered?tel=${data.tel}`,
        method: "get",
    })
};



//用户登录      //使用的是fba退件服务的登陆
export function goLogin(data = {}) {
    return axios({
        url: `/user/login`,
        method: "post",
        data
    })
};


//获取跳转Token   （跳往后台）
export function goBackJump(data = {}) {
    return axios({
        url: `/user/jump?time_stamp=${data.time_stamp}`,
        method: "get",
    })
};

//用户退出
export function userluseLogout(data = {}) {
    return axios({
        url: `/user/logout`,
        method: "post",
        data
    })
};
