import db from '../db/db.js';

export const addGroupMember = (groupId, userEmail, callback) => {
    const query = 'INSERT INTO group_members (group_id, user_email) VALUES (?, ?)';
    db.run(query, [groupId, userEmail], callback);
};

export const getGroupMembers = (groupId, callback) => {
    const query = 'SELECT * FROM group_members WHERE group_id = ?';
    db.all(query, [groupId], callback);
};
