import { api } from "../api/apiList";
import { updateDateState } from "../utils/updateDateState";
import { serviceStore } from "@/store";
import request from "../request";
// comment: 这里的所有请求无需 session
class SystemService {
    // comment: 系统通知
    static async getAnnouncement(page = 1, size = 10) {
        return updateDateState(api.announcement, { page, size }, "setAnnouncements", null);
    }
    // comment: 首页应用列表
    static async getAppList() {
        // comment: 缓存 applist
        // return updateDateState(api.applist, null, 'setApplist', 'clearApplist');
        return updateDateState(api.applist, null, "setApplist", null);
    }
    // comment: 学期学年信息
    static async getGeneralInfo() {
        return updateDateState(api.info, null, "setGeneralInfo", null);
    }
}
// comment: 校园资讯
SystemService.getInformation = () => {
    return request(api.information, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID }
    });
};
export default SystemService;
//# sourceMappingURL=systemService.js.map