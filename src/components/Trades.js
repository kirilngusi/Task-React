import React from "react";
import "./Trades.css";
import { useState } from "react";
export const Trades = ({ trades }) => {
  const up = {
    color: "red",
  };
  const down = {
    color: "green",
  };

  return (
    <table>
      <tr>
        <th>Price</th>
        <th>Time</th>
        <th>Quantity</th>
      </tr>

      {trades.map((trade) => (
        <>
          <tr>
            <td>{parseFloat(trade.p)}</td>
            <td>{new Date(trade.T).toLocaleTimeString()}</td>
            <td>{trade.q}</td>
          </tr>
        </>
      ))}
    </table>
  );
};
