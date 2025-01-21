import Taro from "@tarojs/taro";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { ServiceStore } from "./service";
import { SystemStore } from "./system";
const persistedStateStorage = {
    setItem(key, value) {
        return Taro.setStorageSync(key, value);
    },
    getItem(key) {
        return Taro.getStorageSync(key);
    },
    removeItem(key) {
        return Taro.removeStorageSync(key);
    }
};
const store = createStore({
    modules: {
        service: ServiceStore,
        system: SystemStore
    },
    plugins: [
        createPersistedState({
            storage: persistedStateStorage
        })
    ]
});
const serviceStore = store.state.service;
const systemStore = store.state.system;
export default store;
export { serviceStore, systemStore };
//# sourceMappingURL=index.js.map