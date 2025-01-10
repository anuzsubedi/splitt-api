import db from "../database/db.js";

export const findUserByEmail = (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
};

export const createUser = ({ uuid, email, name, image }) => {
    const stmt = db.prepare(
        "INSERT INTO users (uuid, email, name, image) VALUES (?, ?, ?, ?)"
    );
    const info = stmt.run(uuid, email, name, image);
    return info.lastInsertRowid;
};
