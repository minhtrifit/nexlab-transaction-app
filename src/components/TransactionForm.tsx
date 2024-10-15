import { TRANSACTION_TYPE } from "../types";
import { CATEGORIES } from "../utils/categories";
import CustomBtn from "./CustomBtn";

interface PropType {
  form: TRANSACTION_TYPE;
  setForm: React.Dispatch<React.SetStateAction<TRANSACTION_TYPE>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const TransactionForm = (props: PropType) => {
  const { form, setForm, handleSubmit } = props;

  return (
    <form
      className="my-5 w-full flex flex-col gap-3"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label
        htmlFor="trans-name"
        className="text-sm font-bold text-primary-green"
      >
        Name
      </label>
      <input
        required
        id="trans-name"
        className="px-2 py-1 border border-primary-green rounded-md p-2
                focus:border-green-400 focus:outline-none"
        value={form.name}
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
        }}
      />

      <label
        htmlFor="trans-type"
        className="text-sm font-bold text-primary-green"
      >
        Type
      </label>
      <select
        id="trans-type"
        className="border border-primary-green p-2 rounded-md shadow
                focus:border-green-400 focus:outline-none"
        value={form.type}
        onChange={(e: any) => {
          setForm({ ...form, type: e.target.value });
        }}
      >
        <option defaultValue="" disabled>
          Select an type
        </option>
        <option value="in">Money in</option>
        <option value="out">Money out</option>
      </select>

      <label
        htmlFor="trans-amount"
        className="text-sm font-bold text-primary-green"
      >
        Amount
      </label>
      <input
        type="number"
        id="trans-amount"
        min="1"
        step="1"
        className="border border-primary-green p-2 rounded-md shadow
                focus:border-green-400 focus:outline-none"
        value={form.amount}
        onChange={(e: any) => {
          setForm({ ...form, amount: e.target.value });
        }}
      />

      <label
        htmlFor="trans-cate"
        className="text-sm font-bold text-primary-green"
      >
        Category
      </label>
      <select
        id="trans-cate"
        value={form.category}
        onChange={(e: any) => {
          setForm({ ...form, category: e.target.value });
        }}
        className="border border-primary-green p-2 rounded-md shadow
                focus:border-green-400 focus:outline-none"
      >
        <option value="" disabled>
          Select a category
        </option>
        {Object.entries(CATEGORIES).map(([key, { name }]) => (
          <option key={key} value={CATEGORIES[key].value}>
            {name}
          </option>
        ))}
      </select>

      <label
        htmlFor="trans-date"
        className="text-sm font-bold text-primary-green"
      >
        Date
      </label>

      <input
        type="date"
        id="trans-date"
        value={form.date}
        onChange={(e: any) => {
          setForm({ ...form, date: e.target.value });
        }}
        className="border border-primary-green p-2 rounded-md focus:outline-none focus:border-green-400"
      />

      <div className="mt-3">
        <CustomBtn text="Submit" type="submit" />
      </div>
    </form>
  );
};

export default TransactionForm;
