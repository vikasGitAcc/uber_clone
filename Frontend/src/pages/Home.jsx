import React from "react";
import UberLogo from "../assets/Logo/uber-logo.png";
import BgImage from "../assets/Background/bgImage.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div
        className=" h-screen pt-8 w-full bg-green-500 flex justify-between flex-col"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img className="w-16 ml-9" src={UberLogo} alt="Uber Logo" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get started with uber</h2>
          <Link to="/login" className="flex items-center justify-center text-white bg-black rounded w-full py-3 mt-5 ">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
