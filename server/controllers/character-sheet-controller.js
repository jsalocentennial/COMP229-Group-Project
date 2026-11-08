import Character from '../models/character-sheet-model.js';

// CRUD - Create, Read, Update, Delete

export const getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCharacterById = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        res.status(200).json(character);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCharacter = async (req, res) => {
    try {
        const newCharacter = new Character(req.body);
        const savedCharacter = await newCharacter.save();
        res.status(201).json(savedCharacter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCharacter = async (req, res) => {
    try {
        const updatedCharacter = await Character.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );

        if (!updatedCharacter) {
            return res.status(404).json({ message: "Character not found" });
        } // is not null or undefined

        res.status(200).json(updatedCharacter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCharacter = async (req, res) => {
    try {
        const deleteCharacter = await Character.findByIdAndDelete(req.params.id);
        if (!deleteCharacter) {
            return res.status(404).json({ message: "Character not found" });
        }

        res.status(200).json({ message: "Character deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}