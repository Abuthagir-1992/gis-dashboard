import React, { useRef, useState } from "react";
import FarmerTable from "./FarmerTable";
import TableLoader from "./TableLoader";

function FarmerDetails() {
  const [value, setValue] = useState("");
  const [listOfFarmer, setFarmerList] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [inputError, setInputError] = useState(false);
  const myLoader = useRef(false);

  const setSearchValue = (event) => {
    setShouldFetch(false);
    event.preventDefault();
    setValue(event.target.value);
  };

  const searchFarmer = (event) => {
    event.preventDefault();
    setShouldFetch(true);
    console.log("searching farmer");
    console.log(value);
    setInputError(false);
    if (value.length > 0) apiCall();
  };

  const handleError = (event) => {
    event.preventDefault();
    setInputError(true);
    console.log("error");
  };

  const apiCall = () => {
    console.log("api calling");
    myLoader.current = true;
    console.log(myLoader.current);
    fetch(
      `https://next-rest-api-yyg73lmkna-el.a.run.app/api/dashboard/farms/search?search=${value}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data["data"]);
        data["data"] != null ? setFarmerList(data["data"]) : setFarmerList({});

        myLoader.current = false;
      });
  };

  const farmerData = listOfFarmer.length > 0 ? listOfFarmer : [];

  return (
    <div className="p-10">
      <div className="block px-6 pb-12 pt-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <h3 className="font-bold">Farmer Details</h3>
        <h4 className="py-5">
          Search Farmer Name to get Commplete Details(only mapped farmers
          visible in the search list.
        </h4>
        <form onSubmit={value === "" ? handleError : searchFarmer}>
          <div className="relative w-80">
            <input
              type="search"
              id="default-search"
              className={
                inputError
                  ? "block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-lg border-l-2 border border-red-300 focus:outline-none"
                  : "block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-lg border-l-2 border border-gray-300 focus:outline-none"
              }
              placeholder="Search by Farmer name"
              value={value}
              onChange={setSearchValue}
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white "
              onClick={value === "" ? handleError : searchFarmer}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
        {farmerData && shouldFetch && value.length > 0 && !myLoader.current ? (
          <FarmerTable data={listOfFarmer} />
        ) : null}
        {myLoader.current ? <TableLoader /> : null}
      </div>
    </div>
  );
}

export default FarmerDetails;
