import express from 'express';
import 'dotenv/config'; // Environment variables.

// Routers:
import pageRoutes from './routes/pageRouter.js';
import authRoutes from './routes/authRouter.js';
import userRoutes from './routes/userRouter.js'

const app = express();
const port = process.env.SERVER_PORT;

// Static files. (CSS+JS)
app.use(express.static('public'));

// Send web request to routes and nestled routes.
app.use('/', pageRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});