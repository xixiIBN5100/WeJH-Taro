import { CardServiceStore } from "./card";
import { UserServiceStore } from "./user";
import { LibraryServiceStore } from "./library";
import { ZFServiceStore } from "./zf";
import { AnnouncementStore } from "./announcement";
import { InformationStore } from "./information";
import { CanteenServiceStore } from "./canteen";
import { ScoreServiceStore } from "./score";
import { HomeCardServiceStore } from "./homecard";
import { ElectricityServiceStore } from "./electricity";
import { WebviewStore } from "./webview";
import { LostfoundStore } from "./lostfound";
import { NotificationStore } from "./notification";
import { ThemeStore } from "./theme";
import { SuitStore } from "./suit";
export const ServiceStore = {
    modules: {
        card: CardServiceStore,
        user: UserServiceStore,
        webview: WebviewStore,
        library: LibraryServiceStore,
        zf: ZFServiceStore,
        announcement: AnnouncementStore,
        information: InformationStore,
        canteen: CanteenServiceStore,
        score: ScoreServiceStore,
        homecard: HomeCardServiceStore,
        electricity: ElectricityServiceStore,
        lostfound: LostfoundStore,
        notification: NotificationStore,
        theme: ThemeStore,
        suit: SuitStore
    },
    state: () => ({
        sessionID: undefined
    }),
    mutations: {
        setSession(state, value) {
            state.sessionID = value;
        },
        clearSession(state) {
            state.sessionID = undefined;
        },
        setApplist(state, value) {
            state.appList = value;
        },
        clearApplist(state) {
            state.appList = undefined;
        }
    }
};
//# sourceMappingURL=index.js.map