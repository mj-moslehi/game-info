import Header from "../components/Header";
import "../styles/SearchGamePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const SearchGamePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = Cookie.get("authToken");

  const fetchAllGame = async () => {
    setError("");
    try {
      setError("loading...");
      const response = await axios.post(
        "http://localhost:2555/gameInfo/find-all",
        {
          authorization: token,
        }
      );
      setResults(response.data);
      setError("");
    } catch (error) {
      setError("");
      setError(error.response?.data?.error);
    }
  };

  const handleSearchInput = async (e) => {
    setError("");
    const value = e.target.value;
    setSearchInput(value);

    try {
      const response = await axios.post(
        "http://localhost:2555/gameInfo/searching-with-name",
        {
          name: searchInput,
          authorization: token,
        }
      );
      setResults(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleNavigate = (gameId) => {
    Cookie.set("gameId", gameId);
    navigate("/edit-game");
  };

  useEffect(() => {
    fetchAllGame();
  }, []);

  return (
    <div className="search-game-page">
      <Header />
      <div className="main-container-search-game">
        <div className="title">
          <h1>Search In Games</h1>
        </div>
        {error && (
          <div className="error-message-search">
            <p>{typeof error === "object" ? JSON.stringify(error) : error}</p>
          </div>
        )}
        <input
          className="search-input"
          type="text"
          placeholder="Enter a Game Name"
          onChange={handleSearchInput}
        />

        <div className="result-box">
          <ul className="list">
            {results.map((game) => (
              <li key={game._id}>
                <button
                  className="choosing-game"
                  onClick={() => handleNavigate(game._id)}
                >
                  {game.gameName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SearchGamePage;
