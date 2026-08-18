import type { Transaction } from "../types/transaction";

export function calculateIncome(
  transactions: Transaction[],
): number {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === "income",
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0,
    );
}

export function calculateExpenses(
  transactions: Transaction[],
): number {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === "expense",
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0,
    );
}

export function calculateBalance(
  transactions: Transaction[],
  startingBalance: number = 0,
): number {
  const income =
    calculateIncome(transactions);

  const expenses =
    calculateExpenses(transactions);

  return (
    startingBalance +
    income -
    expenses
  );
}