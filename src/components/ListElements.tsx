import { useState, useContext } from "react";
import { AppContext } from "./Context";

interface Props {
  title: string;
  paragraph?: string;
  passengers?: any;
}

export default function ListElements({ title, paragraph, passengers }: Props) {
  const { total, setTotal }: { total: number; setTotal: (num: number) => void } = useContext(AppContext);
  const [count, setCount] = useState<number>(0);

  // These functions add or remove passengers from an array, and set the count of passengers per category
  // as well as the total of passengers

  const handleClickMinus = () => {
    setCount(count - 1);
    setTotal(total - 1);

    passengers.pop();
  };

  const handleClickPlus = () => {
    setCount(count + 1);
    setTotal(total + 1);
    passengers.push({ title, id: count + 1 });
  };

  return (
    <li>
      <span className="right-popup-left-content">
        <h4>{title}</h4>
        <p>{paragraph}</p>
      </span>

      <span className="right-popup-right-content">
        <i
          className={count === 0 ? "fa-solid fa-circle-minus inactive" : "fa-solid fa-circle-minus"}
          onClick={count === 0 ? () => {} : () => handleClickMinus()}
        ></i>
        <p>{count}</p>
        <i
          className={count < 9 && total < 9 ? "fa-solid fa-circle-plus" : "fa-solid fa-circle-plus inactive"}
          onClick={count < 9 && total < 9 ? () => handleClickPlus() : () => {}}
        ></i>
      </span>
    </li>
  );
}
