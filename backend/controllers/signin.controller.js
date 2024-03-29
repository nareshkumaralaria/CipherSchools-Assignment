import User from '../models/user.model.js'

export const signin = async (req, res) => {
    const { formValues } = req.body;

    try {
        const user = await User.findOne({ email: formValues.email });
        if (user) {
            if (formValues.password === user.password) {
                return res.send({
                    message: "Sign in successfully",
                    userId: user._id,
                    email: user.email,
                    success: true,
                });
            } else {
                return res.send({
                    message: "Invalid credentials",
                    success: false
                });
            }
        } else {
            return res.send({
                message: "User doesn't exist",
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Network Error",
            success: false
        })
    }
};
