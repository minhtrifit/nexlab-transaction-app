export const totalSpending = 60700;
export const totalIncome = 30518;

export const chartSpendingData = {
  labels: ["gym", "tickets", "clothes", "food", "travel", "transport"],
  datasets: [
    {
      label: "Total Spending",
      data: [18, 21, 19, 16, 7, 3],
      backgroundColor: [
        "#1db878",
        "#2ad1a7",
        "#e68c3e",
        "#e65f40",
        "#4eb5de",
        "#b36ef0",
      ],
      borderColor: [
        "#1db878",
        "#2ad1a7",
        "#e68c3e",
        "#e65f40",
        "#4eb5de",
        "#b36ef0",
      ],
      borderWidth: 1,
    },
  ],
};

export const chartIncomeData = {
  labels: ["gym", "tickets", "clothes", "food", "travel", "transport"],
  datasets: [
    {
      label: "Total Spending",
      data: [4, 30, 6, 12, 8, 40],
      backgroundColor: [
        "#1db878",
        "#2ad1a7",
        "#e68c3e",
        "#e65f40",
        "#4eb5de",
        "#b36ef0",
      ],
      borderColor: [
        "#1db878",
        "#2ad1a7",
        "#e68c3e",
        "#e65f40",
        "#4eb5de",
        "#b36ef0",
      ],
      borderWidth: 1,
    },
  ],
};

export const chartOptions: any = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      // display: false,
    },
  },
};
