import { api } from "../api/apiList";
import { updateDateStateWithSession } from "../utils/updateDateState";
export default class CanteenService {
    static async getCanteenFlow() {
        return updateDateStateWithSession(api.canteen.flow, null, "setCanteenFlow");
    }
}
//# sourceMappingURL=canteenService.js.map