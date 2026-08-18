import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Transaction } from "../types/transaction";


interface TransactionState {
    transactions: Transaction[];

    startingBalance: number;

    addTransaction: (
        transaction: Transaction,
    ) => void;

    deleteTransaction: (
        id: string,
    ) => void;

    setStartingBalance: (
        amount: number,
    ) => void;
}

export const useTransactionStore =
    create<TransactionState>()(
        persist(
            (set) => ({
                transactions: [
                   
                ],
                startingBalance: 0,

                addTransaction: (transaction) =>
                    set((state) => ({
                        transactions: [
                            transaction,
                            ...state.transactions,
                        ],
                    })),

                deleteTransaction: (id) =>
                    set((state) => ({
                        transactions:
                            state.transactions.filter(
                                (transaction) =>
                                    transaction.id !== id,
                            ),
                    })),
                setStartingBalance: (amount) =>
                    set({
                        startingBalance: amount,
                    }),
            }),
            {
                name: "money-flow-transactions",
            },
        ),
    );