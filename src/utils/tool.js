import { Message } from "element-ui";

export function message(msg, type = 'error') {
    Message({
        type: type,
        dangerouslyUseHTMLString: true,
        message: msg
    });
}


