import db from '../database/db.js';

export const createGroup = (name, description) => {
    const stmt = db.prepare('INSERT INTO groups (name, description) VALUES (?, ?)');
    const result = stmt.run(name, description);
    return result.lastInsertRowid;
};

export const getAllGroups = () => {
    const stmt = db.prepare('SELECT * FROM groups WHERE is_deleted = 0');
    return stmt.all();
};

export const getGroupById = (id) => {
    const stmt = db.prepare('SELECT * FROM groups WHERE id = ? AND is_deleted = 0');
    return stmt.get(id);
};

export const deleteGroup = (id) => {
    const stmt = db.prepare('UPDATE groups SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?');
    return stmt.run(id);
};

export const getGroupsByMember = (userEmail) => {
    const stmt = db.prepare(`
        SELECT g.* FROM groups g
        JOIN group_members gm ON g.id = gm.group_id
        WHERE gm.user_email = ? AND g.is_deleted = 0
    `);
    return stmt.all(userEmail);
};