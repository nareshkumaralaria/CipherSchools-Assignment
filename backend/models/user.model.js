import mongoose from 'mongoose';

const user_model = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: String,
    role: String,
    date: {
        type: Date,
    }
})

const User = new mongoose.model("user", user_model);

export default User;