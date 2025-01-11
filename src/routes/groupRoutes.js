import express from 'express';
import {
    createGroupHandler,
    getAllGroupsHandler,
    getGroupByIdHandler,
    addGroupMemberHandler,
    deleteGroupHandler,
    removeGroupMemberHandler,

    getGroupsByMemberHandler
} from '../controllers/groupController.js';

const router = express.Router();

// Group management routes
router.post('/', createGroupHandler);
router.get('/', getAllGroupsHandler);
router.get('/:id', getGroupByIdHandler);
router.delete('/:id', deleteGroupHandler);

// Group member management routes
router.post('/:id/members', addGroupMemberHandler);
router.delete('/:id/members/:userEmail', removeGroupMemberHandler);

// User's groups route
router.get('/user/groups', getGroupsByMemberHandler);

export default router;