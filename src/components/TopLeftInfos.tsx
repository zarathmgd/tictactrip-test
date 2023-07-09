import { useState } from "react";
import Arrow from "./Arrow";
import Popup from "./Popup";

export default function TopLeftInfos({ isActive, setIsActive, reference }: { isActive: boolean; setIsActive: any; reference: any }) {
  const [arrow, setArrow] = useState<boolean>(false);
  const [value, setValue] = useState<string>("One-way");
  const handleClick = (text: string) => {
    setArrow(!arrow);
    setIsActive(!isActive);
    setValue(text);
  };

  return (
    <div className="infos left">
      <span>{value}</span>
      <Arrow arrow={arrow} setArrow={setArrow} />
      <Popup
        arrow={arrow}
        setArrow={setArrow}
        isActive={isActive}
        setIsActive={setIsActive}
        reference={reference}
        popupClass={!arrow ? "popup left inactive" : "popup left active"}
      >
        <ul>
          <li className={isActive ? "active" : "unactive"} value={"One-way"} onClick={() => handleClick("One-way")}>
            One-way
          </li>
          <li className={!isActive ? "active" : "unactive"} onClick={() => handleClick("Road-trip")}>
            Round-trip
          </li>
        </ul>
      </Popup>
    </div>
  );
}
