import mongoose from 'mongoose';                        //Example of challenge model. Can be altered as required

const challengeSchema = new mongoose.Schema({
    name: String,
    description: String,
    requiredScore: Number,
    startDate: Date,
    endDate: Date
});

export default mongoose.model("Challenge", challengeSchema);