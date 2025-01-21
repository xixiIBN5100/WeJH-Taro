import request from "../request";
import { api } from "../api/apiList";
import { serviceStore } from "@/store";
class LostfoundService {
}
LostfoundService.getRecords = (data) => {
    return request(api.lostfound.record, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
LostfoundService.getKindList = () => {
    return request(api.lostfound.kind, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID }
    });
};
export default LostfoundService;
//# sourceMappingURL=lostfoundService.js.map