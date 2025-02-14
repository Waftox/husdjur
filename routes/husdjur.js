var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var HusdjurModel = require("../models/HusdjurModel");

//req och res här är request- respektive response-objekten
router.get("/", async (req, res) => {
  try {
    const husdjur = await HusdjurModel.find({});
    res.json(husdjur);
  } catch (error) {
    console.error("Ett fel uppstod:", error);
    res.status(500).json({ error: "Databasförfrågan misslyckades" });
  }
});

router.post("/", async (req, res) => {
  try {
    const husdjur = new HusdjurModel(req.body);
    await husdjur.save();
    res.status(201).json(husdjur);
  } catch (error) {
    console.error("Ett fel uppstod:", error);
    res.status(500).json({ error: "Databasinmatning misslyckades" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const husdjur = await HusdjurModel.findById(req.params.id);
    if (!husdjur) return res.status(404).json({ message: "Record not found" });
    res.json(husdjur);
  } catch (error) {
    console.error("Ett fel uppstod:", error);
    res.status(500).json({ error: "Databasförfrågan misslyckades" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedHusdjur = await HusdjurModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHusdjur);
  } catch (error) {
    console.error("Ett fel uppstod:", error);
    res.status(500).json({ error: "Uppdateringen misslyckades" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await HusdjurModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Ett fel uppstod:", error);
    res.status(500).json({ error: "Borttagning misslyckades" });
  }
});

module.exports = router;
