export const HomeCardServiceStore = {
    state: () => ({
        selected: ["lessons-table-quick-view", "score-quick-view"],
        initialization: true
    }),
    mutations: {
        addHomeCardItem(state, value) {
            state.selected.push(value);
        },
        removeHomeCardItem(state, value) {
            const toDelete = state.selected.findIndex(item => item === value);
            if (toDelete !== -1)
                state.selected.splice(toDelete, 1);
        }
    }
};
//# sourceMappingURL=homecard.js.map