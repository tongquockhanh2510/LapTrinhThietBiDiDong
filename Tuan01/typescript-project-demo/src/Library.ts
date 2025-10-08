import { Book } from "./Book";
import { User } from "./User";

export class Library {
  private books: Book[] = [];
  private users: User[] = [];

  addBook(book: Book): void {
    this.books.push(book);
    console.log(`Added book: ${book.title} by ${book.author}`);
  }

  addUser(user: User): void {
    this.users.push(user);
    console.log(`Added user: ${user.name}`);
  }

  listBooks(): Book[] {
    return this.books;
  }

  findBookByTitle(title: string): Book | undefined {
    return this.books.find(b => String(b.title) === title);
  }
}
