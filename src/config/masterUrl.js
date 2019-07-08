//官网主接口域名
let baseURL = '';

if (process.env.NODE_ENV === 'production') {
    if (process.env.VUE_APP_FLAG === 'pro') {
        //production 生产环境
        baseURL = 'http://api-open.haioupai.com/';
    } else if (process.env.VUE_APP_FLAG === 'test') {
        //test 测试环境
        baseURL = 'http://test-api-open.haioupai.com/';

    } else if (process.env.VUE_APP_FLAG === 'intr') {
        //local 内网环境
        baseURL = 'http://172.16.1.33:11093/';
    }
} else {
    //dev 开发环境
    baseURL = 'http://172.16.1.33:11093/';
}

export default baseURL;