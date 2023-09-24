import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL, API_GAMBAR_URL } from "../../config";
import { MainContext } from "../../context/MainContext";
import { useParams } from "react-router-dom";

const DescPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();
  const { event } = useContext(MainContext);

  useEffect(() => {
    const url = `${API_BASE_URL}about`;
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
      <div className="flex flex-col justify-center">
        <div className="flex justify-center items-center mb-8">
          <img
            src={`${API_GAMBAR_URL}${data?.gambar_about}`}
            alt="Image 1"
            className="w-1/2 rounded-xl"
          />
        </div>
        <div
          className="text-xl mt-4"
          dangerouslySetInnerHTML={{ __html: data?.deskripsi }}
        />
      </div>
    </div>
  );
};

export default DescPage;
