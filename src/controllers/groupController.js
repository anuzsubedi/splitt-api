import { createGroup, getAllGroups, getGroupById, deleteGroup } from '../models/groupModel.js';
import { addGroupMember, getGroupMembers } from '../models/groupMemberModel.js';

export const createGroupHandler = (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Group name is required' });

    createGroup(name, description, (err, groupId) => {
        if (err) return res.status(500).json({ error: 'Failed to create group' });
        res.status(201).json({ message: 'Group created', groupId });
    });
};

export const getAllGroupsHandler = (req, res) => {
    getAllGroups((err, groups) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch groups' });
        res.json(groups);
    });
};

export const getGroupByIdHandler = (req, res) => {
    const { id } = req.params;
    getGroupById(id, (err, group) => {
        if (err || !group) return res.status(404).json({ error: 'Group not found' });
        res.json(group);
    });
};

export const addGroupMemberHandler = (req, res) => {
    const { id } = req.params;
    const { userEmail } = req.body;

    if (!userEmail) return res.status(400).json({ error: 'User email is required' });

    addGroupMember(id, userEmail, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to add member' });
        res.status(201).json({ message: 'Member added to group' });
    });
};

export const deleteGroupHandler = (req, res) => {
    const { id } = req.params;
    deleteGroup(id, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete group' });
        res.json({ message: 'Group deleted' });
    });
};
