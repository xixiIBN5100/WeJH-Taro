export const SuitStore = {
    state: () => ({
        lastOpenCampus: "屏峰",
        campusSuitInfo: [],
        lastOpenMain: "待处理"
    }),
    mutations: {
        setLastOpenCampus(state, value) {
            state.lastOpenCampus = value;
        },
        setCampusSuitInfo(state, value) {
            state.campusSuitInfo = value;
        },
        setLastOpenStatus(state, value) {
            state.lastOpenStatus = value;
        }
    }
};
//# sourceMappingURL=suit.js.map