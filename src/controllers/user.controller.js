import User from "../models/user.model.js";
export const resgisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email, and password"
            });
        }
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            res.status(400).send({
                success: true,
                message: "user is already taken",
            })
        }
        const user = await User.create({ name, email, password });
        const token = await user.generateToken();
        await user.save();
        res.status(201).send({
            success: true,
            user: user,
            token
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).send({
                success: true,
                message: "user not found",
            })
        }
        const isMatch = user.comparePassword(password);
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid password"
            });
        }
        const token = await user.generateToken();
        res.status(201).send({
            success: true,
            user: user,
            token
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const updateUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = req.user;
        if (!user) {
            res.status(401).send({
                success: true,
                message: "user not found",
            })
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        const token = req.token;
        await user.save();
        res.status(200).send({
            success: true,
            user: user,
            token
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const searchuserController = async (req, res) => {
    try {
        const { name } = req.body;
        const user = await User.find({ name: { '$regex': name, '$options': 'i' } });
        res.status(200).send({
            success: true,
            user: user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}