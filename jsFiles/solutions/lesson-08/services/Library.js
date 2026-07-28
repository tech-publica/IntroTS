export class SolutionLibrary {
    #books = [];
    add(book) {
        this.#books.push(book);
    }
    findByIsbn(isbn) {
        return this.#books.find((book) => book.isbn === isbn);
    }
    getAll() {
        return [...this.#books];
    }
}
//# sourceMappingURL=Library.js.map