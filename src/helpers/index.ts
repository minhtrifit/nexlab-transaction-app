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
