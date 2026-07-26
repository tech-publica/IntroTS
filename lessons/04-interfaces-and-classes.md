# Lesson 4: Interfaces and classes

This lesson introduces TypeScript's main object-oriented tools. You will use an
interface to describe a contract, an abstract class to share implementation,
and concrete subclasses to create objects.

## What you will learn

By the end of this lesson, you should be able to:

- declare and implement an interface;
- distinguish a class, an abstract class, and an instance;
- create subclasses with `extends` and call `super`;
- use `public`, `protected`, and `private`;
- declare properties automatically with constructor parameter properties;
- create and use static members;
- control property access with getters and setters;
- distinguish TypeScript `private` from JavaScript `#private`;
- require subclass behavior with abstract methods;
- mark an overridden method with `override`.

## 1. Prepare the project

Start the compiler:

```sh
tsc --watch
```

Open `lesson-04.html` through your local web server and select the browser's
Console tab. The demonstration code is in `tsFiles/lesson-04.ts`.

## 2. Interfaces describe contracts

An interface describes the members an object must provide:

```ts
interface MemberContract {
  readonly id: number;
  displayName: string;
  getRole(): string;
}
```

An interface does not create objects and does not exist in the generated
JavaScript. It is used by TypeScript while checking your program.

A class can promise to satisfy an interface with `implements`:

```ts
class Member implements MemberContract {
  // The class must provide id, displayName, and getRole.
}
```

If a required member is missing or has an incompatible type, compilation fails.

## 3. Classes and instances

A class defines how objects are constructed and what behavior they have:

```ts
class Course {
  public title: string;

  public constructor(title: string) {
    this.title = title;
  }
}

const course = new Course("TypeScript");
```

`Course` is the class. `course` is an instance created with `new`. Unlike an
interface, a class exists in the emitted JavaScript.

## 4. Constructor parameter properties

TypeScript can declare and initialize a property directly in a constructor
parameter:

```ts
class Course {
  public constructor(
    public title: string,
    public readonly code: string,
  ) {}
}
```

Adding `public`, `protected`, `private`, or `readonly` turns a parameter into a
property. This shorter syntax replaces the longer declaration and assignment:

```ts
class Course {
  public title: string;

  public constructor(title: string) {
    this.title = title;
  }
}
```

Both versions create the same `title` property.

## 5. Access modifiers

TypeScript provides three main access levels:

| Modifier | Accessible from |
| --- | --- |
| `public` | Anywhere |
| `protected` | The declaring class and its subclasses |
| `private` | Only the declaring class |

Members are public by default, but writing the modifier explicitly can make a
class's intended API clearer.

In `lesson-04.ts`, `_score` is private. Code inside `AcademyStudent` can access
it, but code using an `AcademyStudent` instance cannot.

## 6. Inheritance

A subclass inherits accessible members from another class:

```ts
class Student extends Member {
  public constructor(name: string, public score: number) {
    super(name);
  }
}
```

`super(...)` calls the parent constructor. A subclass constructor must call it
before using `this`.

Use inheritance when the subclass genuinely represents a specialized form of
the parent. In the demonstration, students and teachers are both academy
members.

## 7. Abstract classes and methods

An abstract class provides shared state and behavior but cannot be instantiated
directly:

```ts
abstract class Member {
  public abstract getRole(): string;
}
```

An abstract method has no implementation in the abstract class. Every concrete
subclass must implement it:

```ts
class Student extends Member {
  public override getRole(): string {
    return "student";
  }
}
```

The `override` keyword tells TypeScript that the method is intended to replace
an inherited method. It also catches spelling mistakes and incompatible method
signatures.

## 8. Static members

Instance members belong to individual objects. Static members belong to the
class itself:

```ts
class Member {
  private static count = 0;

  public static get total(): number {
    return Member.count;
  }
}

console.log(Member.total);
```

Access a static member through the class, not an instance. Static members are
useful for information or behavior shared by every instance, such as counters
and factory methods.

## 9. Getters and setters

A getter reads like a property while executing a method:

```ts
public get score(): number {
  return this._score;
}
```

A setter controls assignments:

```ts
public set score(newScore: number) {
  if (newScore < 0 || newScore > 100) {
    throw new Error("Invalid score");
  }

  this._score = newScore;
}
```

Use them with property syntax:

```ts
student.score = 90;
console.log(student.score);
```

Getters and setters are useful when reading or writing a value requires
validation or other logic. They are not necessary for every property.

## 10. TypeScript `private` and JavaScript `#private`

TypeScript's `private` modifier prevents access during type checking:

```ts
private _email: string;
```

When targeting modern JavaScript, the emitted property is still an ordinary
JavaScript property. Its privacy is primarily enforced by TypeScript.

A JavaScript private field starts with `#`:

```ts
#accessCode: string;
```

The JavaScript runtime enforces this privacy. A `#` field can only be accessed
inside the class that declares it—not even directly inside a subclass.

Open `jsFiles/lesson-04.js` after compiling and compare how `_email` and
`#accessCode` appear in the output.

## 11. Follow the complete example

Read `tsFiles/lesson-04.ts` from top to bottom and identify:

1. the interface contract;
2. the abstract base class;
3. shared static state;
4. TypeScript and JavaScript private fields;
5. constructor parameter properties;
6. getters and setters;
7. the abstract method;
8. the two concrete subclasses;
9. the instances created with `new`.

Then uncomment each invalid example individually. Predict the compiler error
before saving the file, and restore the comment before moving to the next one.

## 12. Complete the exercises

Open `tsFiles/exercises/lesson-04-exercises.ts`. You will refactor a basic
library model into an interface, abstract class, and concrete subclass.

The starting code deliberately uses longer or less restricted forms. Follow
the numbered instructions and run `tsc` after every refactoring step. Update
the final usage code when you convert methods into getters, setters, and static
members.

Attempt the magazine bonus before opening
`tsFiles/solutions/lesson-04-solutions.ts`.

## Check your understanding

Make sure you can answer these questions:

1. Does an interface exist in the generated JavaScript?
2. Can an abstract class contain implemented methods?
3. Can you instantiate an abstract class directly?
4. What does `implements` check?
5. What does `extends` provide?
6. What does a constructor parameter property save you from writing?
7. When is a static member accessed through the class?
8. Why might a setter be preferable to a public field?
9. Who can access a `protected` member?
10. What is the runtime difference between `private value` and `#value`?

Revisit the relevant section for any answer you cannot explain in your own
words.
