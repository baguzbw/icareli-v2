import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { MainContext } from "../../context/MainContext";

const Accordion = ({ title, content, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-plus-jakarta" style={{ marginBottom: "60px" }}>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          background: "transparent",
          border: "none",
          justifyContent: "space-between",
          width: "1280px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            borderBottom: "2px solid",
            paddingBottom: "5px",
          }}
        >
          <span style={{ marginRight: "10px" }}>{isOpen ? "-" : "+"}</span>
          <h3 style={{ flex: 1, textAlign: "right", margin: 0 }}>{title}</h3>
        </div>
      </button>
      <div
        style={{
          maxHeight: isOpen ? "200px" : "0",
          overflow: "hidden",
          transition: "maxHeight 0.5s ease",
        }}
      >
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button
            style={{
              width: "100%",
              textAlign: "right",
              backgroundColor: "#00FF94",
            }}
          >
            {content}
          </button>
        </a>
      </div>
    </div>
  );
};

const HeaderRegister = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { event } = useContext(MainContext);

  const accordionData = data
    ? [
        {
          title: "Registration participant as non-presenter",
          content: "Click Here for Non-Presenter Registration",
          link: data.link_nonpresenter,
        },
        {
          title:
            "Registration participant as presenter only without publication",
          content: "Click Here for Presenter Registration",
          link: data.link_presenter,
        },
        {
          title:
            "Registration participant as presenter with planned publication in IOP-EES",
          content: "Click Here for Publication in IOP-EES",
          link: data.link_presenteriop,
        },
      ]
    : [];

  useEffect(() => {
    const url = `${API_BASE_URL}registration`;

    axios
      .get(url)
      .then((response) => {
        // setData(response.data[0]);
        const filteredData = response.data.filter(
          (item) => item.event === event
        );
        setData(filteredData[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, [event]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data == null) {
    return <div>No data</div>;
  }

  Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  };

  return (
    <div className="flex flex-col items-center justify-center h-1/2 p-20 text-center">
      <div className="w-3/4 flex flex-col items-center justify-center p-5 text-center">
        <h1 className="text-5xl font-bold mb-12 font-plus-jakarta">
          ABSTRACT SUBMISSION:
        </h1>
        <h1 className="text-3xl font-bold mb-2 font-plus-jakarta">
          The abstract can be submitted through the following
        </h1>
        <h1 className="text-3xl font-bold mb-12 font-plus-jakarta">
          <a
            href={data.link_abstract}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00FF94" }}
          >
            Abstract Submission Link
          </a>
        </h1>
      </div>
      <div
        className=" font-plus-jakarta text-lg"
        style={{
          backgroundColor: "#F2F700",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "20px 0",
          textAlign: "left",
          marginBottom: "50px",
        }}
      >
        ICARELI 2023 will publish paper presented in the conference after a peer
        review process. The ICARELI proceeding is planned to be published in an
        open access database. After registration as presenter with publication,
        the organizer will send abstract format to participant. The abstract
        will be screened first for scope and notified for acceptance, followed
        by further detail on full length manuscript preparation. Please follow
        first information for manuscript preparation below:
        <ol className="mt-12 mb-12">
          <li style={{ marginBottom: "10px" }}>
            1. Please note that works published in the ICARELI cannot be
            considered for publication in any other journal.
          </li>
          <li style={{ marginBottom: "10px" }}>
            2.The authors are responsible to prepare manuscript in English
            version. Kindly check your language to be clear and concise,
            especially if English is not your mother language.
          </li>
          <li style={{ marginBottom: "10px" }}>
            3.Please write your manuscript according to template provided on the
            further notification detail.
          </li>
          <li style={{ marginBottom: "10px" }}>
            4.Papers do not follow these guidelines will be returned for editing
            process. This will make your paper processing getting longer.
          </li>
          <li style={{ marginBottom: "10px" }}>
            5.The manuscript needs to be sent before the deadline. Kindly, check
            the important dates (Important Date – 2nd ICARELI) periodically.
          </li>
          <li style={{ marginBottom: "10px" }}>
            6.Authors who choose to publish the manuscript in LAR and JITAA
            through registration shall follow the guidance for LAR and JITAA.
          </li>
          <li style={{ marginBottom: "10px" }}>
            7.The decision of acceptance will be assigned by the Editor in Chief
            of LAR and JITAA.
          </li>
        </ol>
        The full paper must be submitted through our Registration link that can
        be found at the end of this page. Please use following templates to
        prepare your manuscript to the 2nd ICARELI 2023 according to your
        preference.
      </div>
      <div className="w-3/4 flex flex-col items-start justify-center p-5 mb-8 text-left font-plus-jakarta">
        <h1 className="text-5xl font-bold ">TEMPLATE</h1>
        <div className="flex justify-center w-full mt-8 space-x-4">
          <a href={data.link_iop} target="_blank" rel="noopener noreferrer">
            <button className="bg-[#00FF94] hover:bg-[#14FF00] text-[#5E5E63] font-semibold text-xl py-6 px-12 rounded-xl mx-2 my-2 flex items-center justify-center transition duration-500 ease-in-out text-center w-full">
              IOP TEMPLATE
            </button>
          </a>
          <a href={data.link_lar} target="_blank" rel="noopener noreferrer">
            <button className="bg-[#00FF94] hover:bg-[#14FF00] text-[#5E5E63] font-semibold text-xl py-6 px-12 rounded-xl mx-2 my-2 flex items-center justify-center transition duration-500 ease-in-out text-center w-full">
              LAR TEMPLATE
            </button>
          </a>
          <a href={data.link_jitaa} target="_blank" rel="noopener noreferrer">
            <button className="bg-[#00FF94] hover:bg-[#14FF00] text-[#5E5E63] font-semibold text-xl py-6 px-12 rounded-xl mx-2 my-2 flex items-center justify-center transition duration-500 ease-in-out text-center w-full">
              JITAA TEMPLATE
            </button>
          </a>
        </div>
      </div>
      <div className="w-3/4 flex flex-col items-start justify-center p-5 text-left">
        <h1 className="text-5xl font-bold mb-12 font-plus-jakarta">
          CONFERENCE FEE
        </h1>
        <div
          className="text-lg font-plus-jakarta"
          dangerouslySetInnerHTML={{ __html: data.conference_fee }}
        />
      </div>
      <div className="w-3/4 flex flex-col items-start justify-center mt-8 mb-24 p-5 text-left">
        <h1 className="text-5xl font-bold mb-12 font-plus-jakarta">PAYMENT</h1>
        <div
          className="text-lg font-plus-jakarta"
          dangerouslySetInnerHTML={{ __html: data.payment }}
        />
      </div>

      <div className="flex flex-col text-right justify-start p-10 text-4xl w-full">
        {accordionData.map((item, index) => (
          <Accordion
            key={index}
            title={item.title}
            content={item.content}
            link={item.link}
          />
        ))}
      </div>
      <div
        className=" font-plus-jakarta"
        style={{
          backgroundColor: "#F2F700",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "20px 0",
          textAlign: "center",
        }}
      >
        Accepted articles will be included in the published paper by IOP
        Conference Series: Earth and Environmental Science 2nd quarter 2023
        which can be accessed through this following{" "}
        <a
          href="https://publishingsupport.iopscience.iop.org/ees-forthcoming-volumes/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>IOP EES Link</b>
        </a>
      </div>
    </div>
  );
};

export default HeaderRegister;