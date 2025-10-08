"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPayment = void 0;
class CardPayment {
    constructor(cardNumber) {
        this.cardNumber = cardNumber;
    }
    pay(amount) {
        console.log(`Paid ${amount} using card ending with ${this.cardNumber.slice(-4)}.`);
    }
}
exports.CardPayment = CardPayment;
