"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    deposit(amount) {
        this.balance += amount;
        return this.balance;
    }
    withdraw(amount) {
        if (amount > this.balance)
            throw new Error("Số dư không đủ để rút tiền");
        this.balance -= amount;
        return this.balance;
    }
}
exports.BankAccount = BankAccount;
