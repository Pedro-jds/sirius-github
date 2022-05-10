import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import SearchPage from "./Components/SearchPage/SearchPage";
import ProjectList from "./Components/ProjectList/ProjectList";
import ProjectDetails from "./Components/ProjectPage/ProjectDetails";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/project" element={<ProjectList />} />
          <Route path="/details" element={<ProjectDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
