import React, { useEffect, useState } from "react";
import { JsonRpcProvider, formatUnits } from "ethers";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify";
import { format } from "date-fns";


const ANKR_KEY=import.meta.env.VITE_ANKR_KEY;


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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 animate-fadeIn">
        GweiSense – Multi-Chain Gas Tracker
      </h1>

      <div className="mt-4 w-full max-w-md">
        <label className="block mb-2 font-medium text-gray-700">Select Network:</label>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="bsc">Binance Smart Chain</option>
        </select>
      </div>

      <div className="mt-6 w-full max-w-md">
        <label className="block mb-2 font-medium text-gray-700">Enter Gas Limit:</label>
        <input
          type="number"
          value={gasLimit}
          onChange={(e) => setGasLimit(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="e.g. 21000"
        />
        <div className="mt-2 flex space-x-2">
          {[
            { label: "Transfer (21k)", value: 21000 },
            { label: "ERC20 Approval (45k)", value: 45000 },
            { label: "Swap (100k)", value: 100000 },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setGasLimit(item.value)}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {gasLimit && gasData.gasPrice && tokenPrice && (
        <div className="mt-4 bg-white rounded-lg shadow p-4">
          <p className="text-gray-700">
            <strong>Estimated Cost:</strong>{" "}
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

      <div className="mt-6 w-full max-w-md">
        <label className="block mb-2 font-medium text-gray-700">Set Gas Price Alert Threshold (gwei):</label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="e.g. 30"
        />
      </div>

      {loading ? (
        <p className="text-gray-600 animate-pulse">Loading gas prices...</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-md animate-slideUp">
          <p className="text-gray-700"><strong>Max Fee Per Gas:</strong> {gasData.maxFeePerGas} gwei</p>
          <p className="text-gray-700"><strong>Max Priority Fee:</strong> {gasData.maxPriorityFeePerGas} gwei</p>
          <p className="text-gray-700"><strong>Gas Price:</strong> {gasData.gasPrice} gwei</p>
        </div>
      )}

      <button
        onClick={fetchGasPrice}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition transform hover:scale-105"
      >
        Refresh
      </button>

      <div className="w-full max-w-2xl mt-10 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Gas Price History</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} unit=" gwei" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="gasPrice"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
