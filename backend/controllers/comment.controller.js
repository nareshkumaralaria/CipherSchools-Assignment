import Comment from '../models/comment.model.js'

const dateIndia = new Date();

export const getComments = async (req, res) => {
    const { videoId } = req.query;
    try {
        const comment = await Comment.find({ videoId: videoId });
        return res.send({
            comments: comment,
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

export const addComment = async (req, res) => {
    const { commentValues } = req.body;
    try {
        const comment = new Comment({
            body: commentValues.body,
            parentId: commentValues.parentId,
            email: commentValues.email,
            userId: commentValues.userId,
            videoId: commentValues.videoId,
            date: new Date(`${dateIndia} UTC`)
        })

        const newComment = await comment.save();
        return res.send({
            message: "Comment posted",
            success: true,
            newComment: newComment
        })
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Network Error",
            success: false,
        })
    }
}