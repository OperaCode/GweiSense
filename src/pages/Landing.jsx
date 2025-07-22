import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full flex justify-between items-center px-4 sm:px-6 py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md z-50">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-cyan-400">
            GweiSense
          </h1>
        </div>
        <nav className="hidden md:flex gap-4">
          <Link
            to="features"
            smooth={true}
            duration={500}
            className="cursor-pointer text-cyan-400 hover:underline"
          >
            Features
          </Link>
          <Link
            to="how"
            smooth={true}
            duration={500}
            className="cursor-pointer text-cyan-400 hover:underline"
          >
            How it Works
          </Link>
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyan-400 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </header>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-gray-900 bg-opacity-90 flex flex-col items-center py-4 z-40">
          <Link
            to="features"
            smooth={true}
            duration={500}
            className="py-2 text-cyan-400 hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="how"
            smooth={true}
            duration={500}
            className="py-2 text-cyan-400 hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            How it Works
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="flex  flex-col items-center justify-center text-center pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6"
        data-aos="fade-up"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
          Track Gas Fees Across Ethereum, Polygon & BSC
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mb-6">
          Know the best time to transact on your favorite networks with live gas
          prices, alerts, and cost calculator – all in one place.
        </p>
        <a
          href="/home"
          className="bg-cyan-500 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:bg-cyan-400 transition text-sm sm:text-base"
        >
          View Live Prices
        </a>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-900"
        data-aos="fade-right"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-cyan-400">
          Features
        </h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Multi-Chain Tracking",
              desc: "Monitor gas prices on Ethereum, Polygon, and BSC with ease.",
            },
            {
              title: "Real-Time Alerts",
              desc: "Set gas price alerts and receive notifications when fees are low.",
            },
            {
              title: "Cost Calculator",
              desc: "Estimate transaction costs in native tokens and USD instantly.",
            },
            {
              title: "Visual Gas Trends",
              desc: "Understand gas price changes with interactive charts for each chain.",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="text-center px-4 py-6 bg-gray-800 rounded-lg shadow hover:scale-105 transition transform"
              data-aos="fade-up"
              data-aos-delay={`${i * 100}`}
            >
              <h4 className="text-lg sm:text-xl font-semibold mb-2 text-cyan-400">
                {feat.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-300">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section
        id="how"
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-800 bg-opacity-50"
        data-aos="fade-left"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-cyan-400">
          How it Works
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-gray-300">
          {[
            [
              "1. Select your network",
              "Choose between Ethereum, Polygon, or BSC.",
            ],
            [
              "2. View live gas prices",
              "Check current gas prices and trends instantly.",
            ],
            [
              "3. Set alerts",
              "Get notified when gas fees drop below your target.",
            ],
            [
              "4. Calculate costs",
              "Estimate transaction costs before sending.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={`${i * 100}`}>
              <h4 className="text-lg sm:text-xl font-semibold mb-2 text-cyan-400">
                {title}
              </h4>
              <p className="text-sm sm:text-base">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Help & Education Section */}
      <section
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-900"
        data-aos="zoom-in"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
            What is Gwei?
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4">
            Gwei (pronounced "gway") is a small unit of Ether used to measure
            gas fees on Ethereum. 1 Gwei = 0.000000001 ETH.
          </p>
          <h4 className="text-lg sm:text-xl font-semibold mb-2 text-cyan-400">
            Polygon and BSC gas fees
          </h4>
          <p className="text-sm sm:text-base text-gray-300">
            On Polygon (MATIC) and BSC (BNB), gas fees are calculated similarly
            in their native tokens and are generally much cheaper than Ethereum.
          </p>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-800 bg-opacity-50 text-center"
        data-aos="fade-up"
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-cyan-400">
          Ready to start saving on gas fees?
        </h3>
        <a
          href="/home"
          className="bg-cyan-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow hover:bg-cyan-400 transition text-sm sm:text-base"
        >
          Open GweiSense Now
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 bg-gray-900 bg-opacity-80">
        <p className="p-2 text-sm sm:text-base">
          © 2025 GweiSense | Built with ❤️ by Opera.
        </p>
        <a
          href="https://github.com/OperaCode"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:underline text-sm sm:text-base"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default Landing;
