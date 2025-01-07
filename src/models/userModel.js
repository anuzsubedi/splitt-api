import db from "../database/db.js";

export const findUserByEmail = (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
};

export const createUser = ({ email, name, image }) => {
    const stmt = db.prepare(
        "INSERT INTO users (email, name, image) VALUES (?, ?, ?)"
    );
    const info = stmt.run(email, name, image);
    return info.lastInsertRowid;
};
