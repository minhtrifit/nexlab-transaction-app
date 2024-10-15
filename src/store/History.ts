import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { CATEGORIES } from "../utils/categories";
import { TRANSACTION_TYPE } from "../types";

interface HistoryState {
  list: TRANSACTION_TYPE[];
  addTransaction: (trans: TRANSACTION_TYPE) => void;
}

export const useHistoryStore = create<HistoryState>()(
  devtools((set) => ({
    list: [
      {
        id: uuidv4(),
        name: "Sport",
        type: "out",
        category: CATEGORIES.gym,
        date: "15/10/2024",
        amount: 2000,
      },
      {
        id: uuidv4(),
        name: "Send Money",
        type: "in",
        category: CATEGORIES.tickets,
        date: "5/8/2024",
        amount: 55000,
      },
      {
        id: uuidv4(),
        name: "Louis Vuituoi",
        type: "out",
        category: CATEGORIES.clothes,
        date: "4/3/2024",
        amount: 3380,
      },
      {
        id: uuidv4(),
        name: "Hadilao",
        type: "out",
        category: CATEGORIES.food,
        date: "15/10/2024",
        amount: 10000,
      },
      {
        id: uuidv4(),
        name: "Haiwai",
        type: "out",
        category: CATEGORIES.travel,
        date: "14/4/2024",
        amount: 7000,
      },
      {
        id: uuidv4(),
        name: "Company Office",
        type: "in",
        category: CATEGORIES.transport,
        date: "8/3/2024",
        amount: 24,
      },
    ],
    addTransaction: (trans: TRANSACTION_TYPE) =>
      set((state) => ({ list: [...state.list, trans] })),
  }))
);
