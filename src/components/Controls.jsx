import React from "react";

const Controls = ({network,setNetwork, gasLimit, setGasLimit}) => {
  return (
    <div>
      <div
        className="bg-gray-800/80 rounded-lg p-6 shadow mb-6"
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
  );
};

export default Controls;
