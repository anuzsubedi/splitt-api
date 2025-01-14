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

const router = express.Router();

// Apply JWT middleware to protect all group routes
router.use(authMiddleware);

// Group management routes
router.post('/', createGroupHandler); // Create a new group
router.get('/', getAllGroupsHandler); // Get all groups
router.get('/:id', getGroupByIdHandler); // Get a group by its ID
router.delete('/:id', deleteGroupHandler); // Delete a group by its ID

// Group member management routes
router.post('/:id/members', addGroupMemberHandler); // Add a member to a group
router.delete('/:id/members/:userEmail', removeGroupMemberHandler); // Remove a member from a group

// User's groups route
router.get('/user/groups', getGroupsByMemberHandler); // Get all groups for the logged-in user

export default router;
