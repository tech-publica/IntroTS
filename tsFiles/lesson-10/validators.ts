import type {
  JsonPlaceholderPost,
  SwapiPerson,
} from "./types.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

export function isSwapiPerson(value: unknown): value is SwapiPerson {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.name === "string" &&
    typeof value.height === "string" &&
    typeof value.mass === "string" &&
    typeof value.birth_year === "string" &&
    typeof value.homeworld === "string" &&
    isStringArray(value.films) &&
    typeof value.url === "string"
  );
}

export function isJsonPlaceholderPost(
  value: unknown,
): value is JsonPlaceholderPost {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    typeof value.userId === "number" &&
    typeof value.title === "string" &&
    typeof value.body === "string"
  );
}
