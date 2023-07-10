import { useState, useContext } from "react";
import Arrow from "./Arrow";
import Popup from "./Popup";
import { AppContext } from "./Context";
import ListElements from "./ListElements";
import uuid from "react-uuid";

export default function TopRightInfos({ reference }: { reference: any }) {
  const { total }: { total: number } = useContext(AppContext);

  const [arrow, setArrow] = useState<boolean>(false);

  const [isDiscount, setIsDiscount] = useState<boolean>(false);

  const [passengersYouth] = useState<[]>([]);
  const [passengersSenior] = useState<[]>([]);

  // These functions create an array and push indexes from 0-25 and 58-75. It avoids to write the select options one by one.

  const selectOptionsYouth: number[] = [];
  for (let i = 0; i <= 25; i++) {
    selectOptionsYouth.push(i);
  }
  const selectOptionsSenior: number[] = [];
  for (let i = 58; i <= 75; i++) {
    selectOptionsSenior.push(i);
  }

  return (
    <div className="infos right">
      <span>
        {total} Passengers, {isDiscount ? "1" : "No"} discount card
      </span>
      <Arrow arrow={arrow} setArrow={setArrow} />
      <Popup
        arrow={arrow}
        setArrow={setArrow}
        reference={reference}
        isDiscount={isDiscount}
        setIsDiscount={setIsDiscount}
        popupClass={!arrow ? "popup right inactive" : "popup right active"}
      >
        <ListElements title={"Adult"} paragraph={"26+ years"} />
        <ListElements title={"Youth"} paragraph={"0-25 years"} passengers={passengersYouth} />
        <div className="passengers-array">
          <ul>
            {passengersYouth.map(({ title, id }) => {
              return (
                <li key={uuid()}>
                  <div className="right-popup-left-content passenger">
                    <span>{title}</span>
                    <span>{id}</span>
                  </div>
                  <select name="youth" key={uuid()} defaultValue={"Age"}>
                    <option value="Age" hidden>
                      Age
                    </option>
                    {selectOptionsYouth.map((value: number) => {
                      return (
                        <option value={value} key={uuid()}>
                          {value} {value === 1 ? "year" : "years"}
                        </option>
                      );
                    })}
                  </select>
                </li>
              );
            })}
          </ul>
        </div>
        <ListElements title={"Senior"} paragraph={"58+ years"} passengers={passengersSenior} />
        <div className="passengers-array">
          <ul>
            {passengersSenior.map(({ title, id }) => {
              return (
                <li key={uuid()}>
                  <div className="right-popup-left-content passenger">
                    <span>{title}</span>
                    <span>{id}</span>
                  </div>
                  <select name="senior" key={uuid()} defaultValue={"Age"}>
                    <option value="Age" hidden>
                      Age
                    </option>
                    {selectOptionsSenior.map((value: number) => {
                      return (
                        <option value={value} key={uuid()}>
                          {value} {value === 1 ? "year" : "years"}
                        </option>
                      );
                    })}
                  </select>
                </li>
              );
            })}
          </ul>
        </div>

        <li className="discount">
          <span className="right-popup-left-content">
            <h4>
              Add discount card <i className="fa-solid fa-circle-info"></i>
            </h4>
          </span>

          <span className="right-popup-right-content">
            <div
              className="toggle-btn"
              onClick={() => setIsDiscount(!isDiscount)}
              style={!isDiscount ? { background: "rgb(220, 223, 233)" } : { background: "rgb(94, 144, 204)" }}
            >
              <span className="toggle-circle" style={!isDiscount ? { left: "5%" } : { left: "inherit", right: "5%" }}></span>
            </div>
          </span>
        </li>
      </Popup>
    </div>
  );
}
