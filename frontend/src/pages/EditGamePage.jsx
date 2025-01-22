import {useEffect, useState} from "react";
import Header from "../components/Header";
import axios from "axios";
import "../styles/EditGamePage.css";
import Cookie from "js-cookie";

const EditGamePage = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        gameName: "",
        genre: "",
        summary: "",
        about: "",
        type: "",
        organization: "",
        developerStudio: "",
        publisher: "",
        characters: "",
        locations: "",
        awards: "",
        events: "",
        platform: "",
        media: "",
        books: ""
    });
    const token = Cookie.get("authToken");
    const id = Cookie.get("gameId");

    const fetchGameInfo = async () => {
        setError("");
        setMessage("");
        try {
            const response = await axios.post(
                "http://localhost:2555/gameInfo/find-by-id",
                {
                    id: id,
                    authorization: token,
                }
            );
            const gameData = response.data;
            setFormData({
                gameName: gameData.gameName || "",
                genre: gameData.genre || "",
                summary: gameData.summary || "",
                about: gameData.about || "",
                type: gameData.type || "",
                organization: gameData.organization || "",
                developerStudio: gameData.developerStudio || "",
                publisher: gameData.publisher || "",
                characters: gameData.characters || "",
                locations: gameData.locations || "",
                awards: gameData.awards || "",
                events: gameData.events || "",
                platform: gameData.platform || "",
                media: gameData.media || "",
                books: gameData.books || "",
            });
        } catch (error) {
            setError(
                error.response?.data?.error ||
                "An error occurred while fetching game info."
            );
        }
    };

    const handleInputChange = (e) => {
        setError("");
        setMessage("");
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        setError("");
        setMessage("");
        try {
            await axios.put("http://localhost:2555/gameInfo/update", {
                id: id,
                updateReq: formData,
                authorization: token,
            });
            setMessage("Game updated successfully");
        } catch (error) {
            setError(
                error.response?.data?.error ||
                "An error occurred while updating the game."
            );
        }
    };

    const handleDelete = async () => {
        setError("");
        setMessage("");
        try {
            await axios.put("http://localhost:2555/gameInfo/delete", {
                id: id,
                authorization: token,
            });
            setMessage("Game deleted successfully");
        } catch (error) {
            setError(
                error.response?.data?.error ||
                "An error occurred while updating the game."
            );
        }
    };

    useEffect(() => {
        fetchGameInfo();
    }, []);

    return (
        <div className="edit-game-page">
            <Header/>
            <div className="main">
                {error && (
                    <div className="error-message">
                        <p>{typeof error === "object" ? JSON.stringify(error) : error}</p>
                    </div>
                )}

                {message && (
                    <div className="message">
                        <p>{message}</p>
                    </div>
                )}

                <button className="update button" onClick={handleUpdate}>
                    Save and Update
                </button>

                <button className="delete button" onClick={handleDelete}>
                    Delete This Game
                </button>

                <div className="box">
                    <div className="box-title">Game Name :</div>
                    <textarea
                        className="field very-short game-name"
                        name="gameName"
                        value={formData.gameName}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title">Genre :</div>
                    <textarea
                        className="field very-short category"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title">Summary :</div>
                    <textarea
                        className="field big summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title">About :</div>
                    <textarea
                        className="field big about"
                        name="about"
                        value={formData.about}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Type :</div>
                    <textarea
                        className="field short producers"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Organization :</div>
                    <textarea
                        className="field short distributors"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Dev Studio :</div>
                    <textarea
                        className="field short organizations"
                        name="developerStudio"
                        value={formData.developerStudio}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Publisher :</div>
                    <textarea
                        className="field short characters"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Characters :</div>
                    <textarea
                        className="field short spaces"
                        name="characters"
                        value={formData.characters}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Locations :</div>
                    <textarea
                        className="field short awards"
                        name="locations"
                        value={formData.locations}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Awards :</div>
                    <textarea
                        className="field short events"
                        name="awards"
                        value={formData.awards}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Events :</div>
                    <textarea
                        className="field short versions"
                        name="events"
                        value={formData.events}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Platform :</div>
                    <textarea
                        className="field short movies"
                        name="platform"
                        value={formData.platform}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="box">
                    <div className="box-title medium">Media :</div>
                    <textarea
                        className="field short books"
                        name="media"
                        value={formData.media}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="box">
                    <div className="box-title medium">Books :</div>
                    <textarea
                        className="field short books"
                        name="books"
                        value={formData.books}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default EditGamePage;
