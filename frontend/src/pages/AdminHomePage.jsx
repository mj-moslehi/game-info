import Header from "../components/Header";
import "../styles/AdminHomePage.css";
import profile from "../assets/output_circular_stroke.png";
import editUsers from "../assets/output_circular_stroke_0.png";
import addGame from "../assets/output_circular_stroke_2.png";
import editGame from "../assets/output_circular_stroke_3.png";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-home-page">
      <Header />
      <div className="main-container-admin-home">
        <img
          className="profile-icon"
          src={profile}
          onClick={() => {
            navigate("/profile");
          }}
        />
        <p className="profile-icon-label">Profile</p>

        <img className="edit-users-icon" src={editUsers} />
        <p className="edit-users-icon-label">Edit Users</p>

        <img
          className="add-game-icon"
          src={addGame}
          onClick={navigate("/add-game")}
        />
        <p className="add-game-icon-label">Add a Game</p>

        <img
          className="edit-game-icon"
          src={editGame}
          onClick={navigate("/search-games")}
        />
        <p className="edit-game-icon-label">Search And Edit Games</p>
      </div>
    </div>
  );
};

export default AdminHomePage;
