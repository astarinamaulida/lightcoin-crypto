let balance = 500.00;

class Account {

  constructor() {
    // Have the account balance start at $0 since that makes more sense.
    this.transaction = [];
  }
  get balance() {
    // calculate the balance using transaction objects.
    let balance = 0;
    for (let t of this.transaction) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transaction.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    // Keep track of the time of the transaction
    if (!this.isAllowed()) return false;
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// DRIVER CODE
const myAccount = new Account("Asta");
console.log('Starting Balance:', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(100, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 50 should be allowed...');
const t3 = new Withdrawal(50, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Oh yeah I still got money!");

console.log('Account Transaction History: ', myAccount.transactions);
