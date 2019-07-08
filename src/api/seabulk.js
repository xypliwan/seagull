import axios from '@/utils/axios'

// 航运整柜----起始地  目的地  承运人
export function getFullCabinetBase(data = {}) {
    return axios({
        url: `/web/front/base`,
        method: "get",
        data
    })
};

// 航运整柜----列表
export function getFullCabinetList(data = {}) {
    return axios({
        url: `/web/front/index`,
        method: "post",
        data
    })
};

//首页底部新闻
export function getBottomNews(data = {}) {
    return axios({
        url: `/web/news/news`,
        method: "get",
    })
};

//获取新闻详情
export function getArticDetail(data = {}) {
    return axios({
        url: `/web/news/news-detail?id=${data.id}`,
        method: "get",
    })
};

//获取首页推荐派送渠道
export function getHotChannel(data = {}) {
    return axios({
        url: `/web/logistics/hot-channel`,
        method: "get",
    })
};

//联系我们
export function getReservation(data = {}) {
    return axios({
        url: `/web/news/reservation`,
        method: "post",
        data
    })
};


//海鸥散柜基础数据----起始地--目的地  体积系数
export function getSeabulkBaseData(data = {}) {
    return axios({
        url: `/web/logistics/base-data`,
        method: "post",
        data
    })
};

// //海鸥散柜-----列表数据  old
// export function getSeabulkList(data = {}) {
//     return axios({
//         url: `/web/logistics/list`,
//         method: "post",
//         data
//     })
// };

//海鸥散柜-----列表数据   new
export function getSeabulkList(data = {}) {
    return axios({
        url: `/web/channel/list`,
        method: "post",
        data
    })
};

//获取验证码
export function getCode(data = {}) {
    return axios({
        url: `/web/common/captcha?random=${data.random}`,
        method: "get"
    })
};

//获取联动数据
export function getBaseDestination(data = {}) {
    return axios({
        url: `/web/logistics/base-destination`,
        method: "post",
        data
    })
};
