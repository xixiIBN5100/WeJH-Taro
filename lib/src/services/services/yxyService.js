var _a;
import { api } from "../api/apiList";
import { serviceStore } from "@/store";
import request from "../request";
import Taro from "@tarojs/taro";
class YxyService {
}
_a = YxyService;
/**
 * 获取图形验证码 base64 图像
 * @returns
 */
YxyService.getGraph = async () => {
    return request(api.user.bind.yxy.getGraph, {
        method: "POST",
        header: { "Cookie": serviceStore.sessionID }
    });
};
/**
 * 校验图形验证码
 * @returns
 * @deprecated
 */
YxyService.sendGraphAuthCode = async (data) => {
    return request(api.user.bind.yxy.sendGraphAuthCode, {
        method: "POST",
        header: {
            "Cookie": serviceStore.sessionID
        },
        data
    });
};
YxyService.getPhoneCode = async (data) => {
    return request(api.user.bind.yxy.getPhoneCode, {
        method: "POST",
        header: {
            "Cookie": serviceStore.sessionID,
            data
        }
    });
};
/**
 * 登录
 * @param data
 * phoneNum: 手机号
 * code: 手机验证码
 * @returns
 */
YxyService.loginYxy = async (data) => {
    return request(api.user.bind.yxy.login, {
        method: "POST",
        header: {
            "Cookie": serviceStore.sessionID
        },
        data
    });
};
/** 查询电费余额 */
YxyService.queryBalance = async () => {
    return request(api.electricity.balance, {
        method: "GET",
        header: {
            "Cookie": serviceStore.sessionID
        }
    });
};
/** 查询用电记录 */
YxyService.queryConsumption = async () => {
    return request(api.electricity.consumption, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID }
    });
};
/** 申请订阅电费警告 */
YxyService.queryElectricitySubscription = async () => {
    return request(api.electricity.subscription, {
        method: "POST",
        header: {
            "Cookie": serviceStore.sessionID
        }
    });
};
/** 查询缴费记录 */
YxyService.queryRecord = async (data) => {
    return request(api.electricity.record, {
        method: "POST",
        header: { "Cookie": serviceStore.sessionID },
        data: data
    });
};
/**
 * 查询校园卡余额
 * 可能报错易校园登录过期
 */
YxyService.querySchoolCardBalance = async () => {
    return request(api.card.balance, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID },
        fail: (error) => {
            console.error(error);
            Taro.showToast({
                title: `查询校园卡余额失败\r\n${error.errMsg}`,
                icon: "none"
            });
        }
    });
};
/**
* 查询校园卡指定日期的消费记录
* @param data.queryTime 日期YYYYMMDD
* e.g. `"20221210"`
* @returns
*/
YxyService.querySchoolCardRecord = async (data) => {
    return request(api.card.record, {
        method: "POST",
        header: { "Cookie": serviceStore.sessionID },
        data,
        fail: (error) => {
            console.error(error);
            Taro.showToast({
                title: `查询消费记录失败\r\n${error.errMsg}`,
                icon: "none"
            });
        }
    });
};
export default YxyService;
//# sourceMappingURL=yxyService.js.map