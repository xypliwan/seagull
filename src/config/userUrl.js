//用户模块接口域名

let baseURL = '';

if (process.env.NODE_ENV === 'production') {
    if (process.env.VUE_APP_FLAG === 'pro') {
        //production 正式环境
        baseURL = 'http://api-user.haioupai.com/';
    } else if (process.env.VUE_APP_FLAG === 'test') {
        //test 测试环境
        baseURL = 'http://test-api-user.haioupai.com/';

    } else if (process.env.VUE_APP_FLAG === 'intr') {
        //local 内网环境
        baseURL = 'http://172.16.1.33:11091/';
    }
} else {
    //dev 开发环境
    baseURL = 'http://172.16.1.33:11091/';
}

export default baseURL;