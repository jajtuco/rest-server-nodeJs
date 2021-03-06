import express, { Application } from 'express';
import { config } from 'dotenv';
import CORS from 'cors';

// ***** ROUTES *****
import usersRouter from '../routes/user.routes';
import authRouter from '../routes/auth.routes';
import productRouter from '../routes/product.routes';
import searchRouter from '../routes/search.routes';
// **********
import { dbConnection } from '../database/config';
import categoryRouter from '../routes/category.routes';
import uploadRouter from '../routes/upload.routes';
import fileUpload from 'express-fileupload';

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
    this.app.use('/api/product', productRouter);
    this.app.use('/api/search', searchRouter);
    this.app.use('/api/upload', uploadRouter);
  }

  middlewares() {
    // Parsea el JSON a un objeto de JS
    this.app.use(express.urlencoded({ extended: true }));
    // Lectura del body
    this.app.use(express.json());
    // CORS
    this.app.use(CORS({ origin: true, credentials: true }));
    // Public folder
    this.app.use(express.static('public'));
    // File upload
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  async connectDB() {
    await dbConnection();
  }
  start(callback: () => void) {
    // Levantar el servidor
    this.app.listen(this.port, callback);
  }
}
