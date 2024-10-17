import { TRANSACTION_TYPE } from "../types";
import { CATEGORIES } from "../utils/categories";

export const formatNumber = (num: number) => {
  const formatted = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(num / 1000);

  return formatted.replace(",", ".");
};

export const getCategoryByValue = (value: string) => {
  return CATEGORIES[value] || null;
};

// Format yyyy/mm/dd => dd/mm/yyyy
export const formatDate = (dateStr: string) => {
  const parts = dateStr.split("-");

  if (parts.length !== 3) {
    throw new Error("Invalid date format. Please use yyyy/mm/dd format.");
  }

  const year = parts[0]; // yyyy
  const month = parts[1]; // mm
  const day = parts[2]; // dd

  // Return the date in dd/mm/yyyy format
  return `${day}/${month}/${year}`;
};

// Format dd/mm/yyyy => yyyy/mm/dd
export const formatDateInput = (dateStr: string) => {
  const parts = dateStr.split("/");

  if (parts.length !== 3) {
    throw new Error("Invalid date format. Please use dd/mm/yyyy format.");
  }

  const day = parts[0]; // dd
  const month = parts[1]; // mm
  const year = parts[2]; // yyyy

  // Return the date in yyyy/mm/dd fomat
  return `${year}-${month}-${day}`;
};

export const getLocalStorage = (key: string): Promise<any | null> => {
  return new Promise((resolve) => {
    const dataStr = localStorage.getItem(key);

    if (dataStr === null) {
      resolve(null);
    } else {
      const data = JSON.parse(dataStr);
      resolve(data);
    }
  });
};

export const saveLocalStorage = (key: string, data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const handleGetTransactionData = async (
  TRANSACTION_DATA: TRANSACTION_TYPE[],
  updateTransactions: (transactions: TRANSACTION_TYPE[]) => void
) => {
  const res = await getLocalStorage("transactions");

  if (res === null) {
    const data = await saveLocalStorage("transactions", TRANSACTION_DATA);
    updateTransactions(data);
  } else {
    updateTransactions(res);
  }
};

export const handleGetTotalAmountByType = (
  list: TRANSACTION_TYPE[],
  type: "in" | "out"
) => {
  const total = list
    .filter((transaction: TRANSACTION_TYPE) => transaction.type === type)
    .reduce(
      (sum: number, transaction: TRANSACTION_TYPE) => sum + transaction.amount,
      0
    );
  return total;
};
