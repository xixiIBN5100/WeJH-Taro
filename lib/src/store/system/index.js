export const SystemStore = {
    state: () => ({
        loading: false,
        generalInfo: {},
        version: "",
        questionnaire: {}
    }),
    mutations: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        setGeneralInfo(state, value) {
            state.generalInfo = value;
        },
        setVersion(state, value) {
            state.version = value;
        },
        setQuestionnaire(state, value) {
            state.questionnaire = value;
        }
    }
};
//# sourceMappingURL=index.js.map