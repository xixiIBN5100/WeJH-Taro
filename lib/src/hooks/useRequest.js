import Taro from "@tarojs/taro";
import { onMounted, ref } from "vue";
/**
 * 封装请求成 hook
 *
 * 为请求函数扩展
 *   - 启动选项
 *   - 状态处理
 * @template TData 响应的`data`的类型
 * @param service 请求函数
 * @param config 启动选项
 * @returns
 */
const useRequest = (service, config) => {
    const loading = ref(false);
    const data = ref();
    const error = ref();
    const fetch = (params) => {
        data.value = undefined;
        error.value = undefined;
        config?.onBefore?.();
        // TODO: add delay
        const timer = setTimeout(() => {
            loading.value = true;
        }, config?.loadingDelay || 0);
        service(params || config?.defaultParams).then((response) => {
            config?.onSuccess?.(response);
            data.value = response.data;
        }).catch((e) => {
            const errMsg = config?.onError?.(e);
            if (errMsg)
                Taro.showToast({ title: errMsg, icon: "none" });
            error.value = e;
        }).finally(() => {
            config?.onFinally?.();
            if (timer)
                clearTimeout(timer);
            loading.value = false;
        });
    };
    onMounted(() => {
        if (!config?.manual) {
            fetch();
        }
    });
    return {
        loading,
        data,
        error,
        run: fetch,
        runAsync: service
    };
};
export default useRequest;
//# sourceMappingURL=useRequest.js.map