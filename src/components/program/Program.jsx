import PropTypes from "prop-types";
import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { API_BASE_URL } from "../../config";
import illustration from "../assets/IcareliUNS.svg";
import illustration2 from "../assets/sdg.svg";
import { MainContext } from "../../context/MainContext";

const Accordion = ({ title, content, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          background: "transparent",
          border: "none",
          justifyContent: "space-between",
          width: "400px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: "flex", alignItems: "center", flex: 1, borderBottom: "2px solid", paddingBottom: "5px" }}>
          <span style={{ marginRight: "10px" }}>{isOpen ? "-" : "+"}</span>
          <h3 style={{ flex: 1, textAlign: "right", margin: 0 }}>{title}</h3>
        </div>
      </button>
      <div style={{ maxHeight: isOpen ? "200px" : "0", overflow: "hidden", transition: "maxHeight 0.5s ease" }}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button style={{ width: "100%", textAlign: "right", backgroundColor: "#00FF94" }}>{content}</button>
        </a>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const DescPage = () => {
  const [data, setData] = useState([]);
  const { event } = useContext(MainContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}programguide`);
        const filteredData = response.data.filter(
          (item) => item.event === event
        );
        setData(filteredData);
        console.log(event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-between p-20 text-left font-plus-jakarta">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center p-10">
          <h1 className="text-8xl font-bold mb-2">ICARELI</h1>
          <h1 className="text-8xl font-bold">GUIDE</h1>
        </div>
        <div className="flex flex-col text-right justify-start p-10 text-4xl">
          {data.map((item, index) => (
            <Accordion key={index} title={item.nama_program} content="Download File" link={item.link_program} />
          ))}
        </div>
      </div>
      <div className="w-full mt-24 flex justify-center items-center">
        <img src={illustration2} alt="Illustration" style={{ width: "auto", height: "90px", marginRight: "30px" }} />
        <img src={illustration} alt="Illustration" style={{ width: "auto", height: "90px", marginLeft: "30px" }} />
      </div>
    </div>
  );
};

export default DescPage;
