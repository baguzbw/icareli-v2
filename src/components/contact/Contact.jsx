import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { API_BASE_URL } from "../../config";
import { MainContext } from "../../context/MainContext";

const Contact = () => {
  const [contactData, setContactData] = useState({
    address: "",
    emailAndWeb: "",
    phone: "",
    fax: "",
  });
  const { event } = useContext(MainContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}contact`);
        const filteredData = response.data.filter(
          (item) => item.event === event
        );
        setContactData(filteredData[0]);
        console.log(event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center text-center font-plus-jakarta">
      <div className="flex flex-col p-10 w-3/4">
        <h1 className="text-xl font-bold mb-8 text-left">All the inquiries about the conference shall be addressed to:</h1>
        <table className="table-fixed w-full font-semibold" style={{ paddingLeft: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="w-1/2 text-xl px-4 py-2 text-left border-b-2 border-gray-600">Address</th>
              <th className="w-1/2 px-4 py-2 text-left border-b-2 border-gray-600" dangerouslySetInnerHTML={{ __html: contactData.address }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="w-1/2 text-xl px-4 py-2 text-left border-b-2 border-gray-600">Email & Web</th>
              <th className="w-1/2 px-4 py-2 text-left border-b-2 border-gray-600">
                <a href={contactData.emailAndWeb} dangerouslySetInnerHTML={{ __html: contactData.email }}></a>
              </th>
            </tr>
            <tr>
              <th className="w-1/2 text-xl px-4 py-2 text-left border-b-2 border-gray-600">Phone</th>
              <th className="w-1/2 px-4 py-2 text-left border-b-2 border-gray-600" dangerouslySetInnerHTML={{ __html: contactData.phone }}></th>
            </tr>
            <tr>
              <th className="w-1/2 text-xl px-4 py-2 text-left border-b-2 border-gray-600">Fax</th>
              <th className="w-1/2 px-4 py-2 text-left border-b-2 border-gray-600" dangerouslySetInnerHTML={{ __html: contactData.fax }}></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;
