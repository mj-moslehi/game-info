const GameInfoRepository = require("../repository/gameInfoRepository");
const OpenAI = require("openai");
const XLSX = require("xlsx");
require("dotenv").config();

class GameInfoService {
    constructor() {
        this.openai = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
        });
    }

    async createGameInfo(GameData) {
        try {
            if (!GameData) throw new Error("there isn't any game Info for creating");
            const gamesToCreate = [];

            await Promise.all(
                GameData.map(async (game) => {
                    if (!(await GameInfoRepository.findGameByName(game.gameName))) {
                        gamesToCreate.push(game);
                    }
                })
            );

            await Promise.all(
                gamesToCreate.map(async (game) => {
                    await GameInfoRepository.createGameInfo(game);
                })
            );

            return gamesToCreate.length;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findGameInfoById(gameInfoId) {
        try {
            const gameInfo = await GameInfoRepository.findGameInfoById(gameInfoId);
            if (!gameInfo)
                throw new Error(`game info with id:${gameInfoId} wasn't found`);
            return gameInfo;
        } catch (error) {
            throw new Error(`failed to find id:${error.message}`);
        }
    }

    async findGameInfoByName(gameName) {
        try {
            const gameInfo = await GameInfoRepository.findGameByName(gameName);
            if (!gameInfo)
                throw new Error(`gameInfo with name:${gameName} wasn't found`);
            return gameInfo;
        } catch (error) {
            throw new Error(`failed to find gameInfo by name:${error.message}`);
        }
    }

    async updateGameInfo(updateReq, id) {
        try {
            const updatedGameInfo = {
                gameName: updateReq.gameName,
                genre: updateReq.genre,
                summary: updateReq.summary,
                about: updateReq.about,
                type: updateReq.type,
                organization: updateReq.organization,
                developerStudio: updateReq.developerStudio,
                publisher: updateReq.publisher,
                characters: updateReq.characters,
                locations: updateReq.locations,
                awards: updateReq.awards,
                events: updateReq.events,
                platform: updateReq.platform,
                topPlayers: updateReq.topPlayers,
                media: updateReq.media,
                books: updateReq.books,
            };

            return await GameInfoRepository.updateGameInfo(id, updatedGameInfo);
        } catch (error) {
            throw new Error(
                `failed to update game info with name:${gameName} -> ${error.message}`
            );
        }
    }

    async deleteGameInfo(gameInfoId) {
        try {
            await GameInfoRepository.deleteGameInfo(gameInfoId);
        } catch (error) {
            throw new Error(
                `failed to delete game info with id: ${gameInfoId} -> ${error.message}`
            );
        }
    }

    async getAllGameInfo() {
        return await GameInfoRepository.getAllGames();
    }

    async AI(prompt) {
        const response = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an assistant providing structured game information.",
                },
                {role: "user", content: prompt},
            ],
            max_tokens: 1100,
            temperature: 0,
        });
        try {
            return response.choices[0].message.content;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async AiPromptAndResponse(name, type, genre) {
        const foundGame = await GameInfoRepository.findGameByName(name);
        const filteredData = {};
        if (foundGame) {
            filteredData.gameName = foundGame.gameName;
            filteredData.genre = foundGame.genre;
            filteredData.type = foundGame.type;
            filteredData.summary = foundGame.summary;
            filteredData.about = foundGame.about;
            filteredData.organization = foundGame.organization;
            filteredData.developerStudio = foundGame.developerStudio;
            filteredData.publisher = foundGame.publisher;
            filteredData.characters = foundGame.characters;
            filteredData.locations = foundGame.locations;
            filteredData.awards = foundGame.awards;
            filteredData.events = foundGame.events;
            filteredData.platform = foundGame.platform;
            filteredData.topPlayers = foundGame.topPlayers;
            filteredData.media = foundGame.media;
            filteredData.books = foundGame.books;
            console.log(filteredData);
            return filteredData;
        }
        const newPrompt = `Find the info of ${name} game in genre of ${genre} and in type of ${type} in all sections and in a JSON format. Follow these instructions carefully:

        1 . Write the full name of the game        
        Provide the complete name of the game: ${name}
        
        2 . Write the genre of the game        
        Specify the genre of ${name} (e.g., first-person shooter, role-playing game, etc.).
        
        3 . Write a spoiler-free plot summary of ${name}       
        Write a paragraph of at least 1000 characters describing the game's storyline without revealing any spoilers.
        
        4 . Write about the game
        Provide a detailed description (at least 1000 characters) about the ${name} game, including its key features, gameplay, and themes.
        Write the type of game
        
        5 . Mention the type of the ${name} game, e.g., "video game," "classic local game," or "board game."
        Write the organizations related to the ${name} game
        
        6 . List the organizations directly associated with the ${name} game, such as developers, publishers, or other key contributors.
        Write the developer studio of the game
        
        7 . Specify the name of the studio that developed ${name}.
        Write the publisher of the game
        
        8 . Provide the name of the publishing company.
        Write the main characters in the ${name} game
        
        9 . List the primary characters featured in ${name}.
        Write the locations in the game
        
        10 . Provide a list of locations or settings where the ${name} game takes place.
        Write the awards won by the game
        
        11 . List the awards (including wins and nominations) that the ${name} game has received.
        Write the real-life events that inspired the game
        
        12 . List details of real-life events and festivals that are or were inspired or influenced by the ${name} game, with exact dates and descriptions. Don't include the events the game was inspired by.
        
        13 . Write the platforms the game is available on        
        List all platforms on which ${name} has been released.
        
        14 . Write the list of the Top Players of the ${name}
        
        15 . other Movies, TV Shows, and Anime (as Media field):
        list any movies, TV shows, or anime inspired by or related to the ${name} game , include release dates too. (Don't include books or novels in this field.)
        
        16 . Books:
        Include details about books or novels based on ${name}, if available.
        
        the JSON format that i want (don't make array for feilds) : 
            {
        "gameName": "<Full name>",
        "genre": "<Genre>",
        "summary": "<Spoiler-free summary>",
        "about": "<Detailed description>",
        "type": "<Type>",
        "organization": "<Organizations>",
        "developerStudio": "<Developer Studio>",
        "publisher": "<Publisher>",
        "characters": "<Main Characters>",
        "locations": "<Key Locations>",
        "awards": "<Awards>",
        "events": "<Related Events>",
        "platform": "<Platforms>",
        "topPlayers": "<TopPlayers>",
        "media": "<Media>",
        "books": "<Books>"
        }
`

        const response = await this.AI(newPrompt)
        let cleanedResponse = response.trim();
        if (cleanedResponse.startsWith("```json\n")) {
            cleanedResponse = cleanedResponse.replace(/^```json\n/, "");
        }
        if (cleanedResponse.endsWith("\n```")) {
            cleanedResponse = cleanedResponse.replace(/\n```$/, "");
        }

        return JSON.parse(cleanedResponse);
    }

    async parsingAndGenerateData(gameList, type, genre) {
        try {
            const batchSize = 40;
            const gameData = [];
            for (let i = 0; i < gameList.length; i += batchSize) {
                const batch = gameList.slice(i, i + batchSize);
                const batchResults = await Promise.all(
                    batch.map(async (game) => {
                        return await this.AiPromptAndResponse(game, type, genre);
                    })
                );

                gameData.push(...batchResults);

                if (i + batchSize < gameList.length) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
            }

            return gameData;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async searchGamesByName(searchString) {
        try {
            searchString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const games = await GameInfoRepository.find({
                gameName: {$regex: searchString, $options: "i"},
            });

            if (!games || games.length === 0) {
                return [];
            }
            return games;
        } catch (error) {
            throw new Error(`Failed to fetch game data: ${error.message}`);
        }
    }
}

module.exports = new GameInfoService();
