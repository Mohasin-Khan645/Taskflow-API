import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import taskRouter from './src/routes/taskRoutes.js';
import { securityHeaders } from './src/middleware/security.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pipeline
app.use(cors()); 
app.use(morgan('dev'));
app.use(helmet()); 
app.use(securityHeaders); 
app.use(express.json());

// Rate limiting middleware
app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
  })
);


app.use('/api/tasks', taskRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () =>
  console.log(`TaskFlow API running on port ${PORT}`)
);
