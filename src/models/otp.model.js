
import mongoose from "mongoose";
const otpSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now,
        required: true,
        get: (timestamps) => timestamps.getTime(),
        set: (timestamps) => new Date(timestamps),

    }
}, { timestamps: true });
const otpModel = mongoose.model("OtpModel", otpSchema);
export default otpModel;