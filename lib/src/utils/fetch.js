import Taro from "@tarojs/taro";
import { cookiesToString } from "./cookie";
function get(url, cookies) {
    const header = cookies
        ? {
            "Content-type": "application/json",
            Cookie: cookiesToString(cookies)
        }
        : {
            "Content-type": "application/json"
        };
    return new Promise((resolve, reject) => {
        Taro.request({
            url: url,
            header: header,
            mode: "cors",
            success: (res) => {
                resolve(res);
            },
            fail: (e) => {
                console.error(e);
                reject();
            }
        });
    });
}
function postJson(url, data, cookies) {
    return new Promise((resolve, reject) => {
        const header = cookies
            ? {
                "Content-type": "application/json",
                Cookie: cookiesToString(cookies)
            }
            : {
                "Content-type": "application/json"
            };
        Taro.request({
            url: url,
            data: data ? data : undefined,
            header: header,
            method: "POST",
            mode: "cors",
            success: (res) => {
                resolve(res);
            },
            fail: (e) => {
                console.error(e);
                reject();
            }
        });
    });
}
const fetch = {
    get: get,
    post: postJson
};
export { fetch };
//# sourceMappingURL=fetch.js.map