import React from "react";
import { useEffect, useRef, useState } from "react";
import { Trades } from "../components/Trades";
// const URL_WEB_SOCKET = "wss://stream.binance.com:9443/ws";
const URL_WEB_SOCKET = "wss://stream.binance.com:9443/ws/btcusdt@trade";

const randomId = () => {
  return Math.floor(Math.random() * 9999);
};
const Home = () => {
  const [trades, setTrades] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      //.... open rồi làm gì đó
      setWs(wsClient);
    };
    wsClient.onclose = () => console.log("ws closed");

    return () => {
      // Tương đương componentWillUnmount
      wsClient.close(); //Tắt kết nối khi component unmount
    };
  }, []); // Arrray rỗng, nên chỉ gọi lần đầu tiên khi component render. Tương đương componentDidMount

  useEffect(() => {
    if (ws) {
      //... điền tiếp vào chỗ trống
      ws.onmessage = (e) => {
        const trade = JSON.parse(e.data);
        // console.log(trade);
        const newTrades = [...trades];
        addTradeToList(trade, newTrades);
        // console.log(trade.e == true);
        // setTrades(trade);
        // console.log({ trades });
      };
    }
  }, [ws, trades]); // Cái này tương đương componentDidUpdate
  // Mục đích cho ws vào array này là để có thể sử dụng đc giá trị ws đã đc set ở bên trên
  // Mục đích cho tradesvào array này là để có thể sử dụng đc giá trị mới của trades sau mỗi lần trades đc update

  const addTradeToList = (trade, newTrades) => {
    if (trade) {
      if (newTrades.length >= 20) {
        newTrades.pop();
        newTrades.unshift(trade);
        setTrades(newTrades);
      } else {
        newTrades.unshift(trade);
        setTrades(newTrades);
      }
    }
  };

  return (
    <div className="app__home">
      {/* <Trades trades={trades} /> */}
      <Trades trades={trades} />
    </div>
  );
};
export default Home;
