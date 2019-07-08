import axios from '@/utils/axiosCost'
// 试算列表


//获取国家列表
export function getCountryList(data={}){    
    return axios({
        url:`/web/front/country`,
        method:"get",
    })
};

//获取包裹类型
export function getCargoType(data={}){    
    return axios({
        url:`/web/front/cargo-type`,
        method:"get",
    })
};


//获取费用试算列表
export function getCostTrialList(data={}){    
    return axios({
        url:`/web/tool/cost-trial?country_code=${data.country_code}&weight=${data.weight}&package_type=${data.package_type}&zip_code=${data.zip_code}&length=${data.length}&width=${data.width}&height=${data.height}`,
        // url:`/web/tool/cost-trial`,
        method:"get",
        // data
    })
};