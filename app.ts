import Server from "./models/server";
// import { dbConnection }  from './database/config';


// DATA BASE
// dbConnection();

// SERVER
const server = new Server();
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});

