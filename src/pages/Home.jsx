import React, { useEffect, useState } from "react";
import { JsonRpcProvider, formatUnits } from "ethers";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";
import { format } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const ANKR_KEY = import.meta.env.VITE_ANKR_KEY;

const Home = () => {
  const [gasData, setGasData] = useState({
    maxFeePerGas: null,
    maxPriorityFeePerGas: null,
    gasPrice: null,
  });
  const [network, setNetwork] = useState("ethereum");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [tokenPrice, setTokenPrice] = useState(null);

  const networks = {
    ethereum: `https://rpc.ankr.com/eth/${ANKR_KEY}`,
    polygon: `https://rpc.ankr.com/polygon/${ANKR_KEY}`,
    bsc: `https://rpc.ankr.com/bsc/${ANKR_KEY}`,
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchGasPrice();
    fetchTokenPrice();
    const interval = setInterval(() => {
      fetchGasPrice();
      fetchTokenPrice();
    }, 60000);
    return () => clearInterval(interval);
  }, [network]);

  const fetchGasPrice = async () => {
    setLoading(true);
    try {
      const provider = new JsonRpcProvider(networks[network]);
      const feeData = await provider.getFeeData();
      const formattedGasPrice = formatUnits(feeData.gasPrice || 0n, "gwei");

      if (threshold && parseFloat(formattedGasPrice) < parseFloat(threshold)) {
        toast.success(
          `Gas price is below ${threshold} gwei! Current: ${formattedGasPrice} gwei`,
          {
            position: "top-center",
          }
        );
      }

      setGasData({
        maxFeePerGas: formatUnits(feeData.maxFeePerGas || 0n, "gwei"),
        maxPriorityFeePerGas: formatUnits(
          feeData.maxPriorityFeePerGas || 0n,
          "gwei"
        ),
        gasPrice: formattedGasPrice,
      });

      setHistory((prev) => [
        ...prev,
        {
          time: format(new Date(), "HH:mm:ss"),
          gasPrice: parseFloat(formattedGasPrice),
        },
      ]);
    } catch (error) {
      console.error("Error fetching gas data:", error);
      toast.error(
        "Failed to fetch gas data. Please check your RPC or network."
      );
    }
    setLoading(false);
  };

  const fetchTokenPrice = async () => {
    try {
      let id = "ethereum";
      if (network === "polygon") id = "matic-network";
      else if (network === "bsc") id = "binancecoin";

      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
      );
      const data = await res.json();
      setTokenPrice(data[id].usd);
    } catch (err) {
      console.error("Error fetching token price:", err);
      toast.error("Failed to fetch token price.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-10 font-sans">

      {/* Header */}
      <header className="text-center mb-12 fixed top-0 w-full flex justify-between items-center p-4 px-8 bg-gray-900 bg-opacity-80 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-cyan-400">GweiSense</h1>
        <nav className="flex gap-4">
          <Link to="/" className="cursor-pointer text-cyan-400 hover:underline">
            Exit
          </Link>
        </nav>
      </header>
      
      <main className="mt-15">

        {/* Main Contents/cards*/}
        <section className="mb-4">
        {/* Her Texts */}
          <h1 className="text-4xl md:text-5xl text-center font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            GweiSense – Multi-Chain Gas Tracker
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Monitor live gas fees across Ethereum, Polygon, and BSC to save
            costs and optimise your Web3 transactions.
          </p>
        </section>

        {/* Controls - select network */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div
            className="bg-gray-800/80 rounded-lg p-6 shadow"
            data-aos="fade-right"
          >
            <label className="block mb-2 font-medium text-cyan-400">
              Select Network
            </label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="bsc">Binance Smart Chain</option>
            </select>
          </div>

          <div
            className="bg-gray-800/80 rounded-lg p-6 shadow"
            data-aos="fade-left"
          >
            <label className="block mb-2 font-medium text-cyan-400">
              Enter Gas Limit
            </label>
            <input
              type="number"
              value={gasLimit}
              onChange={(e) => setGasLimit(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="e.g. 21000"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: "Transfer (21k)", value: 21000 },
                { label: "ERC20 Approval (45k)", value: 45000 },
                { label: "Swap (100k)", value: 100000 },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setGasLimit(item.value)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 px-3 py-1 rounded text-sm hover:from-purple-700 hover:to-cyan-700 transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gas Data Display */}
        <div
          className="max-w-3xl mx-auto bg-gray-800/80 rounded-lg p-8 mb-12 shadow"
          data-aos="zoom-in"
        >
          {loading ? (
            <p className="text-gray-400 animate-pulse text-center">
              Loading gas prices...
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-cyan-400">Max Fee Per Gas</p>
                  <p className="text-2xl font-bold">
                    {gasData.maxFeePerGas} gwei
                  </p>
                </div>
                <div>
                  <p className="text-cyan-400">Priority Fee</p>
                  <p className="text-2xl font-bold">
                    {gasData.maxPriorityFeePerGas} gwei
                  </p>
                </div>
                <div>
                  <p className="text-cyan-400">Gas Price</p>
                  <p className="text-2xl font-bold">{gasData.gasPrice} gwei</p>
                </div>
              </div>

              {gasLimit && gasData.gasPrice && tokenPrice && (
                <div className="mt-8 text-center">
                  <p className="text-cyan-400">Estimated Cost</p>
                  <p className="text-xl font-bold">
                    {(
                      (parseFloat(gasLimit) * parseFloat(gasData.gasPrice)) /
                      1e9
                    ).toFixed(6)}{" "}
                    {network === "ethereum"
                      ? "ETH"
                      : network === "polygon"
                      ? "MATIC"
                      : "BNB"}{" "}
                    (~$
                    {(
                      ((parseFloat(gasLimit) * parseFloat(gasData.gasPrice)) /
                        1e9) *
                      tokenPrice
                    ).toFixed(2)}
                    )
                  </p>
                </div>
              )}
            </>
          )}

          <button
            onClick={fetchGasPrice}
            className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded shadow hover:from-cyan-600 hover:to-blue-600 transition transform hover:scale-105"
          >
            Refresh Data
          </button>
        </div>

        {/* Chart */}
        <div
          className="max-w-4xl mx-auto bg-gray-800/80 rounded-lg p-8 shadow"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
            Gas Price History
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <XAxis dataKey="time" stroke="#a5f3fc" />
              <YAxis domain={["auto", "auto"]} unit=" gwei" stroke="#a5f3fc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="gasPrice"
                stroke="#22d3ee"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Home;
