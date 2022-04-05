const express = require("express");
// import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Test");
});

module.exports = router;
