import { z } from 'zod';

export const taskCreateSchema = z.object({
  text: z.string().min(3).max(255),
});


export const taskUpdateSchema = z.object({
  text: z.string().min(3).max(255).optional(),
  completed: z.boolean().optional(),
});

export const validateTaskCreate = (req, res, next) => {
  try {
    taskCreateSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Validation failed', details: error.errors });
  }
};

export const validateTaskUpdate = (req, res, next) => {
  try {
    taskUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Validation failed', details: error.errors });
  }
};
