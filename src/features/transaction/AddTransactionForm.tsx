import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "../../components/ui/Modal";

import {
    transactionSchema,
    type TransactionFormData,
} from "./transactionSchema";

import { useTransactionStore } from "../../store/useTransactionStore";

interface AddTransactionFormProps {
    open: boolean;
    onClose: () => void;
}

function AddTransactionForm({
    open,
    onClose,
}: AddTransactionFormProps) {
    const addTransaction = useTransactionStore(
        (state) => state.addTransaction,
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            type: "expense",
            date: new Date()
                .toISOString()
                .split("T")[0],

            transactionTime: new Date()
                .toTimeString()
                .slice(0, 5),
        },
    });

    const onSubmit = (
        data: TransactionFormData,
    ) => {
        const transactionDateTime =
            `${data.date}T${data.transactionTime}:00`;

        const transaction = {
            id: crypto.randomUUID(),
            title: data.title,
            amount: data.amount,
            type: data.type,
            category: data.category,
            date: data.date,
            transactionDateTime,
            createdAt: new Date().toISOString(),
        };

        addTransaction(transaction);

        reset();

        onClose();
    };

    return (
        <Modal
            open={open}
            title="Add Transaction"
            onClose={onClose}
        >
            <form
                className="transaction-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="form-group">
                    <label>Transaction Type</label>

                    <select {...register("type")}>
                        <option value="expense">
                            Expense
                        </option>

                        <option value="income">
                            Income
                        </option>
                    </select>

                    {errors.type && (
                        <span className="form-error">
                            {errors.type.message}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Title</label>

                    <input
                        type="text"
                        placeholder="e.g. Grocery Shopping"
                        {...register("title")}
                    />

                    {errors.title && (
                        <span className="form-error">
                            {errors.title.message}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Amount</label>

                    <input
                        type="number"
                        placeholder="Enter amount"
                        step="0.01"
                        {...register("amount", {
                            valueAsNumber: true,
                        })}
                    />

                    {errors.amount && (
                        <span className="form-error">
                            {errors.amount.message}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Category</label>

                    <select {...register("category")}>
                        <option value="">
                            Select category
                        </option>

                        <option value="Food">Food</option>
                        <option value="Bills">Bills</option>
                        <option value="Transport">
                            Transport
                        </option>
                        <option value="Shopping">
                            Shopping
                        </option>
                        <option value="Entertainment">
                            Entertainment
                        </option>
                        <option value="Salary">Salary</option>
                        <option value="Other">Other</option>
                    </select>

                    {errors.category && (
                        <span className="form-error">
                            {errors.category.message}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Date</label>

                    <input
                        type="date"
                        {...register("date")}
                    />

                    {errors.date && (
                        <span className="form-error">
                            {errors.date.message}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label>Time</label>

                    <input
                        type="time"
                        {...register("transactionTime")}
                    />

                    {errors.transactionTime && (
                        <span className="form-error">
                            {errors.transactionTime.message}
                        </span>
                    )}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-button"
                    >
                        Save Transaction
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AddTransactionForm;