const express = require("express");
const { startGame, gamePage } = require("../Controller/controller");
const router = express.Router();

router.route("/").get(gamePage);
router.route("/start").get(startGame);

module.exports = router;
