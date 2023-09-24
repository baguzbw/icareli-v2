import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./components/pages/About";
import Commite from "./components/pages/Commite";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Dashboard";
import News from "./components/pages/News";
import Program from "./components/pages/Program";
import Register from "./components/pages/Register";
import Speakers from "./components/pages/Speakers";
import ArticleDetail from "./components/news/ArticleDetail";
import MainProvider from "./context/MainContext";

function App() {
  return (
    <MainProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/commitee" element={<Commite />} />
          <Route path="/news" element={<News />} />
          <Route
            path="/news/:id"
            element={<ArticleDetail key={window.location.pathname} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/program" element={<Program />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </Router>
    </MainProvider>
  );
}

export default App;
