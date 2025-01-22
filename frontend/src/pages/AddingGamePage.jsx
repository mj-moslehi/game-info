import Header from "../components/Header";
import "../styles/AddingGamePage.css";
import {useState} from "react";
import axios from "axios";
import Cookie from "js-cookie";
import * as XLSX from "xlsx";

const AddingGamePage = () => {
    const [games, setGames] = useState("");
    const [type, setType] = useState("");
    const [genre, setGenre] = useState("");
    const [error, setError] = useState("");
    const [rowData, setRowData] = useState([]);
    const [showOtherButtons, setShowOtherButtons] = useState(false);
    const [isProgress, setIsProgress] = useState(false);
    const [database, setDatabase] = useState(false);
    const [message, setMessage] = useState("");
    const token = Cookie.get("authToken");

    const handleStart = async () => {
        setMessage("");
        setError("");
        if (!games) {
            setError("please enter game names ");
            return;
        }

        setIsProgress(true);

        const gameList = games.split("\n").filter((game) => game.trim() !== "");

        // if (gameList.length > 145) {
        //     setError("The maximum is 145 Games");
        //     setIsProgress(false);
        //     return;
        // }

        try {
            const responseDate = await axios.post(
                "http://localhost:2555/gameInfo/parsing-generate-data",
                {
                    authorization: token,
                    gameList: gameList,
                    type: type,
                    genre: genre,
                }
            );
            setRowData(responseDate.data);
            setShowOtherButtons(true);
            setIsProgress(false);
            setMessage("Game Data Generated :)");
        } catch (err) {
            setIsProgress(false);
            setError(err.response?.data?.error || JSON.stringify(err.response?.data));
        }
    };

    const handleDownload = async () => {
        setMessage("");
        setError("");
        try {
            await axios.get("http://localhost:2555/gameInfo/convert-to-excel", {
                headers: {
                    authorization: token,
                },
            });
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(rowData);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            const blob = new Blob([excelBuffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Games.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setMessage("Excel file downloaded");
        } catch (err) {
            setError(err.response?.data?.error || JSON.stringify(err.response?.data));
        }
    };

    const handleAddToDatabase = async () => {
        setMessage("");
        setError("");
        try {
            setDatabase(true);
            const batchSize = 15;
            var responseData = {};
            var number = 0;
            for (let i = 0; i < rowData.length; i += batchSize) {
                const batch = rowData.slice(i, i + batchSize);
                responseData = await axios.post(
                    "http://localhost:2555/gameInfo/create",
                    {
                        gameData: batch,
                        authorization: token,
                    }
                );
                number += responseData.data.number;
            }
            setDatabase(false);
            setMessage(
                `The ${number} of ${rowData.length} games ,was added to database`
            );
        } catch (error) {
            setDatabase(false);
            setError(
                error.response?.data?.error || JSON.stringify(error.response?.data)
            );
        }
    };

    const handleTextInput = (e) => {
        setMessage("");
        setError("");
        const value = e.target.value;
        setGames(value);
    };

    const handleTypeInput = (e) => {
        setMessage("");
        setError("");
        const value = e.target.value;
        setType(value);
    };

    const handleGenreInput = (e) => {
        setMessage("");
        setError("");
        const value = e.target.value;
        setGenre(value);
    };

    return (
        <div className="add-game-page">
            <Header/>
            <div className="main-container-add-game">
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
                <textarea
                    className="game-text"
                    placeholder="List of game names"
                    onChange={handleTextInput}
                    disabled={isProgress}
                ></textarea>

                <button
                    className="start-button"
                    onClick={handleStart}
                    disabled={isProgress}
                >
                    {isProgress ? "Is Progressing..." : "Start"}
                </button>
                {showOtherButtons && !isProgress && (
                    <>
                        <button className="download-excel-button" onClick={handleDownload}>
                            Download Excel
                        </button>
                        <button
                            className="add-database-button"
                            onClick={handleAddToDatabase}
                            disabled={database}
                        >
                            {database ? "Is Adding..." : "Add to Database"}
                        </button>
                    </>
                )}

                <input
                    className="selection"
                    onChange={handleTypeInput}
                    disabled={isProgress}
                    placeholder="Type :"
                >
                </input>

                <input
                    className="selection2"
                    onChange={handleGenreInput}
                    disabled={isProgress}
                    placeholder="Genre :"
                >
                </input>

            </div>
        </div>
    );
};

export default AddingGamePage;
