import { useState, useRef, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TopRightInfos from "./components/TopRightInfos";
import TopLeftInfos from "./components/TopLeftInfos";
import Popup from "./components/Popup";
import Bat from "./assets/bat.png";

function App() {
  // State initialization

  const [isSelected, setIsSelected] = useState(true);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isPopupCityFrom, setIsPopupCityFrom] = useState(false);
  const [isPopupCityTo, setIsPopupCityTo] = useState(false);

  const ref = useRef(null);

  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  const [fromCityInputValue, setFromCityInputValue] = useState("");
  const [toCityInputValue, setToCityInputValue] = useState("");
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);

  // API Links connected to user input entry

  const autocompleteFrom = `https://api.comparatrip.eu/cities/autocomplete/?q=${fromCityInputValue}`;
  const autocompleteTo = `https://api.comparatrip.eu/cities/autocomplete/?q=${toCityInputValue}`;
  const popularCities = `https://api.comparatrip.eu/cities/popular/5`;
  const popularCitiesFrom = `https://api.comparatrip.eu/cities/popular/from/${fromCityInputValue}/5 `;

  /*
  API Request for the first input, for the departure location
  Each time the input value change, the API is called to reload the list of locations that match with what the user enters 
  */

  useEffect(() => {
    const apiCall = async () => {
      if (fromCityInputValue.length === 0) {
        await axios.get(popularCities).then((res) => setFromCities(res.data));
      } else {
        await axios.get(autocompleteFrom).then((res) => {
          setFromCities(res.data);
        });
      }
    };
    apiCall();
  }, [fromCityInputValue]);

  /*
  API Request for the second input, for the return location
  Each time the input value change (departure or return), the API is called to reload the list of locations that match with what
  the user enters 
  */

  useEffect(() => {
    const apiCall = async () => {
      if (toCityInputValue.length === 0 && fromCityInputValue.length >= 1) {
        await axios.get(popularCitiesFrom).then((res) => setToCities(res.data));
      } else if (toCityInputValue.length === 0 && fromCityInputValue.length === 0) {
        await axios.get(popularCities).then((res) => setToCities(res.data));
      } else {
        await axios.get(autocompleteTo).then((res) => {
          setToCities(res.data);
        });
      }
    };
    apiCall();
  }, [toCityInputValue, fromCityInputValue]);

  // These functions search in arrays all the locations that match the user entry

  const searchFrom = (text: string) => {
    let matches = fromCities.filter((city: any) => {
      const regex = new RegExp(`${text}`, "gi");
      return city.unique_name.match(regex);
    });

    setFromCities(matches);
  };

  const searchTo = (text: string) => {
    let matches = toCities.filter((city: any) => {
      const regex = new RegExp(`${text}`, "gi");
      return city.unique_name.match(regex);
    });

    setToCities(matches);
  };

  return (
    <>
      <img src={Bat} alt="bat-icon" />
      <div className="container">
        <div className="top-infos">
          <TopLeftInfos reference={ref} isActive={isSelected} setIsActive={setIsSelected} />
          <TopRightInfos reference={ref} />
        </div>

        <form action="">
          <div className="input-container first">
            <i className="fa-regular fa-circle"></i>
            <input
              type="text"
              name=""
              id=""
              placeholder="From: City, Station or Airport"
              value={fromCityInputValue}
              onChange={(e) => {
                setFromCityInputValue(e.target.value);
                searchFrom(e.target.value);
              }}
              onClick={() => setIsPopupCityFrom(!isPopupCityFrom)}
            />
            <i
              className="fa-solid fa-arrow-right-arrow-left"
              onClick={() => {
                setFromCityInputValue(toCityInputValue);
                setToCityInputValue(fromCityInputValue);
              }}
            ></i>
            <Popup />
            <div className={!isPopupCityFrom ? "popup city inactive" : "popup city active"}>
              <ul>
                {fromCities.map((city: any) => {
                  return (
                    <li
                      key={uuid()}
                      onClick={() => {
                        setFromCityInputValue(city.unique_name);
                        setIsPopupCityFrom(!isPopupCityFrom);
                      }}
                    >
                      {city.unique_name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Popup />
          </div>

          <div className="input-container">
            <i className="fa-solid fa-location-dot"></i>
            <input
              type="text"
              name=""
              id=""
              placeholder="To: City, Station or Airport"
              value={toCityInputValue}
              onChange={(e) => {
                setToCityInputValue(e.target.value);
                searchTo(e.target.value);
              }}
              onClick={() => setIsPopupCityTo(!isPopupCityTo)}
            />
            <Popup />
            <div className={!isPopupCityTo ? "popup city inactive" : "popup city active"}>
              <ul>
                {toCities.map((city: any) => {
                  return (
                    <li
                      key={uuid()}
                      onClick={() => {
                        setToCityInputValue(city.unique_name);
                        setIsPopupCityTo(!isPopupCityTo);
                      }}
                    >
                      {city.unique_name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Popup />
          </div>

          <div className="input-container double">
            <div className="input-container departure">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => {
                  setStartDate(date);
                }}
                dateFormat="dd/MM/yyyy"
              />
              <i className="fa-regular fa-calendar"></i>
            </div>

            <div className="input-container return" data-placeholder="+ Add return">
              <DatePicker
                selected={returnDate}
                // This function check if the return date is greater than the departure date
                onChange={(date: Date) => (date.getTime() < startDate.getTime() ? setReturnDate(startDate) : setReturnDate(date))}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          <div className="input-container submit">
            <input type="submit" name="" id="" value={"Search"} />
          </div>
        </form>

        <div className="bottom-content">
          <div
            className="toggle-btn"
            onClick={() => setIsBtnActive(!isBtnActive)}
            style={!isBtnActive ? { background: "rgb(220, 223, 233)" } : { background: "rgb(94, 144, 204)" }}
          >
            <span className="toggle-circle" style={!isBtnActive ? { left: "5%" } : { left: "inherit", right: "5%" }}></span>
          </div>
          <span>Find my accommodation</span>
        </div>
      </div>
    </>
  );
}

export default App;
