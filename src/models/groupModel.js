import db from '../db/db.js';

export const createGroup = (name, description, callback) => {
    const query = 'INSERT INTO groups (name, description) VALUES (?, ?)';
    db.run(query, [name, description], function (err) {
        callback(err, this?.lastID);
    });
};

export const getAllGroups = (callback) => {
    const query = 'SELECT * FROM groups';
    db.all(query, [], callback);
};

export const getGroupById = (id, callback) => {
    const query = 'SELECT * FROM groups WHERE id = ?';
    db.get(query, [id], callback);
};

export const deleteGroup = (id, callback) => {
    const query = 'DELETE FROM groups WHERE id = ?';
    db.run(query, [id], callback);
};
