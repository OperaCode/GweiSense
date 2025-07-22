import React, { useEffect, useState } from "react";
import { JsonRpcProvider, formatUnits } from "ethers";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify";
import { format } from "date-fns";



const ANKR_KEY=import.meta.env.VITE_ANKR_KEY

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

  const fetchGasPrice = async () => {
    setLoading(true);
    try {
      const provider = new JsonRpcProvider(networks[network]);
      const feeData = await provider.getFeeData();
      const formattedGasPrice = formatUnits(feeData.gasPrice || 0n, "gwei");

      if (threshold && parseFloat(formattedGasPrice) < parseFloat(threshold)) {
        toast.success(`Gas price is below ${threshold} gwei! Current: ${formattedGasPrice} gwei`, {
          position: "top-center",
        });
      }

      setGasData({
        maxFeePerGas: formatUnits(feeData.maxFeePerGas || 0n, "gwei"),
        maxPriorityFeePerGas: formatUnits(feeData.maxPriorityFeePerGas || 0n, "gwei"),
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
      toast.error("Failed to fetch gas data. Please check your RPC or network.");
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

  useEffect(() => {
    fetchGasPrice();
    fetchTokenPrice();
    const interval = setInterval(() => {
      fetchGasPrice();
      fetchTokenPrice();
    }, 60000);
    return () => clearInterval(interval);
  }, [network]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-black to-blue-950 text-white px-4 py-10 font-sans">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          GweiSense – Multi-Chain Gas Tracker
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Monitor live gas fees across Ethereum, Polygon, and BSC to save costs and optimise transactions.
        </p>
      </header>

      {/* Controls */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Network Selection */}
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <label className="block mb-2 font-medium text-gray-200">Select Network:</label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="bsc">Binance Smart Chain</option>
          </select>
        </div>

        {/* Gas Limit */}
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <label className="block mb-2 font-medium text-gray-200">Enter Gas Limit:</label>
          <input
            type="number"
            value={gasLimit}
            onChange={(e) => setGasLimit(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 21000"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { label: "Transfer (21k)", value: 21000 },
              { label: "ERC20 Approval (45k)", value: 45000 },
              { label: "Swap (100k)", value: 100000 },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setGasLimit(item.value)}
                className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gas Data Display */}
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur rounded-lg p-6 mb-10">
        {loading ? (
          <p className="text-gray-300 animate-pulse">Loading gas prices...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-gray-400">Max Fee Per Gas</p>
                <p className="text-2xl font-bold">{gasData.maxFeePerGas} gwei</p>
              </div>
              <div>
                <p className="text-gray-400">Priority Fee</p>
                <p className="text-2xl font-bold">{gasData.maxPriorityFeePerGas} gwei</p>
              </div>
              <div>
                <p className="text-gray-400">Gas Price</p>
                <p className="text-2xl font-bold">{gasData.gasPrice} gwei</p>
              </div>
            </div>

            {gasLimit && gasData.gasPrice && tokenPrice && (
              <div className="mt-6 text-center">
                <p className="text-gray-400">Estimated Cost</p>
                <p className="text-xl font-bold">
                  {((parseFloat(gasLimit) * parseFloat(gasData.gasPrice)) / 1e9).toFixed(6)}{" "}
                  {network === "ethereum" ? "ETH" : network === "polygon" ? "MATIC" : "BNB"} (~$
                  {(
                    ((parseFloat(gasLimit) * parseFloat(gasData.gasPrice)) / 1e9) *
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
          className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded shadow hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105"
        >
          Refresh Data
        </button>
      </div>

      {/* Chart */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Gas Price History</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <XAxis dataKey="time" stroke="#cbd5e1" />
            <YAxis domain={["auto", "auto"]} unit=" gwei" stroke="#cbd5e1" />
            <Tooltip />
            <Line type="monotone" dataKey="gasPrice" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
