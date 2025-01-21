export const LostfoundStore = {
    state: () => ({
        lastOpenCampus: "屏峰",
        lastOpenMain: "全部"
    }),
    mutations: {
        setLastOpenCampus(state, value) {
            state.lastOpenCampus = value;
        },
        setLastOpenMain(state, value) {
            state.lastOpenMain = value;
        }
    }
};
//# sourceMappingURL=lostfound.js.map