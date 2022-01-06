const asyncHandler = require("express-async-handler");
const axios = require("axios");

const startGame = asyncHandler(async (req, res) => {
  const rsp = await axios.get("https://random-word-api.herokuapp.com/word");
  console.log(rsp.data);
  res.status(200).json(rsp.data);
});

const gamePage = asyncHandler(async (req, res) => {
    res.status(200).json({msg:"Welcome to Game"})
});

module.exports = { startGame,gamePage };
