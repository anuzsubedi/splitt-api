import { handleAuth } from "../services/authService.js";

export const auth = (req, res, next) => {
    try {
        const { email, name, image, uuid } = req.body;

        if (!email || !name || !uuid) {
            return res.status(400).json({ error: "Email, name, and uuid are required." });
        }

        const user = handleAuth({ email, name, image, uuid });
        res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
};
