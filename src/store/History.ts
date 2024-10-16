import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { TRANSACTION_TYPE } from "../types";

interface HistoryState {
  list: TRANSACTION_TYPE[];
  updateTransactions: (transactions: TRANSACTION_TYPE[]) => void;
  addTransaction: (trans: TRANSACTION_TYPE) => TRANSACTION_TYPE[];
  getTransactionById: (id: string) => TRANSACTION_TYPE | null;
  getTotalAmountByType: (type: "in" | "out") => number;
  deleteTransaction: (id: string) => TRANSACTION_TYPE[] | null;
  updateTransactionsById: (
    id: string,
    updatedTrans: TRANSACTION_TYPE
  ) => TRANSACTION_TYPE[] | null;
}

export const useHistoryStore = create<HistoryState>()(
  devtools((set, get) => ({
    list: [],
    updateTransactions: (transactions: TRANSACTION_TYPE[]) =>
      set((_) => ({ list: transactions })),
    addTransaction: (trans: TRANSACTION_TYPE) => {
      let updatedList: TRANSACTION_TYPE[] = [];

      set((state) => {
        updatedList = [...state.list, trans];

        return {
          list: updatedList,
        };
      });

      return updatedList;
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
    deleteTransaction: (id: string) => {
      let updatedList: TRANSACTION_TYPE[] = [];

      set((state) => {
        const transactionIndex = state.list.findIndex(
          (transaction) => transaction.id === id
        );

        if (transactionIndex !== -1) {
          updatedList = state.list.filter(
            (transaction) => transaction.id !== id
          );

          return {
            list: updatedList,
          };
        }

        return state;
      });

      return updatedList.length > 0 ? updatedList : null;
    },
    updateTransactionsById: (id: string, updatedTrans: TRANSACTION_TYPE) => {
      let transactionIndex = -1;
      const updatedList: TRANSACTION_TYPE[] = [];

      set((state) => {
        transactionIndex = state.list.findIndex(
          (transaction) => transaction.id === id
        );

        if (transactionIndex !== -1) {
          for (let i = 0; i < state.list.length; ++i) {
            if (state.list[i].id === id) {
              updatedList.push(updatedTrans);
            } else {
              updatedList.push(state.list[i]);
            }
          }

          return {
            list: updatedList,
          };
        }

        return state;
      });

      if (transactionIndex === -1) return null;
      else return updatedList;
    },
  }))
);
