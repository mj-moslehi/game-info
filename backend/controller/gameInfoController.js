const GameInfoService = require("../service/gameInfoService");

class GameInfoController {
    async createGameInfo(req, res) {
        try {
            const GameDataList = req.body.gameData;
            const number = await GameInfoService.createGameInfo(GameDataList);
            res
                .status(201)
                .json({
                    message: "Games information created successfully",
                    number: number,
                });
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async findGameInfoById(req, res) {
        try {
            const gameInfo = await GameInfoService.findGameInfoById(req.body.id);
            if (!gameInfo) {
                return res.status(404).json({message: "Game info not found"});
            }
            res.status(200).json(gameInfo);
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }

    async findGameInfoByName(req, res) {
        try {
            const gameInfo = await GameInfoService.findGameInfoByName(
                req.body.gameName
            );
            if (!gameInfo) {
                return res.status(404).json({message: "Game info not found"});
            }
            res.status(200).json(gameInfo);
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }

    async updateGameInfo(req, res) {
        try {
            const updatedGameInfo = await GameInfoService.updateGameInfo(
                req.body.updateReq,
                req.body.id
            );
            res.status(200).json({
                message: "Game information updated successfully",
                gameInfo: updatedGameInfo,
            });
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async deleteGameInfo(req, res) {
        try {
            await GameInfoService.deleteGameInfo(req.body.id);
            res
                .status(200)
                .json({message: "Game information deleted successfully"});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async getAllGameInfo(req, res) {
        try {
            const games = await GameInfoService.getAllGameInfo();
            res.status(200).json(games);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async searchGamesByName(req, res) {
        try {
            const games = await GameInfoService.searchGamesByName(req.body.name);
            res.status(200).json(games);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async parseAndGenerateData(req, res) {
        try {
            const {gameList, type, genre} = req.body;
            const generatedData = await GameInfoService.parsingAndGenerateData(
                gameList,
                type,
                genre
            );
            res.status(200).json(generatedData);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = new GameInfoController();
