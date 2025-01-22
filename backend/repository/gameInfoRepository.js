const GameInfo = require("../model/gameInfo");

class GameInfoRepository {
    async createGameInfo(gameDate) {
        const gameInfo = new GameInfo(gameDate);
        return await gameInfo.save();
    }

    async findGameInfoById(gameInfoId) {
        return await GameInfo.findOne({_id: gameInfoId, deleted: false});
    }

    async findGameByName(gameName) {
        const escapedGameName = gameName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return await GameInfo.findOne({
            gameName: {$regex: escapedGameName, $options: "i"},
            deleted: false,
        });
    }

    async find(query) {
        return await GameInfo.find({...query, deleted: false});
    }

    async updateGameInfo(gameId, updatedData) {
        try {
            return await GameInfo.findOneAndUpdate(
                {_id: gameId, deleted: false},
                updatedData,
                {runValidators: true, new: true, upsert: false}
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateEditedGames(){
        try {
            return await GameInfo.find({})
                .sort({_id: 1 })
                .limit(83);

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteGameInfo(gameId) {
        return await GameInfo.findByIdAndUpdate(
            {_id: gameId},
            {deleted: true},
            {new: true}
        );
    }

    async getAllGames() {
        return await GameInfo.find({deleted: false});
    }
}

module.exports = new GameInfoRepository();
