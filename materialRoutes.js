const express = require("express");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
    getMaterial,
    summarizeMaterial,
    generateFlashcards,
    generateQuiz,
    generateStudyPlan
} = require("../controllers/materialController");

const router = express.Router();


// Upload study material
router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    async (req, res) => {
        try {
            const Material = require("../models/Material");

            if (!req.file) {
                return res.status(400).json({
                    message: "Please upload a file"
                });
            }

            const material = await Material.create({
                title: req.file.originalname,
                fileName: req.file.filename,
                filePath: req.file.path
            });

            res.status(201).json({
                message: "Study material uploaded successfully",
                materialId: material._id,
                file: material.fileName,
                path: material.filePath
            });

        } catch (error) {
            res.status(500).json({
                message: "Upload failed",
                error: error.message
            });
        }
    }
);


// Generate AI Summary
router.post(
    "/:id/summarize",
    authMiddleware,
    summarizeMaterial
);


// Generate AI Flashcards
router.post(
    "/:id/flashcards",
    authMiddleware,
    generateFlashcards
);


// Generate AI Quiz
router.post(
    "/:id/quiz",
    authMiddleware,
    generateQuiz
);


// Generate AI Study Plan
router.post(
    "/:id/study-plan",
    authMiddleware,
    generateStudyPlan
);


// Get material by ID
router.get(
    "/:id",
    authMiddleware,
    getMaterial
);


module.exports = router;