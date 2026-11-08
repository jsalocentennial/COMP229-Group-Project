import express from 'express';
import {
    createCharacter,
    deleteCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter
} from '../controllers/character-sheet-controller.js';

const router = express.Router();

// READs
router.get("/getAllCharacters", getAllCharacters);
router.get("/:id", getCharacterById);

// CREATE
router.post("/", createCharacter);

// UPDATE
router.put("/:id", updateCharacter);

// DELETE
router.delete("/:id", deleteCharacter);

export default router;