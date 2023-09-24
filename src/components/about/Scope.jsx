import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL, API_GAMBAR_URL } from "../../config";
import illustration from "../assets/IcareliUNS.svg";
import illustration2 from "../assets/sdg.svg";
import { MainContext } from "../../context/MainContext";
import { useParams } from "react-router-dom";

const DescPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();
  const { event } = useContext(MainContext);

  useEffect(() => {
    const url = `${API_BASE_URL}scope`;
    if (eventId != undefined) {
      axios
        .get(url)
        .then((response) => {
          const filteredData = response.data.filter(
            (item) => item.event == eventId
          );
          setData(filteredData[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setError("Error fetching data. Please try again later.");
          setLoading(false);
        });
    } else {
      axios
        .get(url)
        .then((response) => {
          const filteredData = response.data.filter(
            (item) => item.event == event
          );
          setData(filteredData[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setError("Error fetching data. Please try again later.");
          setLoading(false);
        });
    }
  }, [event, eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data == null) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col h-auto font-plus-jakarta p-24">
      <div className="flex flex-row justify-start items-start mb-10">
        <div className="flex flex-col w-2/4 mr-4">
          <img
            src={`${API_GAMBAR_URL}${data?.gambar_1}`}
            alt="Image 1"
            className="mb-4 w-3/4 rounded-2xl"
          />
          <img
            src={`${API_GAMBAR_URL}${data?.gambar_2}`}
            alt="Image 2"
            className="mb-4 w-3/4 rounded-2xl"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-10">SCOPE :</h1>
          <div
            className="text-lg mt-4"
            dangerouslySetInnerHTML={{ __html: data?.deskripsi }}
          />
        </div>
      </div>
      <div className="w-full mt-24  flex justify-center items-center">
        <img
          src={illustration2}
          alt="Illustration"
          style={{ width: "auto", height: "90px", marginRight: "30px" }}
        />
        <img
          src={illustration}
          alt="Illustration"
          style={{ width: "auto", height: "90px", marginLeft: "30px" }}
        />
      </div>
    </div>
  );
};

export default DescPage;
