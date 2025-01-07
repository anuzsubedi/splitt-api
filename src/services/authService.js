import { findUserByEmail, createUser } from "../models/userModel.js";

export const handleAuth = ({ email, name, image }) => {
    const existingUser = findUserByEmail(email);

    if (existingUser) {
        return existingUser; // Log in the user
    }

    const userId = createUser({ email, name, image });
    return { id: userId, email, name, image }; // Sign up the user
};
