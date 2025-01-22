import Header from "../components/Header";
import "../styles/EmployeeHomePage.css";
import profile from "../assets/output_circular_stroke.png";
import addGame from "../assets/output_circular_stroke_2.png";
import editGame from "../assets/output_circular_stroke_3.png";
import { useNavigate } from "react-router-dom";

const EmployeeHomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="employee-home-page">
      <Header />
      <div className="main-container-employee-home">
        <img
          className="profile-icon"
          src={profile}
          onClick={() => {
            navigate("/profile");
          }}
        />
        <p className="profile-icon-label">Profile</p>

        <img
          className="add-game-icon"
          src={addGame}
          onClick={() => {
            navigate("/add-games");
          }}
        />
        <p className="add-game-icon-label">Add a Game</p>

        <img
          className="edit-game-icon"
          src={editGame}
          onClick={() => {
            navigate("/search-games");
          }}
        />
        <p className="edit-game-icon-label">Search And Edit Games</p>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
