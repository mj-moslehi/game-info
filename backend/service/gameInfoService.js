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
                media: updateReq.media,
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

    async updateTheEditedGames() {
        let newGameInfo = {}
        const OldGames = await GameInfoRepository.updateEditedGames();
        for (const game in OldGames) {
            newGameInfo.gameName = game.gameName;
            newGameInfo.summary = game.summary;
            newGameInfo.awards = game.awards;
            newGameInfo.about = game.about;
            newGameInfo.organization = game.organization;
            newGameInfo.media = game.books + game.movies;

        }
    }

    async AiPromptAndResponse(name, type, genre) {
        const foundGame = await GameInfoRepository.findGameByName(name);
        const filteredData = {};
        if(foundGame){
            filteredData.gameName =foundGame.gameName ;
            filteredData.genre =foundGame.genre ;
            filteredData.type =foundGame.type ;
            filteredData.summary =foundGame.summary ;
            filteredData.about =foundGame.about ;
            filteredData.organization =foundGame.organization ;
            filteredData.developerStudio =foundGame.developerStudio ;
            filteredData.publisher =foundGame.publisher ;
            filteredData.characters =foundGame.characters ;
            filteredData.locations =foundGame.locations ;
            filteredData.awards =foundGame.awards ;
            filteredData.events =foundGame.events ;
            filteredData.platform =foundGame.platform ;
            filteredData.media =foundGame.media ;
            filteredData.books =foundGame.books ;
            console.log(filteredData);
            return filteredData;
        }
        const newPrompt = `Find the info of ${name} game in genre of ${genre} and in type of ${type} in all sections and in a JSON format. Follow these instructions carefully:

        Write the full name of the game
        
        Provide the complete name of the game: ${name}
        Write the genre of the game
        
        Specify the genre of ${name} (e.g., first-person shooter, role-playing game, etc.).
        Write a spoiler-free plot summary
        
        Write a paragraph of at least 1000 characters describing the game's storyline without revealing any spoilers.
        Write about the game
        
        Provide a detailed description (at least 1000 characters) about the game, including its key features, gameplay, and themes.
        Write the type of game
        
        Mention the type of game, e.g., "video game," "classic local game," or "board game."
        Write the organizations related to the game
        
        List the organizations directly associated with the game, such as developers, publishers, or other key contributors.
        Write the developer studio of the game
        
        Specify the name of the studio that developed ${name}.
        Write the publisher of the game
        
        Provide the name of the publishing company.
        Write the main characters in the game
        
        List the primary characters featured in ${name}.
        Write the locations in the game
        
        Provide a list of locations or settings where the game takes place.
        Write the awards won by the game
        
        List the awards (including wins and nominations) that the game has received.
        Write the real-life events that inspired the game
        
        List details of real-life events that are or were inspired or influenced by the game, with exact dates and descriptions.
        Write the platforms the game is available on
        
        List all platforms on which ${name} has been released.
        Media (Books and Movies)
        
        Movies, TV Shows, and Anime:
        Provide complete information about any movies, TV shows, or anime inspired by or related to the game and list them, include release dates too.
        Books:
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
