import React from "react";
import "./Trades.css";

const handleCompare = (price, prevPrice) => {
  if (!price || !prevPrice) return;
  if (price > prevPrice) {
    return "up";
  } else if (price === prevPrice) {
    return "equal";
  } else if (price < prevPrice) {
    return "down";
  }
};

const Table = ({ trades }) => {
  const renderTrades = () => {
    if (!trades || !trades.length || !trades[0]) return "Loading...";
    return trades.map((trade, index) => (
      <tr key={index}>
        <td>{trade && trade.t}</td>
        <td
          className={`col__price ${handleCompare(
            trade.p,
            trades[index + 1] && trades[index + 1].p
          )}`}
        >
          {`$ ${parseFloat(trade.p)}`}
        </td>
        <td>{trade && trade.q}</td>
        <td>{trade && trade.b}</td>
        <td>{trade && trade.a}</td>
        <td>{new Date(trade.T).toLocaleTimeString()}</td>
      </tr>
    ));
  };

  return (
    <div className="content__table">
      <table>
        <tr>
          <th>Trade ID</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Buyer ID</th>
          <th>Seller ID</th>
          <th>Trade time</th>
        </tr>
        {renderTrades()}
      </table>
    </div>
  );
};
export default Table;
