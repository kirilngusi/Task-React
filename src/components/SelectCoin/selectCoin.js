import React from "react";
import { useState } from "react";
const Dropdown = ({ handleChangeCoin }) => {
  const getInitialState = () => {
    const value = "btcusdt";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
    handleChangeCoin(e.target.value);
  };

  return (
    <>
      <div>
        <select value={value} onChange={handleChange}>
          <option value="btcusdt">BTCUSDT</option>
          <option value="bnbbtc">BNBBTC</option>
          <option value="ltcbtc">LTCBTC</option>
        </select>
      </div>
    </>
  );
};
export default Dropdown;
