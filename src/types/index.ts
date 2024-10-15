export interface CATEGORY_TYPE {
  name: string;
  value: string;
  icon: React.ReactElement;
  bgColor: string;
  textColor: string;
}

export interface TRANSACTION_TYPE {
  id?: string;
  name: string;
  type: "in" | "out";
  category: string;
  date: string;
  amount: number;
}
