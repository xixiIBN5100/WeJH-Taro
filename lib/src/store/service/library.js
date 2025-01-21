export const LibraryServiceStore = {
    state: () => ({
        history: [],
        current: [],
        updateTime: {
            history: undefined,
            current: undefined
        }
    }),
    mutations: {
        setLibraryHistory(state, value) {
            state.history = value;
            state.updateTime.history = new Date();
        },
        setLibraryCurrent(state, value) {
            state.current = value;
            state.updateTime.current = new Date();
        }
    }
};
//# sourceMappingURL=library.js.map