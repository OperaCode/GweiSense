import React, { useEffect, useState } from "react";
import { JsonRpcProvider, formatUnits } from "ethers";
import { toast } from "react-toastify";
import { format } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Chart from "../components/Chart";
import Controls from "../components/Controls";
import GasData from "../components/GasData";

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
          <Link to="/" className="cursor-pointer text-cyan-400 hover:underline font-bold">
            Exit
          </Link>
        </nav>
      </header>
      
        {/* Main Contents/cards*/}
      <main className="mt-15">

        {/* Her Texts */}
        <section className="mb-4">
          <h1 className="text-4xl md:text-5xl text-center font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            GweiSense – Multi-Chain Gas Tracker
          </h1>
          <p className="text-gray-300 text-center max-w-xl mx-auto">
            Monitor live gas fees across Ethereum, Polygon, and BSC to save
            costs and optimise your Web3 transactions.
          </p>
        </section>

        {/* Controls - select network */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Controls network={network} setNetwork={setNetwork} gasLimit={gasLimit} setGasLimit={setGasLimit} />
        </div>

        {/* Gas Data Display */}
        <div
          className="max-w-3xl mx-auto bg-gray-800/80 rounded-lg p-8 mb-12 shadow"
          data-aos="zoom-in"
        >
          <GasData network={network} loading={loading} gasLimit={gasLimit} gasData={gasData} tokenPrice={tokenPrice} fetchGasPrice={fetchGasPrice}/>
        </div>

        {/* Chart */}
        <div
          className="max-w-4xl mx-auto bg-gray-800/80 rounded-lg p-8 shadow"
          data-aos="fade-up"
        >
            <Chart history={history} gasData={gasData}/>
        </div>
      </main>
    </div>
  );
};

export default Home;
