import Server from './server/server';
// import { dbConnection }  from './database/config';

// DATA BASE
// dbConnection();

// SERVER
const server = new Server();
server.start(() => {
  console.log(`Server running in port ${server.port}`);
});
