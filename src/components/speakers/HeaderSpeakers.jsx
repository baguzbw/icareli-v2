import React from "react";
import backgroundImage from "../assets/background.svg";

const Speakers = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-1/2 p-20 text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-3/4 flex flex-col items-center justify-center p-5 text-center">
        <h1 className="text-5xl font-bold mb-4 p-5 font-plus-jakarta">SPEAKERS</h1>
        <p className="text-xl font-plus-jakarta">ICARELI (International Conference on Animal Research for Eco-Friendly Livestock Industry)</p>
      </div>
    </div>
  );
};

export default Speakers;
