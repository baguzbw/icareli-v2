import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../news/HeaderNews";

import { API_BASE_URL, API_GAMBAR_URL } from "../../config";

function ArticleDetail() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}news`);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const foundArticle = articles.find(
      (article) => article.id.toString() === id
    );
    setArticle(foundArticle);
  }, [id, articles]);

  const formatDate = (dateString) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const date = new Date(dateString);
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;
  };

  return (
    <>
      <Header />
      {article && (
        <div className="container font-plus-jakarta">
          <h1
            className="text-4xl"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            {article.title}
          </h1>
          <small
            className="text-lg"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            {formatDate(article.date)}
          </small>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <img
              className="article-image rounded-xl"
              src={`${API_GAMBAR_URL}${article.gambar_news}`}
              alt={article.title}
            />
          </div>
          <div style={{ margin: "0 auto", maxWidth: "80%", marginTop: "40px" }}>
            <p dangerouslySetInnerHTML={{ __html: article.deskripsi }}></p>
          </div>
          <div className="my-10 ml-28">
            <h2 className="text-left font-bold mb-5">Another News</h2>
            <div className="mt-3 flex flex-row gap-5">
              {articles.slice(-3).map((art) => (
                <Link
                  key={art.id}
                  to={`/news/${art.id}`}
                  className="group no-underline hover:underline text-current"
                >
                  <div className="article-card p-3 border w-64 h-auto max-w-md rounded shadow hover:shadow-lg transition-all flex flex-col items-center">
                    <div className="h-32 w-48 overflow-hidden relative rounded mb-3">
                      <img
                        className="absolute top-0 left-0 w-full h-full object-cover rounded"
                        src={`${API_GAMBAR_URL}${art.gambar_news}`}
                        alt={art.title}
                      />
                    </div>
                    <h6 className="text-center break-words">{art.title}</h6>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArticleDetail;
