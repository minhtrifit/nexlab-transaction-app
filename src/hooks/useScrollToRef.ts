import { useRef } from "react";

const useScrollToRef = (): [any, () => void] => {
  const ref = useRef<HTMLElement>(null);

  const scrollTo = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return [ref, scrollTo];
};

export default useScrollToRef;
