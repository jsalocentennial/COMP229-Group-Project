import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: 'Username is required',
        unique: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: 'Password is required'
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
});

userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);