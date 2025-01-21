export const ElectricityServiceStore = {
    state: () => ({
        roomName: "未知",
        roomCode: "未知",
        balance: undefined,
        todayConsumption: undefined,
        updateTime: {
            balance: undefined
        }
    }),
    mutations: {
        setElectricityStore(state, value) {
            if (value.roomName !== undefined)
                state.roomName = value.roomName;
            if (value.roomCode !== undefined)
                state.roomCode = value.roomCode;
            if (value.balance !== undefined)
                state.balance = value.balance;
            state.updateTime.balance = new Date();
        },
        setBalance(state, value) {
            state.balance = value;
            state.updateTime.balance = new Date();
        },
        setConsumption(state, value) {
            state.todayConsumption = value;
        }
    }
};
//# sourceMappingURL=electricity.js.map