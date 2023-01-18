import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/personRoute'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/person', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});