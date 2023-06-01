import fs from 'fs'
import Video from '../models/video.model.js'

export const getVideoById = async (req, res) => {

    const videoFileMap = {};
    const video = await Video.find({});
    for (let i = 0; i < video.length; i++) {
        videoFileMap[video[i]._id] = `videos/${i + 1}.mp4`;
    }

    const { id } = req.params;
    const filePath = videoFileMap[id];

    if (!filePath) {
        return res.status(404).send({
            message: "Video Not Found",
            success: false,
        })
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-type': 'video/mp4'
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-type': 'video/mp4'
        }
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res)
    }
}

export const getVideo = async (req, res) => {

    try {
        const video = await Video.find({});
        return res.send({
            video: video,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Network Error",
            success: false
        })
    }
};


export const updateLike = async (req, res) => {
    const { videoId, newLikes } = req.body;
    try {
        const video = await Video.findByIdAndUpdate(
            { _id: videoId },
            {
                $set: {
                    likes: newLikes
                }
            },
            { new: true }
        )
        if (video) {
            return res.send({
                success: true,
                message: "You liked a video",
                video: video
            })
        } else {
            return res.send({
                success: false,
                message: "Network Error ! Try after sometime",
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: "Network Error ! Try after sometime",
        })
    }
}
