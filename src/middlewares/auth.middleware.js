import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'
const authMiddleware = async (req, res, next) => {
    try {
        const token = await req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWTCODE);
        const user = await User.findOne({ _id: decoded.id, "tokens.token": token });
        if (!user) {
            return res.status(401).send({ error: "User not found" });
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication failed:", error);
        res.status(401).send({ error: "Authentication failed" });
    }
}
export default authMiddleware;