import { computed, onMounted, onUnmounted } from "vue";
import store, { serviceStore } from "@/store";
import Taro from "@tarojs/taro";
const useDarkMode = () => {
    const mode = computed(() => serviceStore.theme.darkMode.mode);
    const isAdapted = computed(() => serviceStore.theme.darkMode.isAdapted);
    const handleModeChange = (e) => {
        if (isAdapted.value === true) {
            setMode(e.theme);
        }
    };
    const setIsAdapted = async (value) => {
        store.commit("setDarkModeAdapted", value);
        if (value === true) {
            const sysInfo = await Taro.getSystemInfo();
            setMode(sysInfo.theme);
        }
    };
    const setMode = async (value) => {
        store.commit("setDarkMode", value);
    };
    onMounted(async () => {
        if (isAdapted.value) {
            const sysInfo = await Taro.getSystemInfo();
            setMode(sysInfo.theme);
        }
        Taro.onThemeChange(handleModeChange);
    });
    onUnmounted(() => {
        Taro.offThemeChange(handleModeChange);
    });
    return {
        mode,
        isAdapted,
        setMode,
        setIsAdapted
    };
};
export default useDarkMode;
//# sourceMappingURL=useDarkMode.js.map