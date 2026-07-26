"use strict";
/*
 * LESSON 4
 * Interfaces and object-oriented TypeScript
 */
console.log("--- Lesson 4: interfaces and classes ---");
// An abstract class provides shared code but cannot be instantiated directly.
class AcademyMember {
    displayName;
    static nextId = 1;
    static memberCount = 0;
    id;
    _email;
    #accessCode;
    /*
     * `public displayName` is a parameter property. TypeScript declares the
     * property and assigns the argument automatically.
     */
    constructor(displayName, email, accessCode) {
        this.displayName = displayName;
        this.id = AcademyMember.nextId;
        AcademyMember.nextId += 1;
        AcademyMember.memberCount += 1;
        this._email = email;
        this.#accessCode = accessCode;
    }
    static get totalMembers() {
        return AcademyMember.memberCount;
    }
    get email() {
        return this._email;
    }
    set email(newEmail) {
        if (!newEmail.includes("@")) {
            throw new Error("The email address must contain @.");
        }
        this._email = newEmail;
    }
    hasAccessCode(code) {
        return this.#accessCode === code;
    }
    describe() {
        return `${this.displayName} is a ${this.getRole()}.`;
    }
}
class AcademyStudent extends AcademyMember {
    _score;
    /*
     * `_score` is also a parameter property. The `private` modifier declares it,
     * initializes it, and prevents access from outside this class.
     */
    constructor(displayName, email, accessCode, _score = 0) {
        super(displayName, email, accessCode);
        this._score = _score;
    }
    get score() {
        return this._score;
    }
    set score(newScore) {
        if (newScore < 0 || newScore > 100) {
            throw new Error("The score must be between 0 and 100.");
        }
        this._score = newScore;
    }
    getRole() {
        return "student";
    }
    verifyAccess(code) {
        return this.hasAccessCode(code);
    }
}
class AcademyTeacher extends AcademyMember {
    subject;
    constructor(displayName, email, accessCode, subject) {
        super(displayName, email, accessCode);
        this.subject = subject;
    }
    getRole() {
        return `${this.subject} teacher`;
    }
}
const lessonFourStudent = new AcademyStudent("Ada", "ada@example.com", "TS-1234", 85);
const lessonFourTeacher = new AcademyTeacher("Grace", "grace@example.com", "ADMIN-42", "computer science");
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
//# sourceMappingURL=lesson-04.js.map