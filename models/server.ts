import express, { Application } from 'express';
import { config } from 'dotenv';
import CORS from "cors";


// ***** ROUTES *****
import usersRouter from '../routes/user.routes';

// **********

export default class Server {

    public app: Application;
    public port: number;

    constructor() {

        // ENV
        config();

        // Puerto 
        this.port = Number(process.env.PORT);

        // Inicializa el servidor express
        this.app = express();
        
        // Middlewares
        this.middlewares();

        // ROUTES
        this.routes();
    }

    routes() {
        this.app.use('/api/users', usersRouter)
      
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

    start(callback: () => void) {
        // Levantar el servidor
        this.app.listen(this.port, callback);
    }



}