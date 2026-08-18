import { useEffect, useState } from "react";

import { useTransactionStore } from "../../store/useTransactionStore";

function Settings() {
  const startingBalance =
    useTransactionStore(
      (state) => state.startingBalance,
    );

  const setStartingBalance =
    useTransactionStore(
      (state) => state.setStartingBalance,
    );

  const [amount, setAmount] = useState(
    String(startingBalance),
  );

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    setAmount(String(startingBalance));
  }, [startingBalance]);

  const handleSave = () => {
    const value = Number(amount);

    if (Number.isNaN(value) || value < 0) {
      return;
    }

    setStartingBalance(value);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="settings-page">
      <header className="page-header">
        <div>
          <h1>Settings</h1>

          <p>
            Manage your MoneyFlow preferences.
          </p>
        </div>
      </header>

      <div className="settings-card">
        <div className="settings-section">
          <h3>Balance</h3>

          <p className="settings-description">
            Set the amount of money you had
            before starting to track
            transactions.
          </p>

          <div className="form-group">
            <label>
              Starting Balance
            </label>

            <div className="amount-input">
              <span>₹</span>

              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) =>
                  setAmount(
                    event.target.value,
                  )
                }
              />
            </div>
          </div>

          <button
            className="save-button"
            onClick={handleSave}
          >
            Save Balance
          </button>

          {saved && (
            <span className="saved-message">
              Balance saved successfully.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;