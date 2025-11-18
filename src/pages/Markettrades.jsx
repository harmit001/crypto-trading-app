import { useEffect, useState } from "react";
import "./markettrades.css";

export default function MarketTrades({ pair = "btcusdt" }) {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const url = `wss://stream.binance.com:9443/ws/${pair}@trade`;
    const ws = new WebSocket(url);

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      const trade = {
        price: parseFloat(data.p),
        qty: parseFloat(data.q),
        time: formatTime(data.T),
        side: data.m ? "sell" : "buy", // m=true => buyer is maker => SELL
        flash: true
      };

      // Insert at top (limit to 50 items)
      setTrades((prev) => {
        const updated = [trade, ...prev.slice(0, 49)];
        return updated;
      });

      // Remove flash quickly
      setTimeout(() => {
        trade.flash = false;
      }, 250);
    };

    return () => ws.close();
  }, [pair]);

  return (
    <div className="trades-container">
      <h3 className="title">Market Trades</h3>

      <div className="trade-header">
        <span>Price (USDT)</span>
        <span>Amount (BNB)</span>
        <span>Time</span>
      </div>

      <div className="trades-list">
        {trades.map((t, i) => (
          <div
            key={i}
            className={`trade-row ${t.side} ${t.flash ? "flash" : ""}`}
          >
            <span>{formatPrice(t.price)}</span>
            <span>{t.qty.toFixed(5)}</span>
            <span>{t.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Format price: 930.21 -> 930.21 / 21,432.55 */
function formatPrice(num) {
  return num.toLocaleString("en-US", { minimumFractionDigits: 2 });
}

/* Format time: HH:MM:SS */
function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-US", {
    hour12: false,
  });
}
