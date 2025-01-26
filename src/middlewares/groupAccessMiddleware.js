import { getGroupMemberByEmail } from '../models/groupMemberModel.js';

export const isGroupMember = (req, res, next) => {
    try {
        const groupId = req.params.id;
        const userEmail = req.user.email;

        if (!groupId || !userEmail) {
            return res.status(400).json({ error: 'Missing group ID or user email' });
        }

        const member = getGroupMemberByEmail(groupId, userEmail);

        if (!member || member.is_deleted) {
            return res.status(403).json({ error: 'Access denied. Not a group member.' });
        }

        req.groupMember = member;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to verify group membership' });
    }
};