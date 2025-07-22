import React, { useEffect } from "react";
import { Link } from "react-scroll";
import AOS from "aos";
import Header from "../components/Header";
import "aos/dist/aos.css";

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans ">
      {/* Navbar */}
      <div>
        {/* <Header /> */}
        <header className="fixed top-0 border flex justify items-center p-4 px-6 w-full bg-gray-900 bg-opacity-80 backdrop-blur-md z-50">
                <h1 className="text-2xl font-bold text-cyan-400">GweiSense</h1>
                <nav className="flex gap-4">
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
              </header>
      </div>

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center py-40 px-4"
        data-aos="fade-up"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
          Track Gas Fees Across Ethereum, Polygon & BSC
        </h2>
        <p className="text-gray-300 max-w-xl mb-6">
          Know the best time to transact on your favourite networks with live
          gas prices, alerts, and cost calculator – all in one place.
        </p>
        <a
          href="/home"
          className="bg-cyan-500 text-black px-6 py-3 rounded-lg shadow hover:bg-cyan-400 transition"
        >
          View Live Prices
        </a>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-4 bg-gray-900"
        data-aos="fade-right"
      >
        <h3 className="text-3xl font-bold text-center mb-12 text-cyan-400">
          Features
        </h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
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
              <h4 className="text-xl font-semibold mb-2 text-cyan-400">
                {feat.title}
              </h4>
              <p className="text-gray-300">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section
        id="how"
        className="py-16 px-4 bg-gray-800 bg-opacity-50"
        data-aos="fade-left"
      >
        <h3 className="text-3xl font-bold text-center mb-12 text-cyan-400">
          How it Works
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
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
              <h4 className="text-xl font-semibold mb-2 text-cyan-400">
                {title}
              </h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Help & Education Section */}
      <section className="py-16 px-4 bg-gray-900" data-aos="zoom-in">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-cyan-400 mb-4">
            What is Gwei?
          </h3>
          <p className="text-gray-300 mb-4">
            Gwei (pronounced "gway") is a small unit of Ether used to measure
            gas fees on Ethereum. 1 Gwei = 0.000000001 ETH.
          </p>
          <h4 className="text-xl font-semibold mb-2 text-cyan-400">
            Polygon and BSC gas fees
          </h4>
          <p className="text-gray-300">
            On Polygon (MATIC) and BSC (BNB), gas fees are calculated similarly
            in their native tokens and are generally much cheaper than Ethereum.
          </p>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section
        className="py-16 px-4 bg-gray-800 bg-opacity-50 text-center"
        data-aos="fade-up"
      >
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
        <p className="p-2"> © 2025 GweiSense | Built with ❤️ by Opera.</p>
        <a
          href="https://github.com/OperaCode"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:underline"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default Landing;
