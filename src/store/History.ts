import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { TRANSACTION_TYPE } from "../types";
import { saveLocalStorage } from "../helpers";

interface HistoryState {
  list: TRANSACTION_TYPE[];
  updateTransactions: (transactions: TRANSACTION_TYPE[]) => void;
  addTransaction: (trans: TRANSACTION_TYPE) => Promise<TRANSACTION_TYPE | null>;
  getTransactionById: (id: string) => TRANSACTION_TYPE | null;
  getTotalAmountByType: (type: "in" | "out") => number;
  deleteTransaction: (id: string) => Promise<TRANSACTION_TYPE | null>;
  updateTransactionsById: (
    id: string,
    updatedTrans: TRANSACTION_TYPE
  ) => Promise<any>;
}

export const useHistoryStore = create<HistoryState>()(
  devtools((set, get) => ({
    list: [],
    updateTransactions: (transactions: TRANSACTION_TYPE[]) =>
      set((_) => ({ list: transactions })),
    addTransaction: async (trans: TRANSACTION_TYPE) => {
      try {
        const { list } = get();
        const newList = [...list, trans];

        await saveLocalStorage("transactions", newList);
        set((_) => ({ list: newList }));

        return trans;
      } catch (error) {
        console.error("Create new transaction failed:", error);
        return null;
      }
    },
    getTransactionById: (id: string) => {
      const { list } = get();

      return list.find((transaction) => transaction.id === id) || null;
    },
    getTotalAmountByType: (type: "in" | "out") => {
      const { list } = get();

      const total = list
        .filter((transaction: TRANSACTION_TYPE) => transaction.type === type)
        .reduce(
          (sum: number, transaction: TRANSACTION_TYPE) =>
            sum + transaction.amount,
          0
        );
      return total;
    },
    deleteTransaction: async (id: string) => {
      try {
        const { list } = get();

        const transactionIndex = list.findIndex(
          (transaction) => transaction.id === id
        );

        if (transactionIndex === -1) {
          console.error("Not found transaction", id);
          return null;
        }

        const targetTrans = list[transactionIndex];
        const updatedList = list.filter((transaction) => transaction.id !== id);

        await saveLocalStorage("transactions", updatedList);
        set((_) => ({ list: updatedList }));

        return targetTrans;
      } catch (error) {
        console.error("Delete transaction by id failed:", error);
        return null;
      }
    },
    updateTransactionsById: async (
      id: string,
      updatedTrans: TRANSACTION_TYPE
    ) => {
      const { list } = get();

      const transactionIndex = list.findIndex(
        (transaction) => transaction.id === id
      );

      if (transactionIndex === -1) {
        console.error("Not found transaction", id);
        return null;
      }

      const updatedList: TRANSACTION_TYPE[] = list.map((item) =>
        item.id === id ? updatedTrans : item
      );

      await saveLocalStorage("transactions", updatedList);
      set((_) => ({ list: updatedList }));

      return updatedTrans;
    },
  }))
);
