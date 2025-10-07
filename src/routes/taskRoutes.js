import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { validateTaskCreate, validateTaskUpdate } from '../middleware/validation.js';

const router = Router();

router.route('/')
  .get(getTasks)
  .post(validateTaskCreate, createTask);

router.route('/:id')
  .get(getTask)
  .put(validateTaskUpdate, updateTask)
  .delete(deleteTask);

export default router;
