import { useMemo } from "react";

import { useTransactionStore } from "../../store/useTransactionStore";

import { calculateDailyBalances } from "../../utils/dailyBalanceUtils";

function DailyBalance() {
  const transactions = useTransactionStore(
    (state) => state.transactions,
  );

  const startingBalance =
    useTransactionStore(
      (state) => state.startingBalance,
    );

  const dailyBalances = useMemo(
    () =>
      calculateDailyBalances(
        transactions,
        startingBalance,
      ),
    [transactions, startingBalance],
  );

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="panel daily-balance-panel">
      <div className="panel-header">
        <div>
          <h3>Daily Balance</h3>

          <p className="panel-subtitle">
            Opening and closing balance
          </p>
        </div>
      </div>

      {dailyBalances.length === 0 ? (
        <div className="empty-state">
          No balance history yet.
        </div>
      ) : (
        <div className="daily-balance-list">
          {dailyBalances.map((day) => (
            <div
              className="daily-balance-row"
              key={day.date}
            >
              <div className="daily-date">
                <strong>
                  {new Date(
                    `${day.date}T00:00:00`,
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                    },
                  )}
                </strong>

                <small>
                  Opening{" "}
                  {formatAmount(
                    day.openingBalance,
                  )}
                </small>
              </div>

              <div className="daily-values">
                <span className="income">
                  +{formatAmount(day.income)}
                </span>

                <span className="expense">
                  -{formatAmount(day.expenses)}
                </span>
              </div>

              <div className="daily-closing">
                <small>Closing</small>

                <strong>
                  {formatAmount(
                    day.closingBalance,
                  )}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyBalance;