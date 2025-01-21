/**
  * 递归查找子项是否有通知
  */
const hasNotification = (node) => {
    if (typeof (node) === "string") {
        return true;
    }
    else if (node) {
        return Object.keys(node).findIndex(key => {
            return hasNotification(node[key]);
        }) === -1 ? false : true;
    }
    else
        return false;
};
export const checkNotification = (path, noticeState) => {
    const paths = path.split("/");
    const root = paths.reduce((pre, cur) => {
        if (pre) {
            return pre[cur];
        }
        else {
            return null;
        }
    }, noticeState);
    if (!root)
        return false;
    else
        return (hasNotification(root));
};
//# sourceMappingURL=checkNotification.js.map