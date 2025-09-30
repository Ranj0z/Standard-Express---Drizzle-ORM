import express, { Request, Response, NextFunction } from 'express';
import UserRoutes from './AllTables/auth/auth.routes';

const app = express();
import cors from "cors";
import { logger } from './middleware/logger';

app.use(express.json()); // Parse JSON bodies

app.use(logger);

  app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"]
  })); // 👈 Enables cross-origin requests
  app.use(express.json());
  
// Routes
UserRoutes(app);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// ✅ JSON syntax error handler (must be after express.json and routes)
app.use(((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (
    err instanceof SyntaxError &&
    (err as any).status === 400 &&
    'body' in err
  ) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next();
}) as express.ErrorRequestHandler); // 👈 This is the key line!

app.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});

export default app;