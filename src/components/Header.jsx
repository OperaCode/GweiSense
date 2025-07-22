import React from "react";
import { Link } from "react-scroll";

const Header = () => {
  return (
    <div>
      <header className="fixed top-0 border flex justify-between items-center p-4  w-full bg-gray-900 bg-opacity-80 backdrop-blur-md z-50">
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
  );
};

export default Header;
