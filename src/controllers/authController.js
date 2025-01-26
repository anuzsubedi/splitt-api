import admin from "../config/firebase.js";
import jwt from "jsonwebtoken";
import { handleAuth } from "../services/authService.js";

export const auth = async (req, res, next) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ error: "Google ID token is required." });
        }
        console.log(idToken);
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name, picture, uid } = decodedToken;

        if (!email || !name || !uid) {
            return res.status(400).json({ error: "Invalid Google ID token." });
        }

        const user = handleAuth({ email, name, image: picture, uuid: uid });

        const token = jwt.sign(
            { email, uuid: uid },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ success: true, token, user });
    } catch (err) {
        next(err);
    }
};
