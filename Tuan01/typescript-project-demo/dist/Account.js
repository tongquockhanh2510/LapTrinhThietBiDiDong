"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(account, balance, owner) {
        this.account = account;
        this.balance = balance;
        this.owner = owner;
    }
}
exports.Account = Account;
const account1 = new Account(12345, 1234, "TongQuocKhanh");
console.log(account1);
