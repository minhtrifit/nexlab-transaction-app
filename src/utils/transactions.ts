import { TRANSACTION_TYPE } from "../types";
import { CATEGORIES } from "./categories";

export const TRANSACTION_DATA: TRANSACTION_TYPE[] = [
  {
    id: "1",
    name: "Sport",
    type: "out",
    category: CATEGORIES.gym.value,
    date: "15/10/2024",
    amount: 2000,
  },
  {
    id: "2",
    name: "Send Money",
    type: "in",
    category: CATEGORIES.tickets.value,
    date: "05/08/2024",
    amount: 55000,
  },
  {
    id: "3",
    name: "Louis Vuituoi",
    type: "out",
    category: CATEGORIES.clothes.value,
    date: "04/03/2024",
    amount: 3380,
  },
  {
    id: "4",
    name: "Hadilao",
    type: "out",
    category: CATEGORIES.food.value,
    date: "15/10/2024",
    amount: 10000,
  },
  {
    id: "5",
    name: "Haiwai",
    type: "out",
    category: CATEGORIES.travel.value,
    date: "14/04/2024",
    amount: 7000,
  },
  {
    id: "6",
    name: "Company Office",
    type: "in",
    category: CATEGORIES.transport.value,
    date: "08/03/2024",
    amount: 24,
  },
];
