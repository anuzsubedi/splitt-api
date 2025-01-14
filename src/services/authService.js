import { findUserByEmail, createUser } from "../models/userModel.js";

export const handleAuth = ({ email, name, image, uuid }) => {
    // Check if the user exists in the database
    let user = findUserByEmail(email);

    if (!user) {
        // Create a new user if not found
        const userId = createUser({ uuid, email, name, image });
        user = { id: userId, uuid, email, name, image };
    }

    return user;
};
