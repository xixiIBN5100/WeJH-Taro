export function debounce(func, delay = 1000) {
    let timer = null;
    return function (...args) {
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(this, args);
        }, delay);
    };
}
//# sourceMappingURL=debounce.js.map