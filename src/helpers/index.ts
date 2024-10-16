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

export const getLocalStorage = (key: string) => {
  const dataStr = localStorage.getItem(key);

  if (dataStr === null) return null;
  else {
    const data = JSON.parse(dataStr);
    return data;
  }
};

export const saveLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
  return data;
};

export const handleGetTransactionData = (
  TRANSACTION_DATA: TRANSACTION_TYPE[],
  updateTransactions: (transactions: TRANSACTION_TYPE[]) => void
) => {
  const checkData = getLocalStorage("transactions");

  if (checkData === null) {
    const data = saveLocalStorage("transactions", TRANSACTION_DATA);
    updateTransactions(data);
  } else updateTransactions(checkData);
};
