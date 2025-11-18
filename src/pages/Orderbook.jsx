import { useEffect, useState, useRef } from "react";
import "./orderbook.css";

export default function Orderbook({ pair = "btcusdt" }) {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const lastDataRef = useRef({ bids: [], asks: [] });

  useEffect(() => {
    const url = `wss://stream.binance.com:9443/ws/${pair}@depth20@100ms`;
    const ws = new WebSocket(url);

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.bids && data.asks) {
        const mergedBids = mergeLevels(data.bids);
        const mergedAsks = mergeLevels(data.asks);

        // add animation flag
        animateUpdates(lastDataRef.current.bids, mergedBids);
        animateUpdates(lastDataRef.current.asks, mergedAsks);

        lastDataRef.current = { bids: mergedBids, asks: mergedAsks };

        setBids(mergedBids);
        setAsks(mergedAsks);
      }
    };

    return () => ws.close();
  }, [pair]);

  const maxBid = Math.max(...bids.map((x) => x.total), 1);
  const maxAsk = Math.max(...asks.map((x) => x.total), 1);

  return (
    <div className="orderbook-container">
      <h3 className="title">Order Book ({pair.toUpperCase()})</h3>

      {/* Header */}
      <div className="header">
        <span>Price (USDT)</span>
        <span>Amount (BTC) </span>
        <span>Total</span>
      </div>

      {/* ASKS (red) */}
      <div className="asks">
        {asks.map((row, i) => (
          <DepthRow key={i} row={row} max={maxAsk} color="red" />
        ))}
      </div>

      {/* MID PRICE */}
      <div className="mid-price">{calcMidPrice(bids, asks)}</div>

      {/* BIDS (green) */}
      <div className="bids">
        {bids.map((row, i) => (
          <DepthRow key={i} row={row} max={maxBid} color="green" />
        ))}
      </div>
    </div>
  );
}

/* Merge duplicate levels by price */
function mergeLevels(levels) {
  const map = {};
  levels.forEach(([price, qty]) => {
    price = parseFloat(price);
    qty = parseFloat(qty);
    if (!map[price]) map[price] = 0;
    map[price] += qty;
  });

  return Object.entries(map)
    .map(([p, q]) => ({
      price: Number(p),
      qty: Number(q),
      total: Number(p) * Number(q),
      flash: false,
    }))
    .sort((a, b) => a.price - b.price);
}

/* Flash animation: highlight row when it changes */
function animateUpdates(prev, next) {
  next.forEach((row, i) => {
    if (!prev[i] || prev[i].qty !== row.qty) {
      row.flash = true;
      setTimeout(() => (row.flash = false), 300);
    }
  });
}

/* Safely calculate mid price */
function calcMidPrice(bids, asks) {
  if (!bids.length || !asks.length) return "--";
  return ((bids[0].price + asks[0].price) / 2).toFixed(2);
}

function formatPrice(num) {
  return num.toLocaleString("en-US", { minimumFractionDigits: 2 });
}

function formatShort(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1000).toFixed(1) + "k";
  return num.toFixed(2);
}

/* Row Component */
function DepthRow({ row, max, color }) {
  const width = ((row.total / max) * 100).toFixed(1) + "%";

  return (
    <div className="row-wrapper">
      <div
        className={`depth-bar ${color}`}
        style={{ width }}
      ></div>

      <div className={`row ${color} ${row.flash ? "flash" : ""}`}>
        <span>{formatPrice(row.price)}</span>
        <span>{row.qty.toFixed(4)}</span>
        <span>{formatShort(row.total)}</span>
      </div>
    </div>
  );
}

