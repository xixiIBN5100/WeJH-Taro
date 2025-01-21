export const ThemeStore = {
    state: {
        hadTheme: [],
        themeMode: "green",
        darkMode: {
            mode: "light",
            isAdapted: false
        }
    },
    mutations: {
        setHadTheme(state, value) {
            state.hadTheme = value;
        },
        setThemeMode(state, value) {
            state.themeMode = value;
        },
        setDarkMode(state, value) {
            state.darkMode.mode = value;
        },
        setDarkModeAdapted(state, value) {
            state.darkMode.isAdapted = value;
        }
    }
};
//# sourceMappingURL=theme.js.map