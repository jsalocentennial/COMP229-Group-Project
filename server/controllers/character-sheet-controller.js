import Character from '../models/character-sheet-model.js';

// CRUD - Create, Read, Update, Delete

export const getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find({ user: req.user.id });
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCharacterById = async (req, res) => {
    try {
        const character = await Character.findOne({
            _id: req.params.id,                                //Match character ID with USer through JWT Token
            user: req.user.id
        });

        if (!character) {
            return res.status(404).json({
                message: "Character not found"
            });
        }

        res.status(200).json(character);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: "Invalid character ID"
            });
        }

        res.status(500).json({ message: error.message });
    }
};

export const createCharacter = async (req, res) => {
    try {
        const { name, class: characterClass, race, experience, level } = req.body;               //Assigned values directly

        const newCharacter = new Character({
            user: req.user.id,                                                                   //UserID linked to the character through jwt token
            name,
            class: characterClass,
            race,
            experience,
            level
        });

        const savedCharacter = await newCharacter.save();

        res.status(201).json(savedCharacter);

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

export const updateCharacter = async (req, res) => {                   //Will require all fields to be updated
    try {
        const { name, race, experience, level } = req.body;
        const characterClass = req.body.class;

        const updatedCharacter = await Character.findOneAndUpdate(      //findOneAndUpdate is deprecated, returnDocument: 'after' is suggested. Must research
            {
                _id: req.params.id,                                     //Check userID to CharacterID through JWT Token
                user: req.user.id
            },
            {
                name: name,
                class: characterClass,
                race: race,
                experience: experience,
                level: level
            },
            {
                new: true,
                runValidators: true                                   //Keeps the validation rules
            }
        );

        if (!updatedCharacter) {
            return res.status(404).json({ message: "Character not found" });
        }

        res.status(200).json(updatedCharacter);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid character ID or field value" });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

export const deleteCharacter = async (req, res) => {
    try {
        const deleteCharacter = await Character.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!deleteCharacter) {
            return res.status(404).json({ message: "Character not found" });
        }

        res.status(200).json({ message: "Character deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}