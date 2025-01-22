const express = require("express");
const router = express.Router();
const GameInfoController = require("../controller/gameInfoController");
const authenticate = require("../middleware/authMiddleware");
const employeeAuthorization = require("../middleware/employeeMiddleware");

router.post(
    "/create",
    authenticate,
    employeeAuthorization,
    GameInfoController.createGameInfo
);

router.post(
    "/find-by-id",
    authenticate,
    employeeAuthorization,
    GameInfoController.findGameInfoById
);

router.get(
    "/find-by-name",
    authenticate,
    employeeAuthorization,
    GameInfoController.findGameInfoByName
);

router.put(
    "/update",
    authenticate,
    employeeAuthorization,
    GameInfoController.updateGameInfo
);

router.put(
    "/delete",
    authenticate,
    employeeAuthorization,
    GameInfoController.deleteGameInfo
);

router.post(
    "/find-all",
    authenticate,
    employeeAuthorization,
    GameInfoController.getAllGameInfo
);

router.post(
    "/searching-with-name",
    authenticate,
    employeeAuthorization,
    GameInfoController.searchGamesByName
);

router.post(
    "/parsing-generate-data",
    authenticate,
    employeeAuthorization,
    GameInfoController.parseAndGenerateData
);

router.get(
    "/convert-to-excel",
    authenticate,
    employeeAuthorization,
    (req, res) => {
        res.send("Excel file conversion endpoint.");
    }
);

module.exports = router;
