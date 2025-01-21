export const AnnouncementStore = {
    state: () => ({
        announcements: [],
        updateCounter: 0
    }),
    mutations: {
        setAnnouncements(state, value) {
            if (state.announcements.length != value.length)
                state.updateCounter = Math.abs(value.length - state.announcements.length);
            state.announcements = value;
        },
        clearAnnouncements(state) {
            state.announcements = [];
        },
        clearAnnouncementsUpdateCounter(state) {
            state.updateCounter = 0;
        }
    }
};
//# sourceMappingURL=announcement.js.map