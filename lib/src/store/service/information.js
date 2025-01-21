export const InformationStore = {
    state: () => ({
        informationList: []
    }),
    mutations: {
        setInformationList(state, value) {
            if (state.informationList.length != value.length)
                state.updateCounter = Math.abs(value.length - state.informationList.length);
            state.informationList = value;
        },
        clearAnnouncementsUpdateCounter(state) {
            state.updateCounter = 0;
        }
    }
};
//# sourceMappingURL=information.js.map