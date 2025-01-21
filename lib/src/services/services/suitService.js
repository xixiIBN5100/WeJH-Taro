import request from "../request";
import { api } from "../api/apiList";
import { serviceStore } from "@/store";
class suitService {
}
suitService.getFaq = (data) => {
    return request(api.suit.getFaq, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
suitService.getInformation = () => {
    return request(api.suit.getInformation, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID }
    });
};
suitService.changeInformation = (data) => {
    return request(api.suit.changeInformation, {
        method: "POST",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
suitService.getSuitInfo = (data) => {
    return request(api.suit.check, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
suitService.pushRentSuitInfo = (data) => {
    return request(api.suit.submit, {
        method: "POST",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
suitService.getRecords = (data) => {
    return request(api.suit.record, {
        method: "GET",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
suitService.deleteRecords = (data) => {
    return request(`${api.suit.record}?borrow_id=${data.borrow_id}`, {
        method: "DELETE",
        header: { "Cookie": serviceStore.sessionID },
        data
    });
};
export default suitService;
//# sourceMappingURL=suitService.js.map