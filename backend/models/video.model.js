import mongoose from 'mongoose';

const video_model = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    src: {
        type: String,
        require: true
    },
    views: Number,
    likes: Number,
    comments: Number,
    date: {
        type: Date,
    }
})

const Video = new mongoose.model("video", video_model);

export default Video;