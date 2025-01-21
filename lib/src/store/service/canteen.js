export const CanteenServiceStore = {
    state: () => ({
        flow: undefined,
        updateTime: {
            flow: undefined
        }
    }),
    mutations: {
        setCanteenFlow(state, value) {
            state.flow = value;
            state.updateTime.flow = new Date();
        }
    }
};
//# sourceMappingURL=canteen.js.map