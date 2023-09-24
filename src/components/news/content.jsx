import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL, API_GAMBAR_URL } from "../../config";
import { MainContext } from "../../context/MainContext";
import { useParams } from "react-router-dom";

function Artikel() {
  const [currentPage, setCurrentPage] = useState(1);
  const [semuaCards, setSemuaCards] = useState([]);
  const cardsPerPage = 4;
  const { eventId } = useParams();
  const { event } = useContext(MainContext);

  useEffect(() => {
    const fetchData = async () => {
      if (eventId != undefined) {
        try {
          const response = await axios.get(`${API_BASE_URL}news`);
          const filteredData = response.data.filter(
            (item) => item.event == eventId
          );
          setSemuaCards(filteredData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        try {
          const response = await axios.get(`${API_BASE_URL}news`);
          const filteredData = response.data.filter(
            (item) => item.event == event
          );
          setSemuaCards(filteredData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [event, eventId]);

  const paginate = (cards) => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return cards.slice(startIndex, endIndex);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = (totalCards) => {
    const pageCount = Math.ceil(totalCards / cardsPerPage);
    const buttons = [];

    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <button
          key={i}
          className={`
                btn p-2 px-4 m-1 rounded-full text-lg 
                ${
                  currentPage === i
                    ? "active-page"
                    : "bg-white border border-dark text-dark hover:bg-gray-200"
                }
              `}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-5 mb-5 space-x-2">{buttons}</div>
    );
  };

  semuaCards.sort((a, b) => new Date(b.date) - new Date(a.date));

  const displayedCards = paginate(semuaCards);

  const sliceDescription = (description, numSentences) => {
    const sentences = description.split(".");
    const slicedSentences = sentences.slice(0, numSentences);
    return { __html: `${slicedSentences.join(". ")}` };
  };

  return (
    <>
      <div className="w-3/4 flex flex-col items-start justify-center ms-28 text-left">
        <h1 className="text-5xl font-bold mb-12 font-plus-jakarta">News</h1>
      </div>

      <div className="container font-plus-jakarta">
        {displayedCards.map((card) => (
          <div
            key={card.judul_artikel}
            className="mb-4 flex flex-row border rounded-lg shadow-lg bg-white overflow-hidden w-3/4 mx-auto"
          >
            <div className="flex-none w-1/4">
              <img
                src={`${API_GAMBAR_URL}${card.gambar_news}`}
                alt={card.title}
                className="object-cover h-full w-full"
              />
            </div>

            <div className="flex flex-1 p-3 flex-col justify-between">
              <h1 className="card-title break-words mb-2 text-3xl">
                {card.title}
              </h1>
              <p className="card-text text-sm">
                <span className="font-semibold">
                  <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(card.date))}
                </span>
              </p>
              <p
                className="card-text mb-3"
                dangerouslySetInnerHTML={sliceDescription(card.deskripsi, 2)}
              ></p>
              <a
                href={`/news/${card.id}`}
                className="bg-transparent border-[2px] border-[#00FF94] text-[#603a15] rounded-full flex justify-center items-center text-center transition-all ease-in-out duration-300 hover:bg-[#00FF94] hover:text-white w-40 h-12 text-sm"
              >
                Read More
              </a>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-center mt-3 mb-5">
          {renderPaginationButtons(semuaCards.length)}
        </div>
      </div>
    </>
  );
}

export default Artikel;
