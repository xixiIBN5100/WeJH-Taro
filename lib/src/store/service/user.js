export const UserServiceStore = {
    state: () => ({
        info: undefined,
        isActive: false,
        isBindZF: false,
        isBindLibrary: false,
        isBindYXY: false,
        isBindOauth: false
    }),
    mutations: {
        setBindZF(state, value) {
            state.isBindZF = value;
        },
        setBindLibrary(state, value) {
            state.isBindLibrary = value;
        },
        setBindYXY(state, value) {
            state.isBindYXY = value;
        },
        setBindOauth(state, value) {
            state.isBindOauth = value;
        },
        // comment: 设置用户信息
        setUserInfo(state, value) {
            state.info = { studentID: value.studentID };
            state.isBindZF = value.bind.zf;
            state.isBindLibrary = value.bind.lib;
            state.isBindYXY = value.bind.yxy;
            state.isBindOauth = value.bind.oauth;
            state.isActive = true;
        },
        setUserWXProfile(state, value) {
            state.wxProfile = value;
        },
        // comment: 删除用户信息
        clearUserInfo(state) {
            state.info = undefined;
            state.isActive = false;
            state.isBindZF = false;
            state.isBindLibrary = false;
            state.isBindYXY = false;
            state.isBindOauth = false;
        }
    }
};
//# sourceMappingURL=user.js.map