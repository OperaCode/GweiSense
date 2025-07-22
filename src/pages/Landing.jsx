import React from "react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-900 bg-opacity-80 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-cyan-400">GweiSense</h1>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:underline"
        >
          GitHub
        </a>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
          Track Gas Fees Across Ethereum, Polygon & BSC
        </h2>
        <p className="text-gray-300 max-w-xl mb-6">
          Know the best time to transact on your favourite networks with live gas prices, alerts, and cost calculator – all in one place.
        </p>
        <a
          href="/home"
          className="bg-cyan-500 text-black px-6 py-3 rounded-lg shadow hover:bg-cyan-400 transition"
        >
          View Live Prices
        </a>
      </section>

      {/* Quick Intro Section */}
      <section className="py-12 px-4 bg-gray-800 bg-opacity-50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-cyan-400 mb-4">What is GweiSense?</h3>
          <p className="text-gray-300">
            GweiSense helps you monitor gas prices on Ethereum, Polygon, and Binance Smart Chain in real time, set alerts when fees are low, and estimate your transaction costs easily.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-900">
        <h3 className="text-3xl font-bold text-center mb-12 text-cyan-400">
          Features
        </h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center px-4 py-6 bg-gray-800 rounded-lg shadow hover:scale-105 transition transform">
            <h4 className="text-xl font-semibold mb-2 text-cyan-400">
              Multi-Chain Tracking
            </h4>
            <p className="text-gray-300">
              Monitor gas prices on Ethereum, Polygon, and Binance Smart Chain with ease.
            </p>
          </div>

          <div className="text-center px-4 py-6 bg-gray-800 rounded-lg shadow hover:scale-105 transition transform">
            <h4 className="text-xl font-semibold mb-2 text-cyan-400">
              Real-Time Alerts
            </h4>
            <p className="text-gray-300">
              Set gas price alerts and receive notifications when fees are low.
            </p>
          </div>

          <div className="text-center px-4 py-6 bg-gray-800 rounded-lg shadow hover:scale-105 transition transform">
            <h4 className="text-xl font-semibold mb-2 text-cyan-400">
              Cost Calculator
            </h4>
            <p className="text-gray-300">
              Estimate transaction costs in native tokens and USD instantly.
            </p>
          </div>

          <div className="text-center px-4 py-6 bg-gray-800 rounded-lg shadow hover:scale-105 transition transform">
            <h4 className="text-xl font-semibold mb-2 text-cyan-400">
              Visual Gas Trends
            </h4>
            <p className="text-gray-300">
              Understand how gas prices change over time with clear and interactive charts for each chain.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-gray-800 bg-opacity-50">
        <h3 className="text-3xl font-bold text-center mb-12 text-cyan-400">
          How it Works
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
          <div>
            <h4 className="text-xl font-semibold mb-2 text-cyan-400">1. Select your network</h4>
            <p>Choose between Ethereum, Polygon, or Binance Smart Chain.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2 text-cyan-400">2. View live gas prices</h4>
            <p>Check current gas prices and trends instantly.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2 text-cyan-400">3. Set alerts</h4>
            <p>Get notified when gas fees drop below your target threshold.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2 text-cyan-400">4. Calculate costs</h4>
            <p>Estimate transaction costs in token and USD before sending.</p>
          </div>
        </div>
      </section>

      {/* Help & Education Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-cyan-400 mb-4">What is Gwei?</h3>
          <p className="text-gray-300 mb-4">
            Gwei (pronounced "gway") is a small unit of Ether used to measure gas fees on Ethereum.
            1 Gwei = 0.000000001 ETH.
          </p>
          <h4 className="text-xl font-semibold mb-2 text-cyan-400">Polygon and BSC gas fees</h4>
          <p className="text-gray-300">
            On Polygon (MATIC) and Binance Smart Chain (BNB), gas fees are calculated similarly in their native tokens and are generally much cheaper than Ethereum.
          </p>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-16 px-4 bg-gray-800 bg-opacity-50 text-center">
        <h3 className="text-3xl font-bold mb-6 text-cyan-400">
          Ready to start saving on gas fees?
        </h3>
        <a
          href="/home"
          className="bg-cyan-500 text-black px-8 py-4 rounded-lg shadow hover:bg-cyan-400 transition"
        >
          Open GweiSense Now
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 bg-gray-900 bg-opacity-80">
        © 2025 GweiSense | Built with ❤️ by Opera.
      </footer>
    </div>
  );
};

export default Landing;
