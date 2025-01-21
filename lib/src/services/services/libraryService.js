import { api } from "../api/apiList";
import { updateDateStateWithSession } from "../utils/updateDateState";
export default class LibraryService {
    static async getLibraryCurrent() {
        return updateDateStateWithSession(api.library.current, null, "setLibraryCurrent");
    }
    static async getLibraryHistory() {
        return updateDateStateWithSession(api.library.history, null, "setLibraryHistory");
    }
}
//# sourceMappingURL=libraryService.js.map