export interface CATEGORY_TYPE {
  name: string;
  value: string;
  icon: React.ReactElement;
  bgColor: string;
  textColor: string;
}

export interface TRANSACTION_TYPE {
  id: string | number;
  name: string;
  type: "in" | "out";
  category: CATEGORY_TYPE;
  date: string;
  amount: number;
}
