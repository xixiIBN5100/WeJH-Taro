import Taro from "@tarojs/taro";
const globalConfig = {
    timeout: 12 * 1000
};
const request = (url, config) => {
    return Taro.request({
        ...globalConfig,
        url,
        ...config
    });
};
export default request;
//# sourceMappingURL=request.js.map