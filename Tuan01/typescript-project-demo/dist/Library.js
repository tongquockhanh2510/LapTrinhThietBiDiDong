"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`Added book: ${book.title} by ${book.author}`);
    }
    addUser(user) {
        this.users.push(user);
        console.log(`Added user: ${user.name}`);
    }
    listBooks() {
        return this.books;
    }
    findBookByTitle(title) {
        return this.books.find(b => String(b.title) === title);
    }
}
exports.Library = Library;
