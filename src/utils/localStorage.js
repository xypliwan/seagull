import Storage from 'web-storage-cache'
import { userInfo } from 'os';

const localStorage = new Storage()

// 设置
export function setLocalStorage(key, value) {
    return localStorage.set(key, value)
}

//获取指定key
export function getLocalStorage(key) {
    return localStorage.get(key)
}

// 清除指定key
export function removeLocalStorage(key) {
    return localStorage.delete(key)
}

//清除所有
export function clearLocalStorage() {
    return localStorage.clear()
}


//设置
// export function setCookie(name, value, seconds = 0) {
//     var expires = "";
//     if (seconds != 0) {      //设置cookie生存时间
//         var date = new Date();
//         date.setTime(date.getTime() + (seconds * 1000));
//         expires = "; expires=" + date.toGMTString();
//     }
//     document.cookie = name + "=" + escape(value) + expires + "; path=/";   //转码并赋值
// }


//获取
// export function getCookie(c_name) {
//     if (document.cookie.length > 0) {
//         var c_start = document.cookie.indexOf(c_name + "=")
//         if (c_start != -1) {
//             c_start = c_start + c_name.length + 1
//             var c_end = document.cookie.indexOf(";", c_start)
//             if (c_end == -1) c_end = document.cookie.length
//             return unescape(document.cookie.substring(c_start, c_end)).replace(/\"/g, "");
//         }
//     }
//     return null;
// }



//删除
// export function clearCookie(name) {
//     setCookie(name, "", -1);
// }


// export function setCookie(name, value, days) {
//     var domain, domainParts, date, expires, host;
//     if (days) {
//         date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         expires = "; expires=" + date.toGMTString();
//     }
//     else {
//         expires = "";
//     }
//     host = location.host;
//     // console.log(expires,'expiresexpires')
//     if (host.split('.').length === 1) {
//         document.cookie = name + "=" + value + expires + "; path=/";
//     }
//     else {
//         domainParts = host.split('.');
//         domainParts.shift();                            ////["16", "0", "50:8082"]
//         domain = '.' + domainParts.join('.');       ////.16.0.50:8082

//         document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
//         // if (getCookie(name) == 'a' || getCookie(name) != value) {
//         if (getCookie(name) == null || getCookie(name) != value) {
//             domain = '.' + host;
//             document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
//         }
//     }

// }
export function setCookie(name, value, days) {
    var domain, domainParts, date, expires, host;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    host = location.host;
    if (host.split('.').length === 1) {
        // no "." in a domain - it's localhost or something similar
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    else {
        domainParts = host.split('.');
        domainParts.shift();
        domain = '.' + domainParts.join('.');

        document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
        if (getCookie(name) == null || getCookie(name) != value) {
            domain = '.' + host;
            document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
        }
    }
}




export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    // return 'a';
    return null;
}

export function clearCookie(name) {
    setCookie(name, '', -1);
}