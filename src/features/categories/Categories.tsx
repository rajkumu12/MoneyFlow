import { useMemo, useState } from "react";
import { useTransactionStore } from "../../store/useTransactionStore";

interface CategoryConfig {
  name: string;
  icon: string;
  description: string;
}

const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    name: "Food",
    icon: "🍔",
    description: "Restaurants, groceries & meals",
  },
  {
    name: "Bills",
    icon: "🧾",
    description: "Utilities, rent & subscriptions",
  },
  {
    name: "Transport",
    icon: "🚗",
    description: "Fuel, taxi & public transport",
  },
  {
    name: "Shopping",
    icon: "🛍️",
    description: "Clothing, electronics & purchases",
  },
  {
    name: "Entertainment",
    icon: "🎬",
    description: "Movies, games & activities",
  },
  {
    name: "Salary",
    icon: "💰",
    description: "Salary & regular income",
  },
  {
    name: "Other",
    icon: "📦",
    description: "Other transactions",
  },
];

function Categories() {
  const transactions = useTransactionStore(
    (state) => state.transactions,
  );

  const [search, setSearch] = useState("");

  const categoryData = useMemo(() => {
    const expenses = transactions.filter(
      (transaction) =>
        transaction.type === "expense",
    );

    const totalExpenses = expenses.reduce(
      (total, transaction) =>
        total + transaction.amount,
      0,
    );

    return CATEGORY_CONFIG.map((category) => {
      const categoryTransactions =
        transactions.filter(
          (transaction) =>
            transaction.category ===
            category.name,
        );

      const categoryExpenses =
        categoryTransactions.filter(
          (transaction) =>
            transaction.type === "expense",
        );

      const amount = categoryExpenses.reduce(
        (total, transaction) =>
          total + transaction.amount,
        0,
      );

      const percentage =
        totalExpenses > 0
          ? (amount / totalExpenses) * 100
          : 0;

      return {
        ...category,
        amount,
        percentage,
        transactionCount:
          categoryTransactions.length,
      };
    });
  }, [transactions]);

  const filteredCategories =
    categoryData.filter((category) =>
      category.name
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  const totalExpenses = categoryData.reduce(
    (total, category) =>
      total + category.amount,
    0,
  );

  const activeCategories =
    categoryData.filter(
      (category) => category.amount > 0,
    ).length;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="categories-page">
      {/* Header */}
      <header className="page-header categories-header">
        <div>
          <h1>Categories</h1>

          <p>
            Understand where your money is
            going.
          </p>
        </div>

        <button className="add-button">
          + Add Category
        </button>
      </header>

      {/* Overview */}
      <section className="category-overview">
        <div className="category-overview-card">
          <div className="overview-icon">
            ₹
          </div>

          <div>
            <span>Total Spending</span>

            <strong>
              {formatAmount(totalExpenses)}
            </strong>

            <small>
              Across all categories
            </small>
          </div>
        </div>

        <div className="category-overview-card">
          <div className="overview-icon">
            #
          </div>

          <div>
            <span>Active Categories</span>

            <strong>
              {activeCategories}
            </strong>

            <small>
              Categories with spending
            </small>
          </div>
        </div>

        <div className="category-overview-card">
          <div className="overview-icon">
            ↗
          </div>

          <div>
            <span>Transactions</span>

            <strong>
              {transactions.length}
            </strong>

            <small>
              Total recorded transactions
            </small>
          </div>
        </div>
      </section>

      {/* Category section */}
      <section className="categories-section">
        <div className="categories-section-header">
          <div>
            <h2>Spending Categories</h2>

            <p>
              Your spending distribution by
              category.
            </p>
          </div>

          <div className="category-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="category-empty">
            <div>🔎</div>

            <h3>
              No category found
            </h3>

            <p>
              Try searching for another
              category.
            </p>
          </div>
        ) : (
          <div className="category-grid">
            {filteredCategories.map(
              (category) => (
                <div
                  className="category-card"
                  key={category.name}
                >
                  <div className="category-card-top">
                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <button className="category-menu">
                      •••
                    </button>
                  </div>

                  <div className="category-card-content">
                    <h3>
                      {category.name}
                    </h3>

                    <p>
                      {category.description}
                    </p>

                    <div className="category-amount">
                      {formatAmount(
                        category.amount,
                      )}
                    </div>

                    <div className="category-meta">
                      <span>
                        {
                          category.transactionCount
                        }{" "}
                        transactions
                      </span>

                      <strong>
                        {Math.round(
                          category.percentage,
                        )}
                        %
                      </strong>
                    </div>

                    <div className="category-progress">
                      <div
                        className="category-progress-value"
                        style={{
                          width: `${Math.min(
                            category.percentage,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Categories;