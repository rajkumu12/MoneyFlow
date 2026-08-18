export type TransactionType = "income" | "expense";


export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;

  // YYYY-MM-DD
  date: string;

  // Full transaction date and time
  transactionDateTime: string;

  createdAt: string;
}