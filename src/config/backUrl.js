//官网跳往后台域名   （不是接口地址！！！）

let baseURL = '';

if (process.env.NODE_ENV === 'production') {
    if (process.env.VUE_APP_FLAG === 'pro') {
        //production 生产环境
        baseURL = 'http://user.haioupai.com/#/empty-page';
    } else if (process.env.VUE_APP_FLAG === 'test') {
        //test 测试环境
        baseURL = 'http://test-user.haioupai.com/#/empty-page';

    } else if (process.env.VUE_APP_FLAG === 'intr') {
        //local 内网环境
        baseURL = 'http://172.16.1.33:11081/#/empty-page';
    }
} else {
    //dev 开发环境
    baseURL = 'http://172.16.1.33:11081/#/empty-page';
}

export default baseURL;