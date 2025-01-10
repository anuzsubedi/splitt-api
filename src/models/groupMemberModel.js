import db from '../db/db.js';

export const addGroupMember = (groupId, userEmail, callback) => {
    const query = 'INSERT INTO group_members (group_id, user_email) VALUES (?, ?)';
    db.run(query, [groupId, userEmail], callback);
};

export const reinstateGroupMember = (groupId, userEmail, callback) => {
    const query = 'UPDATE group_members SET is_deleted = 0 WHERE group_id = ? AND user_email = ?';
    db.run(query, [groupId, userEmail], callback);
};

export const deleteGroupMember = (groupId, userEmail, callback) => {
    const query = 'UPDATE group_members SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE group_id = ? AND user_email = ?';
    db.run(query, [groupId, userEmail], callback);
};

export const getGroupMembers = (groupId, callback) => {
    const query = 'SELECT * FROM group_members WHERE group_id = ? AND is_deleted = 0';
    db.all(query, [groupId], callback);
};
