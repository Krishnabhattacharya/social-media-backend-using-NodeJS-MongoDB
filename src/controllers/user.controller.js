import otpModel from "../models/otp.model.js";
import User from "../models/user.model.js";
import { sendMail } from "./sendmail.controller.js";
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
export const sendOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).send({
                success: true,
                message: "user not found",
            });
        }
        const otp = await genOtp();
        const sendOtp = new otpModel({
            userId: user._id,
            otp: otp,

        })
        await sendOtp.save();
        const msg = '<p> Hi <b>' + user.name + '</b>,</br><h4> ' + otp + ' </h4> </p>';
        sendMail(email, msg, "otp verification");
        res.status(200).send({
            success: true,
            message: "otp send succesfully, please check email",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const genOtp = async () => {
    return Math.floor(1000 + Math.random() * 9000);
}
export const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        const otpData = await otpModel.findOne({ userId, otp });
        if (!otpData) {
            return res.status(400).send({
                success: false,
                message: "You entered the wrong OTP",
            });
        }

        const otpTimestamp = otpData.timestamps;
        const currentTime = new Date();
        const timeDifference = currentTime - otpTimestamp;
        const timeDifferenceInMinutes = timeDifference / (1000 * 60);

        if (timeDifferenceInMinutes > 3) {
            return res.status(400).send({
                success: false,
                message: "OTP has expired",
            });
        }
        await User.findByIdAndUpdate({ _id: userId }, {
            $set: {
                isVerify: 1
            }
        })
        return res.status(200).send({
            success: true,
            message: "OTP is valid",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
export const blockUnblockUserController = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) {
            res.status(401).send({
                success: true,
                message: "user not found",
            });
        }
        user.block = !user.block;
        await user.save();
        res.status(200).send({
            success: true,
            user: user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}