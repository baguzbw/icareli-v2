import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icareli from "./assets/IcareliUNS.svg";
import { API_BASE_URL } from "../config";

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [events, setEvents] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const firstPath = parseInt(location.pathname.split("/")[1]);
  const basePath = window.location.origin;

  useEffect(() => {
    fetch(`${API_BASE_URL}event`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => console.error("Error : ", err));
  }, []);

  const limitEventName = (name) => {
    const words = name.split(" ");
    if (words.length >= 3) {
      return words.slice(0, 3).join(" ");
    }
    return name;
  };

  return (
    <nav className="flex items-center justify-between p-5 background-transparent">
      <Link to="/home">
        <img
          src={Icareli}
          alt="Logo"
          className="h-8 w-auto sm:h-10 cursor-pointer"
        />
      </Link>
      <div className="flex items-center font-bold text-black font-plus-jakarta space-x-4">
        {["About", "Program", "Speakers", "Commitee", "News", "Contact"].map(
          (item, index) => (
            <Link
              to={
                Number.isNaN(firstPath)
                  ? `/${item.toLowerCase()}`
                  : `/${firstPath}/${item.toLowerCase()}`
              }
              className="transition duration-200 ease-in-out transform hover:scale-105"
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ color: hoveredIndex === index ? "#00FF94" : "#000000" }}
            >
              {item}
            </Link>
          )
        )}

        <div className="relative group">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="transition duration-200 ease-in-out transform hover:scale-105"
          >
            Previous Conference
          </button>
          {dropdownVisible && (
            <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white overflow-hidden transition-all transform scale-95 group-hover:scale-100">
              <div className="py-1">
                {events.map((event) => (
                  <button
                    onClick={() => {
                      setDropdownVisible(!dropdownVisible);
                      window.open(`${basePath}/${event.id}/home`, "_blank");
                    }}
                    key={event.id}
                    className="btn block text-left p-2 px-4 m-1 rounded-full text-lg hover:bg-gray-100 transition duration-200"
                  >
                    {limitEventName(event.nama_acara)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link to="/register">
          <button
            className="text-black px-8 py-2 rounded border border-black transition duration-200 ease-in-out transform hover:scale-105"
            onMouseEnter={() => setHoveredIndex(-1)}
            style={{
              backgroundColor: hoveredIndex === -1 ? "#00FF94" : "#FFFFFF",
              borderColor: hoveredIndex === -1 ? "#FFFFFF" : "#000000",
            }}
          >
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
