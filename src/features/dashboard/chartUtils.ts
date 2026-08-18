import type { Transaction } from "../../types/transaction";

export type ChartPeriod =
  | "week"
  | "month"
  | "year";

export interface ChartData {
  label: string;
  income: number;
  expense: number;
}

function isSameDay(
  date: Date,
  target: Date,
) {
  return (
    date.getFullYear() === target.getFullYear() &&
    date.getMonth() === target.getMonth() &&
    date.getDate() === target.getDate()
  );
}

export function createChartData(
  transactions: Transaction[],
  period: ChartPeriod,
): ChartData[] {
  const now = new Date();

  if (period === "week") {
    const result: ChartData[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);

      date.setDate(now.getDate() - i);

      let income = 0;
      let expense = 0;

      transactions.forEach((transaction) => {
        const transactionDate = new Date(
          transaction.date,
        );

        if (
          isSameDay(
            transactionDate,
            date,
          )
        ) {
          if (transaction.type === "income") {
            income += transaction.amount;
          } else {
            expense += transaction.amount;
          }
        }
      });

      result.push({
        label: date.toLocaleDateString(
          "en-IN",
          {
            weekday: "short",
          },
        ),
        income,
        expense,
      });
    }

    return result;
  }

  if (period === "month") {
    const result: ChartData[] = [];

    const year = now.getFullYear();
    const month = now.getMonth();

    const daysInMonth = new Date(
      year,
      month + 1,
      0,
    ).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      let income = 0;
      let expense = 0;

      transactions.forEach((transaction) => {
        const date = new Date(
          transaction.date,
        );

        if (
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === day
        ) {
          if (transaction.type === "income") {
            income += transaction.amount;
          } else {
            expense += transaction.amount;
          }
        }
      });

      result.push({
        label: String(day),
        income,
        expense,
      });
    }

    return result;
  }

  const result: ChartData[] = [];

  for (let month = 0; month < 12; month++) {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      const date = new Date(
        transaction.date,
      );

      if (
        date.getFullYear() ===
          now.getFullYear() &&
        date.getMonth() === month
      ) {
        if (transaction.type === "income") {
          income += transaction.amount;
        } else {
          expense += transaction.amount;
        }
      }
    });

    result.push({
      label: new Date(
        now.getFullYear(),
        month,
        1,
      ).toLocaleDateString("en-IN", {
        month: "short",
      }),
      income,
      expense,
    });
  }

  return result;
}