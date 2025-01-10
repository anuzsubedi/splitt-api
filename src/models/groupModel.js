import db from '../db/db.js';

export const createGroup = (name, description, callback) => {
    const query = 'INSERT INTO groups (name, description) VALUES (?, ?)';
    db.run(query, [name, description], function (err) {
        callback(err, this?.lastID);
    });
};

export const getAllGroups = (callback) => {
    const query = 'SELECT * FROM groups WHERE is_deleted = 0';
    db.all(query, [], callback);
};

export const getGroupById = (id, callback) => {
    const query = 'SELECT * FROM groups WHERE id = ? AND is_deleted = 0';
    db.get(query, [id], callback);
};

export const deleteGroup = (id, callback) => {
    const query = 'UPDATE groups SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
    db.run(query, [id], callback);
};

export const getGroupsByMember = (userEmail, callback) => {
    const query = `
    SELECT g.id, g.name, g.description, g.created_at
    FROM groups g
    JOIN group_members gm ON g.id = gm.group_id
    WHERE gm.user_email = ? AND gm.is_deleted = 0 AND g.is_deleted = 0
    `;
    db.all(query, [userEmail], callback);
}