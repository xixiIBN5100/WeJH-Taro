export const WebviewStore = {
    state: () => ({
        tempUrl: undefined,
        tempTitle: undefined
    }),
    mutations: {
        setTempUrl(state, value) {
            state.tempUrl = value.url;
            state.tempTitle = value.title;
        },
        clearTemp(state) {
            state.tempUrl = undefined;
            state.tempTitle = undefined;
        }
    }
};
//# sourceMappingURL=webview.js.map