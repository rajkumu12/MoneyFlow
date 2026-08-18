import type { Transaction } from "../types/transaction";

export interface DailyBalance {
  date: string;
  openingBalance: number;
  income: number;
  expenses: number;
  closingBalance: number;
}


export function calculateDailyBalances(
  transactions: Transaction[],
  startingBalance: number,
): DailyBalance[] {
  if (transactions.length === 0) {
    return [];
  }

  const dates = [
    ...new Set(
      transactions.map(
        (transaction) => transaction.date,
      ),
    ),
  ].sort();

  let runningBalance = startingBalance;

  return dates.map((date) => {
    const dayTransactions =
      transactions.filter(
        (transaction) =>
          transaction.date === date,
      );

    const income = dayTransactions
      .filter(
        (transaction) =>
          transaction.type === "income",
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0,
      );

    const expenses = dayTransactions
      .filter(
        (transaction) =>
          transaction.type === "expense",
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0,
      );

    const openingBalance = runningBalance;

    const closingBalance =
      openingBalance +
      income -
      expenses;

    runningBalance = closingBalance;

    return {
      date,
      openingBalance,
      income,
      expenses,
      closingBalance,
    };
  });
}