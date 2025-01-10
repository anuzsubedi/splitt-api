import express from 'express';
import {
    createGroupHandler,
    getAllGroupsHandler,
    getGroupByIdHandler,
    addGroupMemberHandler,
    deleteGroupHandler,
} from '../controllers/groupController.js';

const router = express.Router();

router.post('/', createGroupHandler);
router.get('/', getAllGroupsHandler);
router.get('/:id', getGroupByIdHandler);
router.post('/:id/members', addGroupMemberHandler);
router.delete('/:id', deleteGroupHandler);

export default router;
