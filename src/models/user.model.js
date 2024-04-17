import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: true,
    },
    isVerify: {
        type: Boolean,
        default: 0
    },
    block: {
        type: Boolean,
        default: false,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

}, { timestamps: true });



userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})


userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWTCODE);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}



const User = mongoose.model("User", userSchema);
export default User;