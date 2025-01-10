import { findUserByEmail, createUser } from "../models/userModel.js";

export const handleAuth = ({ uuid, email, name, image }) => {

    const existingUser = findUserByEmail(email);

    if (existingUser) {
        return existingUser; // Log in the user
    }

    const userId = createUser({ uuid, email, name, image });
    return { id: userId, uuid, email, name, image }; // Sign up the user
};
