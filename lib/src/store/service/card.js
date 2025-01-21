export const CardServiceStore = {
    state: () => ({
        balance: 0,
        history: [],
        today: [],
        updateTime: {
            balance: undefined,
            history: undefined,
            today: undefined
        }
    }),
    mutations: {
        setCardBalance(state, value) {
            state.balance = value;
            state.updateTime.balance = new Date();
        },
        setCardToday(state, value) {
            if (value !== null)
                state.today = value;
            else
                state.today = [];
            state.updateTime.today = new Date();
        },
        clearCardToday(state) {
            state.today = [];
        }
    }
};
//# sourceMappingURL=card.js.map