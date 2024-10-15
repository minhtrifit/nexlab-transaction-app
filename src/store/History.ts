import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { CATEGORIES } from "../utils/categories";
import { TRANSACTION_TYPE } from "../types";

interface HistoryState {
  list: TRANSACTION_TYPE[];
  addTransaction: (trans: TRANSACTION_TYPE) => void;
  getTransactionById: (id: string) => TRANSACTION_TYPE | null;
  getTotalAmountByType: (type: "in" | "out") => number;
}

export const useHistoryStore = create<HistoryState>()(
  devtools((set, get) => ({
    list: [
      {
        id: uuidv4(),
        name: "Sport",
        type: "out",
        category: CATEGORIES.gym.value,
        date: "15/10/2024",
        amount: 2000,
      },
      {
        id: uuidv4(),
        name: "Send Money",
        type: "in",
        category: CATEGORIES.tickets.value,
        date: "5/8/2024",
        amount: 55000,
      },
      {
        id: uuidv4(),
        name: "Louis Vuituoi",
        type: "out",
        category: CATEGORIES.clothes.value,
        date: "4/3/2024",
        amount: 3380,
      },
      {
        id: uuidv4(),
        name: "Hadilao",
        type: "out",
        category: CATEGORIES.food.value,
        date: "15/10/2024",
        amount: 10000,
      },
      {
        id: uuidv4(),
        name: "Haiwai",
        type: "out",
        category: CATEGORIES.travel.value,
        date: "14/4/2024",
        amount: 7000,
      },
      {
        id: uuidv4(),
        name: "Company Office",
        type: "in",
        category: CATEGORIES.transport.value,
        date: "8/3/2024",
        amount: 24,
      },
    ],
    addTransaction: (trans: TRANSACTION_TYPE) =>
      set((state) => ({ list: [...state.list, trans] })),
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
  }))
);
