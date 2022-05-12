import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import SearchPage from "./Components/SearchPage/SearchPage";
import RepoList from "./Components/RepoList/RepoList";
import RepoDetails from "./Components/RepoDetails/RepoDetails";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/project" element={<RepoList />} />
          <Route path="/details" element={<RepoDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
