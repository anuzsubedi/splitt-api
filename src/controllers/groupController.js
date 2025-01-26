import {
    createGroup,
    getAllGroups,
    getGroupById,
    deleteGroup,
    getGroupsByMember
} from '../models/groupModel.js';
import {
    addGroupMember,
    getGroupMembers,
    deleteGroupMember,
    reinstateGroupMember,
    getGroupMemberByEmail,
} from '../models/groupMemberModel.js';

export const createGroupHandler = (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ error: 'Group name is required' });
        if (!req.user?.email) return res.status(401).json({ error: 'User email required' });

        // Create the group
        const groupId = createGroup(name, description, req.user.email);

        // Add creator as first group member
        addGroupMember(groupId, req.user.email);

        return res.status(201).json({
            message: 'Group created successfully',
            groupId
        });
    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ error: 'Failed to create group' });
    }
};

export const getAllGroupsHandler = (req, res) => {
    try {
        const groups = getAllGroups();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
};

export const getGroupByIdHandler = (req, res) => {
    try {
        const { id } = req.params;
        const group = getGroupById(id);
        if (!group) return res.status(404).json({ error: 'Group not found' });

        const members = getGroupMembers(id);
        group.members = members;
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch group' });
    }
};

export const addGroupMemberHandler = (req, res) => {
    try {
        const { id } = req.params;
        const { userEmail } = req.body;
        if (!userEmail) return res.status(400).json({ error: 'User email is required' });


        const member = getGroupMemberByEmail(id, userEmail);

        if (member) {
            if (!member.is_deleted) return res.status(409).json({ error: 'User is already a member of the group' });
            reinstateGroupMember(id, userEmail);
            return res.status(201).json({ message: 'Member reinstated to group' });
        }

        addGroupMember(id, userEmail);
        res.status(201).json({ message: 'Member added to group' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add member' });
    }
};

export const removeGroupMemberHandler = (req, res) => {
    try {
        const { id, userEmail } = req.params;  // Changed to get from params instead of body
        if (!userEmail) return res.status(400).json({ error: 'User email is required' });

        deleteGroupMember(id, userEmail);
        res.json({ message: 'Member removed from group' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove member' });
    }
};


export const deleteGroupHandler = (req, res) => {
    try {
        const { id } = req.params;
        deleteGroup(id);
        res.json({ message: 'Group deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete group' });
    }
};

export const getGroupsByMemberHandler = (req, res) => {
    try {
        const { userEmail } = req.query;
        if (!userEmail) return res.status(400).json({ error: 'User email is required' });

        const groups = getGroupsByMember(userEmail);
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user groups' });
    }
};