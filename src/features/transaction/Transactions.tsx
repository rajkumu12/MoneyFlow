import { useMemo, useState } from "react";
import { useTransactionStore } from "../../store/useTransactionStore";
import AddTransactionForm from "./AddTransactionForm";

function Transactions() {
    const transactions = useTransactionStore(
        (state) => state.transactions,
    );

    const deleteTransaction = useTransactionStore(
        (state) => state.deleteTransaction,
    );

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const categories = useMemo(() => {
        return [...new Set(transactions.map((item) => item.category))];
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const matchesSearch = transaction.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesType =
                typeFilter === "all" ||
                transaction.type === typeFilter;

            const matchesCategory =
                categoryFilter === "all" ||
                transaction.category === categoryFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );
        });
    }, [
        transactions,
        search,
        typeFilter,
        categoryFilter,
    ]);

    const [showAddForm, setShowAddForm] = useState(false);

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
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };
    return (
        <div className="transactions-page">
            <header className="page-header">
                <div>
                    <h1>Transactions</h1>
                    <p>Manage your income and expenses.</p>
                </div>

                <button
                    className="add-button"
                    onClick={() => setShowAddForm(true)}
                >
                    + Add Transaction
                </button>
            </header>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                <select
                    value={typeFilter}
                    onChange={(event) =>
                        setTypeFilter(event.target.value)
                    }
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select
                    value={categoryFilter}
                    onChange={(event) =>
                        setCategoryFilter(event.target.value)
                    }
                >
                    <option value="all">All Categories</option>

                    {categories.map((category) => (
                        <option
                            key={category}
                            value={category}
                        >
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="transactions-panel">
                <div className="transaction-table-header">
                    <span>Description</span>
                    <span>Category</span>
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Action</span>
                </div>

                {filteredTransactions.length === 0 ? (
                    <div className="empty-state">
                        No transactions found.
                    </div>
                ) : (
                    filteredTransactions.map((transaction) => (
                        <div
                            className="transaction-table-row"
                            key={transaction.id}
                        >
                            <div>
                                <strong>{transaction.title}</strong>
                            </div>

                            <span>{transaction.category}</span>

                            <span>
                                {formatDateTime(
                                    transaction.transactionDateTime,
                                )}
                            </span>

                            <span
                                className={
                                    transaction.type === "income"
                                        ? "income"
                                        : "expense"
                                }
                            >
                                {transaction.type === "income"
                                    ? "+"
                                    : "-"}
                                {formatAmount(transaction.amount)}
                            </span>

                            <button
                                className="delete-button"
                                onClick={() =>
                                    deleteTransaction(transaction.id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
            <AddTransactionForm
                open={showAddForm}
                onClose={() => setShowAddForm(false)}
            />
        </div>
    );
}

export default Transactions;