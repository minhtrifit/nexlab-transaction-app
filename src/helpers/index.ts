export const formatNumber = (num: number) => {
  const formatted = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(num / 1000);

  return formatted.replace(",", ".");
};
