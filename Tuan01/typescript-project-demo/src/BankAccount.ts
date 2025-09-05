export class BankAccount {
    balance: number;

    constructor(balance :number){
        this.balance = balance;
    }

    deposit(amount: number): number{
         this.balance += amount;
         return this.balance;
    }
    withdraw(amount: number): number{
        if( amount > this.balance)
            throw new Error("Số dư không đủ để rút tiền")
       this.balance -= amount;
         return this.balance;
    }

}