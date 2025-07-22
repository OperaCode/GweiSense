import React from 'react'

const GasData = ({loading,network,gasLimit,gasData,tokenPrice,fetchGasPrice}) => {
  return (
    <div>
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
  )
}

export default GasData
