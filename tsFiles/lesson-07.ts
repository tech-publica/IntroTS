/*
 * LESSON 7
 * Generics, constraints, and keyof
 */

console.log("--- Lesson 7: generics ---");

// T is a type parameter. The result has the same type as the argument.
function identity<T>(value: T): T {
  return value;
}

const genericText = identity("TypeScript");
const genericNumber = identity<number>(42);
console.log(genericText, genericNumber);

// TypeScript infers T from the array passed to the function.
function firstElement<T>(items: readonly T[]): T | undefined {
  return items[0];
}

console.log(firstElement(["keyboard", "mouse"]));
console.log(firstElement([10, 20, 30]));

// Generic functions can use multiple type parameters.
function createPair<TFirst, TSecond>(
  first: TFirst,
  second: TSecond,
): [TFirst, TSecond] {
  return [first, second];
}

const productAndQuantity = createPair("Keyboard", 2);
console.log(productAndQuantity);

// A generic interface can wrap different data types consistently.
interface DataResponse<TData> {
  data: TData;
  success: boolean;
  message?: string;
}

const productNamesResponse: DataResponse<string[]> = {
  data: ["Keyboard", "Mouse"],
  success: true,
};

console.log(productNamesResponse.data);

interface IdentifiableEntity {
  readonly id: number;
}

type RepositoryProduct = {
  readonly id: number;
  name: string;
  price: number;
};

// A constraint requires TEntity to provide an id.
class Repository<TEntity extends IdentifiableEntity> {
  #items: TEntity[] = [];

  public add(item: TEntity): void {
    this.#items.push(item);
  }

  public findById(id: number): TEntity | undefined {
    return this.#items.find((item) => item.id === id);
  }

  public getAll(): readonly TEntity[] {
    return [...this.#items];
  }
}

const productRepository = new Repository<RepositoryProduct>();
productRepository.add({ id: 1, name: "Keyboard", price: 25 });
productRepository.add({ id: 2, name: "Monitor", price: 120 });

console.log(productRepository.findById(2));
console.log(productRepository.getAll());

// keyof creates a union of an object's property names.
function getProperty<TObject, TKey extends keyof TObject>(
  object: TObject,
  key: TKey,
): TObject[TKey] {
  return object[key];
}

const repositoryProduct: RepositoryProduct = {
  id: 3,
  name: "Webcam",
  price: 45,
};

const repositoryProductName = getProperty(repositoryProduct, "name");
const repositoryProductPrice = getProperty(repositoryProduct, "price");
console.log(repositoryProductName, repositoryProductPrice);

// A generic default is used when no type argument can be inferred or supplied.
interface Page<TItem = string> {
  items: TItem[];
  pageNumber: number;
}

const defaultPage: Page = {
  items: ["one", "two"],
  pageNumber: 1,
};

const productPage: Page<RepositoryProduct> = {
  items: [repositoryProduct],
  pageNumber: 1,
};

console.log(defaultPage, productPage);

/*
 * Type errors
 *
 * Uncomment one example at a time and run `tsc`.
 */

// productRepository.add({ name: "Mouse", price: 15 });
// getProperty(repositoryProduct, "stock");
// const invalidResponse: DataResponse<number> = { data: "42", success: true };
