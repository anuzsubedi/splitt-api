import db from "../database/db.js";

export const addGroupMember = (groupId, userEmail) => {
    const stmt = db.prepare('INSERT INTO group_members (group_id, user_email) VALUES (?, ?)');
    const result = stmt.run(groupId, userEmail);
    return result.lastInsertRowid;
};

export const getGroupMembers = (groupId) => {
    const stmt = db.prepare('SELECT * FROM group_members WHERE group_id = ? AND is_deleted = 0');
    return stmt.all(groupId);
};

export const getGroupMemberByEmail = (groupId, userEmail) => {
    const stmt = db.prepare('SELECT * FROM group_members WHERE group_id = ? AND user_email = ?');
    return stmt.get(groupId, userEmail);
};

export const deleteGroupMember = (groupId, userEmail) => {
    const stmt = db.prepare(`
        UPDATE group_members 
        SET is_deleted = 1, 
            deleted_at = CURRENT_TIMESTAMP 
        WHERE group_id = ? AND user_email = ?
    `);
    return stmt.run(groupId, userEmail);
};

export const reinstateGroupMember = (groupId, userEmail) => {
    const stmt = db.prepare('UPDATE group_members SET is_deleted = 0 WHERE group_id = ? AND user_email = ?');
    return stmt.run(groupId, userEmail);
};

