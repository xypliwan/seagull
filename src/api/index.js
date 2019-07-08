import axios from '@/utils/axios'

//发送验证码
export function getCaptcha(data={}){    
    return axios({
        url:`/seagull-front/common/get-captcha?tel=${data.tel}`,
        method:"get",
    })
};

//用户注册
export function goRegister(data={}){    
    return axios({
        url:`/seagull-front/common/register`,
        method:"post",
        data
    })
};


//用户登录      //使用的是fba退件服务的登陆
export function goLogin(data={}){    
    return axios({
        url:`/user/login`,
        method:"post",
        data
    })
};

// 航运整柜----起始地  目的地  承运人
export function getFullCabinetBase(data={}){    
    return axios({
        url:`/seagull-front/seafull/base`,
        method:"get",
        data
    })
};

// 航运整柜----列表
export function getFullCabinetList(data={}){    
    return axios({
        url:`/seagull-front/seafull/index`,
        method:"post",
        data
    })
};

//海鸥散柜基础数据----起始地--目的地
export function getSeabulkBaseData(data={}){    
    return axios({
        url:`/seagull-front/seabulk/base-data`,
        method:"get",
    })
};

//海鸥散柜-----列表数据
export function getSeabulkList(data={}){    
    return axios({
        url:`/seagull-front/seabulk/index`,
        method:"post",
        data
    })
};


//首页底部新闻
export function getBottomNews(data={}){    
    return axios({
        url:`/seagull-front/common/news`,
        method:"get",
    })
};

//联系我们

export function getReservation(data={}){    
    return axios({
        url:`/seagull-front/common/reservation`,
        method:"post",
        data
    })
};

//获取新闻详情
export function getArticDetail(data={}){    
    return axios({
        url:`/seagull-front/common/news-detail?id=${data.id}`,
        method:"get",
    })
};