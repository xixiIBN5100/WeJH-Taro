/**
  * 页面通知角标状态
  *
  * 根据页面 路由/选项 来定位角标项
  *
  */
export const NotificationStore = {
    state: {
        state: {
            my: {
                bind: "新"
            }
        }
    },
    mutations: {
        /**
          * 增量更新状态
          */
        updateNotification(state, value) {
            state.state = {
                ...state.state,
                ...value
            };
        }
    }
};
//# sourceMappingURL=notification.js.map