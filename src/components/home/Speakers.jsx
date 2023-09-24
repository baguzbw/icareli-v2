import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, API_GAMBAR_URL } from "../../config";
import { MainContext } from "../../context/MainContext";

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const { event } = useContext(MainContext);

  useEffect(() => {
    const url = `${API_BASE_URL}speaker`;

    axios
      .get(url)
      .then((response) => {
        const filteredData = response.data.filter(
          (item) => item.event === event
        );
        setSpeakers(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [event]);

  return (
    <div className="container mx-auto font-plus-jakarta p-8 mb-20 text-center">
      <h1 className="text-4xl font-semibold mb-6">SPEAKERS</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {speakers.slice(0, 3).map((speaker, index) => (
          <div key={index} className="m-4 w-[320px]">
            <div
              className="bg-white shadow-lg rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 0 4px #00FF94, 0 0 8px #00FF94, 0 0 12px #00FF94, 0 0 16px #00FF94",
              }}
            >
              <img className=" w-[320px] h-[420px] object-contain mx-auto mt-4" src={`${API_GAMBAR_URL}${speaker.gambar_speaker}`} alt={`Speaker ${index}`} />
            </div>
            <h2 className="text-xl font-semibold mt-4 mb-2">{speaker.nama}</h2>
            <p className="text-gray-600 text-sm">{speaker.instansi}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/speakers">
          <button
            className="px-6 py-3 text-white text-xl rounded-2xl"
            style={{
              backgroundImage: "linear-gradient(to right, #9EFF00, #00DEFC)",
            }}
          >
            See All Speakers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Speakers;
