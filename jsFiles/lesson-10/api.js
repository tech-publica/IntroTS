import { isJsonPlaceholderPost, isSwapiPerson, } from "./validators.js";
const SWAPI_BASE_URL = "https://swapi.dev/api";
const JSONPLACEHOLDER_BASE_URL = "https://jsonplaceholder.typicode.com";
export async function getSwapiPerson(id, signal) {
    const response = await fetch(`${SWAPI_BASE_URL}/people/${id}/`, {
        method: "GET",
        signal,
    });
    if (!response.ok) {
        throw new Error(`SWAPI request failed: ${response.status} ${response.statusText}`);
    }
    // JSON from an external service is untrusted at runtime.
    const data = await response.json();
    if (!isSwapiPerson(data)) {
        throw new Error("SWAPI returned an unexpected person structure.");
    }
    return data;
}
export async function createJsonPlaceholderPost(input, signal) {
    const response = await fetch(`${JSONPLACEHOLDER_BASE_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
        signal,
    });
    if (!response.ok) {
        throw new Error(`POST request failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!isJsonPlaceholderPost(data)) {
        throw new Error("JSONPlaceholder returned an unexpected post.");
    }
    return data;
}
//# sourceMappingURL=api.js.map