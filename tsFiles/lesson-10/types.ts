export interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  homeworld: string;
  films: string[];
  url: string;
}

export interface JsonPlaceholderPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type CreatePostInput = Omit<JsonPlaceholderPost, "id">;

export type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
