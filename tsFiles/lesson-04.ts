/*
 * LESSON 4
 * Interfaces and object-oriented TypeScript
 */

console.log("--- Lesson 4: interfaces and classes ---");

// An interface describes a contract. It does not create an object at runtime.
interface MemberContract {
  readonly id: number;
  displayName: string;
  getRole(): string;
}

// An abstract class provides shared code but cannot be instantiated directly.
abstract class AcademyMember implements MemberContract {
  private static nextId = 1;
  private static memberCount = 0;

  public readonly id: number;
  private _email: string;
  #accessCode: string;

  /*
   * `public displayName` is a parameter property. TypeScript declares the
   * property and assigns the argument automatically.
   */
  protected constructor(
    public displayName: string,
    email: string,
    accessCode: string,
  ) {
    this.id = AcademyMember.nextId;
    AcademyMember.nextId += 1;
    AcademyMember.memberCount += 1;

    this._email = email;
    this.#accessCode = accessCode;
  }

  public static get totalMembers(): number {
    return AcademyMember.memberCount;
  }

  public get email(): string {
    return this._email;
  }

  public set email(newEmail: string) {
    if (!newEmail.includes("@")) {
      throw new Error("The email address must contain @.");
    }

    this._email = newEmail;
  }

  protected hasAccessCode(code: string): boolean {
    return this.#accessCode === code;
  }

  public describe(): string {
    return `${this.displayName} is a ${this.getRole()}.`;
  }

  // Every concrete subclass must implement this method.
  public abstract getRole(): string;
}

class AcademyStudent extends AcademyMember {
  /*
   * `_score` is also a parameter property. The `private` modifier declares it,
   * initializes it, and prevents access from outside this class.
   */
  public constructor(
    displayName: string,
    email: string,
    accessCode: string,
    private _score: number = 0,
  ) {
    super(displayName, email, accessCode);
  }

  public get score(): number {
    return this._score;
  }

  public set score(newScore: number) {
    if (newScore < 0 || newScore > 100) {
      throw new Error("The score must be between 0 and 100.");
    }

    this._score = newScore;
  }

  public override getRole(): string {
    return "student";
  }

  public verifyAccess(code: string): boolean {
    return this.hasAccessCode(code);
  }
}

class AcademyTeacher extends AcademyMember {
  public constructor(
    displayName: string,
    email: string,
    accessCode: string,
    public subject: string,
  ) {
    super(displayName, email, accessCode);
  }

  public override getRole(): string {
    return `${this.subject} teacher`;
  }
}

const lessonFourStudent = new AcademyStudent(
  "Ada",
  "ada@example.com",
  "TS-1234",
  85,
);

const lessonFourTeacher = new AcademyTeacher(
  "Grace",
  "grace@example.com",
  "ADMIN-42",
  "computer science",
);

console.log(lessonFourStudent.describe());
console.log(lessonFourTeacher.describe());

lessonFourStudent.score = 92;
lessonFourStudent.email = "ada.lovelace@example.com";

console.log("Score:", lessonFourStudent.score);
console.log("Email:", lessonFourStudent.email);
console.log("Access accepted:", lessonFourStudent.verifyAccess("TS-1234"));
console.log("Members created:", AcademyMember.totalMembers);

/*
 * Type errors
 *
 * Uncomment one example at a time and run `tsc`.
 */

// const invalidMember = new AcademyMember("Alan", "alan@example.com", "1234");
// lessonFourStudent.id = 10;
// console.log(lessonFourStudent._score);
// console.log(lessonFourStudent.#accessCode);

// class IncompleteMember extends AcademyMember {
//   public constructor(name: string, email: string, code: string) {
//     super(name, email, code);
//   }
// }
