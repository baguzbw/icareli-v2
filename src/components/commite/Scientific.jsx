import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { API_BASE_URL } from "../../config";
import { MainContext } from "../../context/MainContext";
import { useParams } from "react-router-dom";

const Scientific = () => {
  const [scientificBoard, setScientificBoard] = useState([]);
  const { eventId } = useParams();
  const { event } = useContext(MainContext);

  useEffect(() => {
    const fetchData = async () => {
      if (eventId != undefined) {
        try {
          const response = await axios.get(`${API_BASE_URL}scientific`);
          const filteredData = response.data.filter(
            (item) => item.event == eventId
          );
          setScientificBoard(filteredData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        try {
          const response = await axios.get(`${API_BASE_URL}scientific`);
          const filteredData = response.data.filter(
            (item) => item.event == event
          );
          setScientificBoard(filteredData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [event, eventId]);

  return (
    <div className="flex justify-center text-center font-plus-jakarta">
      <div className="flex flex-col justify-left p-10">
        <h1 className="text-xl font-bold mb-8">Scientific board</h1>
        <div className="flex justify-center w-full">
          <table
            className="table-fixed w-3/4 font-semibold"
            style={{ paddingLeft: "20px", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th
                  className="w-1/2 px-4 py-2 border-b-2 border-gray-600"
                  style={{
                    background: "linear-gradient(to left, #9EFF00, #00FF94)",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                >
                  Name
                </th>
                <th
                  className="w-1/2 px-4 py-2 border-b-2 border-gray-600"
                  style={{
                    background: "linear-gradient(to right, #9EFF00, #00FF94)",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                >
                  Institutions
                </th>
              </tr>
            </thead>
            <tbody>
              {scientificBoard.map((advisory, index) => (
                <tr key={index}>
                  <td className="border-b-2 text-center border-gray-600 px-4 py-2">
                    {advisory.nama}
                  </td>
                  <td className="border-b-2 text-center border-gray-600 px-4 py-2">
                    {advisory.instansi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scientific;
