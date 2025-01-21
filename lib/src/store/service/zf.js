export const ZFServiceStore = {
    state: () => ({
        lessonsTableInfo: {},
        practiceLessons: [],
        examInfo: {},
        scoreInfo: {},
        roomInfo: {}
    }),
    mutations: {
        setLessonTable(state, value) {
            if (!value.lessonsTable) {
                console.error("更新课表失败");
                return;
            }
            if (!state.lessonsTableInfo[value.year])
                state.lessonsTableInfo[value.year] = {};
            state.lessonsTableInfo[value.year][value.term] = {
                data: {
                    lessonsTable: value.lessonsTable,
                    practiceLessons: value.practiceLessons
                },
                updateTime: new Date()
            };
        },
        setExamInfo(state, value) {
            if (!state.examInfo[value.year])
                state.examInfo[value.year] = {};
            state.examInfo[value.year][value.term] = {
                data: value.examInfo,
                updateTime: new Date()
            };
        },
        setScoreInfo(state, value) {
            if (!value.scoreInfo)
                return;
            if (!state.scoreInfo[value.year])
                state.scoreInfo[value.year] = {};
            if (!state.scoreInfo[value.year][value.term])
                state.scoreInfo[value.year][value.term] = {};
            state.scoreInfo[value.year][value.term][value.period] = {
                data: value.scoreInfo.map(item => ({
                    ...item,
                    scorePeriod: value.period
                })),
                updateTime: new Date()
            };
        },
        setRoomInfo(state, value) {
            state.roomInfo = {
                data: value,
                updateTime: new Date()
            };
        }
    }
};
//# sourceMappingURL=zf.js.map