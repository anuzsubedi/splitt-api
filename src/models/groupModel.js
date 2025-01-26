import db from '../database/db.js';

export const createGroup = (name, description, creatorEmail) => {
    const stmt = db.prepare('INSERT INTO groups (name, description, creator_email) VALUES (?, ?, ?)');
    const result = stmt.run(name, description, creatorEmail);
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

// Add new function to check creator
export const isGroupCreator = (groupId, userEmail) => {
    const stmt = db.prepare('SELECT creator_email FROM groups WHERE id = ? AND is_deleted = 0');
    const group = stmt.get(groupId);
    return group && group.creator_email === userEmail;
};