function stringToCamelCase(str) {
    return str.replace(/_([a-z])/g, (_match, letter) => {
        return letter.toUpperCase();
    });
}
export function toCamelCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => toCamelCase(item));
    }
    else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
            const camelKey = stringToCamelCase(key);
            acc[camelKey] = toCamelCase(obj[key]);
            return acc;
        }, {});
    }
    return obj;
}
//# sourceMappingURL=camelize.js.map