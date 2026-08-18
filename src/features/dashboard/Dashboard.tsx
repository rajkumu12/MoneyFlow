import { useState } from "react";

import { useTransactionStore } from "../../store/useTransactionStore";
import {
    calculateBalance,
    calculateExpenses,
    calculateIncome,
} from "../../utils/transactionUtils";

import IncomeExpenseChart from "./IncomeExpenseChart";
import type { ChartPeriod } from "./chartUtils";
import AddTransactionForm from "../transaction/AddTransactionForm";
import DailyBalance from "./DailyBalance";

function Dashboard() {
    const startingBalance =
        useTransactionStore(
            (state) => state.startingBalance,
        );
    const transactions = useTransactionStore(
        (state) => state.transactions,
    );
    const [showAddForm, setShowAddForm] = useState(false);

    const [period, setPeriod] =
        useState<ChartPeriod>("month");

    const totalIncome =
        calculateIncome(transactions);

    const totalExpenses =
        calculateExpenses(transactions);

    const balance =
        calculateBalance(
            transactions,
            startingBalance,
        );

    const recentTransactions =
        [...transactions]
            .sort(
                (a, b) =>
                    new Date(
                        b.transactionDateTime,
                    ).getTime() -
                    new Date(
                        a.transactionDateTime,
                    ).getTime(),
            )
            .slice(0, 5);

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDateTime = (
        dateTime: string,
    ) => {
        return new Date(
            dateTime,
        ).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="page-header">
                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Here's your financial overview.
                    </p>
                </div>

                <button
                    className="add-button"
                    onClick={() => setShowAddForm(true)}
                >
                    + Add Transaction
                </button>
            </header>

            {/* Summary */}
            <section className="summary-grid">
                <div className="summary-card balance-card">
                    <span>Current Balance</span>

                    <h2>
                        {formatAmount(balance)}
                    </h2>

                    <small>
                        Available balance
                    </small>
                </div>

                <div className="summary-card">
                    <span>Total Income</span>

                    <h2>
                        {formatAmount(totalIncome)}
                    </h2>

                    <small>
                        All recorded income
                    </small>
                </div>

                <div className="summary-card">
                    <span>Total Expenses</span>

                    <h2>
                        {formatAmount(totalExpenses)}
                    </h2>

                    <small>
                        All recorded expenses
                    </small>
                </div>
            </section>

            {/* Main dashboard */}
            <section className="dashboard-grid">
                {/* Chart */}
                <div className="panel">
                    <div className="panel-header">
                        <div>
                            <h3>
                                Income vs Expenses
                            </h3>

                            <p className="panel-subtitle">
                                Track your financial activity
                            </p>
                        </div>

                        <select
                            value={period}
                            onChange={(event) =>
                                setPeriod(
                                    event.target.value as ChartPeriod,
                                )
                            }
                        >
                            <option value="week">
                                This Week
                            </option>

                            <option value="month">
                                This Month
                            </option>

                            <option value="year">
                                This Year
                            </option>
                        </select>
                    </div>

                    <IncomeExpenseChart
                        transactions={transactions}
                        period={period}
                    />
                </div>

                {/* Recent Transactions */}
                <div className="panel">
                    <div className="panel-header">
                        <div>
                            <h3>
                                Recent Transactions
                            </h3>

                            <p className="panel-subtitle">
                                Latest activity
                            </p>
                        </div>
                    </div>

                    {recentTransactions.length === 0 ? (
                        <div className="empty-state">
                            No transactions yet.
                        </div>
                    ) : (
                        recentTransactions.map(
                            (transaction) => (
                                <div
                                    className="transaction"
                                    key={transaction.id}
                                >
                                    <div>
                                        <strong>
                                            {transaction.title}
                                        </strong>

                                        <small>
                                            {formatDateTime(
                                                transaction.transactionDateTime,
                                            )}{" "}
                                            • {transaction.category}
                                        </small>
                                    </div>

                                    <span
                                        className={
                                            transaction.type ===
                                                "income"
                                                ? "income"
                                                : "expense"
                                        }
                                    >
                                        {transaction.type ===
                                            "income"
                                            ? "+"
                                            : "-"}
                                        {formatAmount(
                                            transaction.amount,
                                        )}
                                    </span>
                                </div>
                            ),
                        )
                    )}
                </div>
            </section>
            <DailyBalance />
            <AddTransactionForm
                open={showAddForm}
                onClose={() => setShowAddForm(false)}
            />
        </div>
    );
}

export default Dashboard;