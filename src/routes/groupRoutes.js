import express from 'express';
import {
    createGroupHandler,
    getAllGroupsHandler,
    getGroupByIdHandler,
    addGroupMemberHandler,
    deleteGroupHandler,
    removeGroupMemberHandler,
    getGroupsByMemberHandler,
} from '../controllers/groupController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // Import the JWT middleware
import { isGroupMember } from '../middlewares/groupAccessMiddleware.js';

const router = express.Router();

// Apply JWT middleware to protect all group routes
router.use(authMiddleware);

// Routes that don't require group membership
router.post('/', createGroupHandler);
router.get('/', getAllGroupsHandler);
router.get('/user/groups', getGroupsByMemberHandler);

// Routes that require group membership
router.get('/:id', isGroupMember, getGroupByIdHandler);
router.post('/:id/members', isGroupMember, addGroupMemberHandler);
router.delete('/:id', isGroupMember, deleteGroupHandler);
router.delete('/:id/members/:userEmail', isGroupMember, removeGroupMemberHandler);

export default router;
