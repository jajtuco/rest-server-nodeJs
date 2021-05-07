import express, { Application } from 'express';
import { config } from 'dotenv';
import CORS from 'cors';

// ***** ROUTES *****
import usersRouter from '../routes/user.routes';
import authRouter from '../routes/auth.routes';
// **********
import { dbConnection } from '../database/config';
import categoryRouter from '../routes/category.routes';

export default class Server {
  public app: Application;
  public port: number;

  constructor() {
    // ENV
    config();

    // Puerto
    this.port = Number(process.env.PORT);

    // Connect data base
    this.connectDB();

    // Initialize server express
    this.app = express();

    // Middlewares
    this.middlewares();

    // ROUTES
    this.routes();
  }

  routes() {
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/users', usersRouter);
    this.app.use('/api/category', categoryRouter);
  }

  middlewares() {
    // Parsea el JSON a un objeto de JS
    this.app.use(express.urlencoded({ extended: true }));
    // Lectura del body
    this.app.use(express.json());
    // CORS
    this.app.use(CORS({ origin: true, credentials: true }));
    // Directorio publico
    this.app.use(express.static('public'));
  }

  async connectDB() {
    await dbConnection();
  }
  start(callback: () => void) {
    // Levantar el servidor
    this.app.listen(this.port, callback);
  }
}
