import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { MainContext } from "../../context/MainContext";
import backgroundImage from "../assets/background.svg";
import { useParams } from "react-router-dom";

const Home = () => {
  const [home, setHome] = useState([]);
  const { eventId } = useParams();
  const { event } = useContext(MainContext);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const url = `${API_BASE_URL}event`;
    console.log(eventId);
    console.log("event" + event);
    if (eventId != undefined) {
      axios
        .get(url)
        .then((response) => {
          const filteredData = response.data.filter(
            (item) => item.id == eventId
          );
          setHome(filteredData[0]);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    } else {
      axios
        .get(url)
        .then((response) => {
          const filteredData = response.data.filter((item) => item.id == event);
          setHome(filteredData[0]);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [event, eventId]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen p-5 text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-3/4 flex flex-col items-center justify-center p-5 text-center">
        <h1 className="text-6xl font-bold mb-4 p-5 font-plus-jakarta">
          {home.nama_acara}
        </h1>
        <h1 className="text-2xl font-bold mb-4 p-5 font-plus-jakarta">
          {home.tagline_acara}
        </h1>
        <p className="text-2xl font-plus-jakarta">{formatDate(home.date)}</p>
      </div>
    </div>
  );
};

export default Home;
