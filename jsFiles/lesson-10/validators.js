function isRecord(value) {
    return typeof value === "object" && value !== null;
}
function isStringArray(value) {
    return (Array.isArray(value) &&
        value.every((item) => typeof item === "string"));
}
export function isSwapiPerson(value) {
    if (!isRecord(value)) {
        return false;
    }
    return (typeof value.name === "string" &&
        typeof value.height === "string" &&
        typeof value.mass === "string" &&
        typeof value.birth_year === "string" &&
        typeof value.homeworld === "string" &&
        isStringArray(value.films) &&
        typeof value.url === "string");
}
export function isJsonPlaceholderPost(value) {
    if (!isRecord(value)) {
        return false;
    }
    return (typeof value.id === "number" &&
        typeof value.userId === "number" &&
        typeof value.title === "string" &&
        typeof value.body === "string");
}
//# sourceMappingURL=validators.js.map