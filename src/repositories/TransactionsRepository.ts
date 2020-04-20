import Transaction from '../models/Transaction';

interface TransactionsList {
  transactions: Transaction[];
  balance: Balance;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsList {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(inc => inc.type === 'income')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );

    const outcome = this.transactions
      .filter(inc => inc.type === 'outcome')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
