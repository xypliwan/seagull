//arr1默认数组  arr2选择数组
export function formatSelectCheckout(arr1, arr2) {
    let snapArr = []
    arr1.forEach((el, i) => {
        arr2.forEach((every, index) => {
            if (el == every.name) {
                snapArr.push(every.id)
            }
        })
    })
    return snapArr;
}

export function isPone(phone) {
    let phones = Number(phone)
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phones)) {
        return false;
    } else {
        return true;
    }
}


export function formatMessage(data) {
    let message = '';
    if (Array.isArray(data)) {
        data.forEach(el => {
            message += `<p>${el}</p>`
        })
    } else {
        message = `<p>${data}</p>`
    }
    return message
}

export function mathRand(lengths) {     //获取随机几位验证码
    let num = '';
    for (var i = 0; i < lengths; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

