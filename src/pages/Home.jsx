import React from "react";
import "./Home.css";
import { useEffect, useRef, useState } from "react";
import Table from "../components/Table/Trades";
import Dropdown from "../components/SelectCoin/selectCoin";
const URL_WEB_SOCKET = "wss://stream.binance.com:9443/ws/btcusdt@trade";

const randomId = () => {
  return Math.floor(Math.random() * 9999);
};
const Home = () => {
  const [trades, setTrades] = useState([]);
  const [ws, setWs] = useState(null);
  const [currentCoin, setCurrentCoin] = useState("btcusdt");
  const prevCoin = useRef(currentCoin);
  // console.log(prevCoin);
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
    const id = randomId();
    const requestUnSubcribe = {
      method: "UNSUBSCRIBE",
      params: [`${prevCoin.current}@trade`],
      id: id,
    };

    const requestSubcribe = {
      method: "SUBSCRIBE",
      params: [`${currentCoin}@trade`],
      id: id,
    };

    if (ws) {
      ws.send(JSON.stringify(requestUnSubcribe));
      setTrades([]);
      // setSortedTrades([]);
      ws.send(JSON.stringify(requestSubcribe));
    }
  }, [currentCoin, prevCoin, ws]);

  useEffect(() => {
    prevCoin.current = currentCoin;
  }, [currentCoin]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (e) => {
        const trade = JSON.parse(e.data);
        const newTrades = [...trades];
        addTradeToList(trade, newTrades);
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

  const handleChangeCoin = (coinCode) => {
    setCurrentCoin(coinCode);
    console.log(currentCoin);
  };
  return (
    <>
      <div className="app__home">
        <div className="nav__selection">
          <Dropdown handleChangeCoin={handleChangeCoin} />
        </div>
        <Table trades={trades} />
      </div>
    </>
  );
};
export default Home;
