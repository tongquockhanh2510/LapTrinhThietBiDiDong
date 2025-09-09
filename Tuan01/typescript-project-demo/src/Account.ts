export class Account{
    private account: number;
    public balance : number;
    public readonly owner: string;

    constructor(account: number, balance: number, owner: string){
        this.account = account;
        this.balance= balance;
        this.owner = owner;
    }
}

const account1 = new Account(12345, 1234,"TongQuocKhanh");
console.log(account1)