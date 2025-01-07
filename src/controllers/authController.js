import { handleAuth } from "../services/authService.js";

export const auth = (req, res, next) => {
    try {
        const { email, name, image } = req.body;

        if (!email || !name) {
            return res.status(400).json({ error: "Email and name are required." });
        }

        const user = handleAuth({ email, name, image });
        res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
};
