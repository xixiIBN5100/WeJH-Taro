import Taro from "@tarojs/taro";
import store, { serviceStore } from "@/store";
import { fetch } from "@/utils";
import { api } from "@/services";
import { updateDateStateWithSession } from "../utils/updateDateState";
import errCodeHandler from "../utils/errHandler";
import { ServerCode } from "../api/codes";
import request from "../request";
class UserService {
    // fix: param autoLogin is overriden by showModal
    static async bindLibrary(data, showModal = true) {
        return updateDateStateWithSession(api.user.bind.library, data, "setBindLibrary", (res) => res.data.code === 1, true, showModal);
    }
    static async bindZF(data, showModal = true) {
        return updateDateStateWithSession(api.user.bind.zf, data, "setBindZF", (res) => res.data.code === 1, true, showModal);
    }
    static async bindOauth(data, showModal = true) {
        return updateDateStateWithSession(api.user.bind.oauth, data, "setBindOauth", (res) => res.data.code === 1, true, showModal);
    }
    // comment: 返回用户信息
    static async getUserInfo(autoLogin = true) {
        // comment: 创号成功，打开我的，每次 testSession 执行一次
        // testSession 进入时，autoLogin === false
        return await updateDateStateWithSession(api.user.info, null, "setUserInfo", (res) => {
            return res.data.data.user;
        }, autoLogin);
    }
    static async createUserApp(userForm) {
        // comment: 获取表单信息之后再获得微信认证
        if (!userForm.code) {
            const res = await Taro.login({ timeout: 3000 });
            if (res.code)
                userForm.code = res.code;
            else
                return false;
        }
        // /api/user/create/student/wechat
        const res = await fetch.post(api.user.create.wechat, userForm);
        if (res.statusCode === 200 && res.data.code === ServerCode.OK) {
            if (res.cookies && res.cookies.length > 0) {
                store.commit("setSession", res.cookies[0]);
                UserService.getUserInfo();
            }
            return true;
        }
        Taro.hideLoading();
        await errCodeHandler(res.data.code, true);
        return false;
    }
    // DISPOSED
    // /api/user/create/student
    static async createUserH5(userForm) {
        const res = await fetch.post(api.user.create.h5, userForm);
        if (res.statusCode === 200) {
            if (res.cookies && res.cookies.length > 0) {
                store.commit("setSession", res.cookies[0]);
                UserService.getUserInfo();
            }
            return true;
        }
        return false;
    }
}
UserService.getUserTheme = () => {
    return request(api.user.theme.get, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID }
    });
};
UserService.setTheme = (data) => {
    return request(api.user.theme.set, {
        method: "POST",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
UserService.logout = (data) => {
    return request(api.user.logout, {
        method: "POST",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
UserService.changePassword = (data) => {
    return request(api.user.changePassword, {
        method: "POST",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
export default UserService;
//# sourceMappingURL=userService.js.map