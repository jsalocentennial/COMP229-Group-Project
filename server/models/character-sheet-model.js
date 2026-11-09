import mongoose from 'mongoose';

// const characterSchema = new mongoose.Schema({
//     characterName: { type: String, trim: true, required: true },
//     level: { type: Number, default: 0 },
//     experiencePoints: { type: Number, default: 0 },
//     classID: { type: String, trim: true, required: true },
// });

// export default mongoose.model("Character", characterSchema);

const characterSchema = new mongoose.Schema({            
    user: {                                                  //UserID for the user who created the character
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    class: {
        type: String,
        required: true,
        enum: ['Fighter', 'Mage', 'Thief']                   //Enums to restrict class options
    },
    race: {
        type: String,
        required: true,
        enum: ['Human', 'Elf', 'Orc']                        //Same with Race
    },
    experience: {
        type: Number,
        default: 0,
        min: 0,
        max: 1000
    },
    level: {
        type: Number,
        default: 1,
        min: 1,
        max: 100
    }
    }, {
    timestamps: true }
);


export default mongoose.model("Character", characterSchema);