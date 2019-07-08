
const minxin = {
    methods: {
        getMappingVal(arr, valkey, val, labkey) {
            let target = arr.filter(el => el[valkey] == val);
            return target.length > 0 ? target[0][labkey] : ''
        },
        browserRedirect() {
            let sUserAgent = navigator.userAgent.toLowerCase();
            let bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
            let bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
            let bIsMidp = sUserAgent.match(/midp/i) == 'midp';
            let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
            let bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
            let bIsAndroid = sUserAgent.match(/android/i) == 'android';
            let bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
            let bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                //手机
                window.location.href = 'http://m.express.kuajingyan.com';
            } else {
                //电脑
                // window.location.href = 'http://express.kuajingyan.com';
            }
        },
        
    }
}
export default minxin;