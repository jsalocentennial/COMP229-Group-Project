import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    characterName: { type: String, trim: true, required: true },
    level: { type: Number, default: 0 },
    experiencePoints: { type: Number, default: 0 },
    classID: { type: String, trim: true, required: true },
});

export default mongoose.model("Character", characterSchema);