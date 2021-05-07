# Description

Base REST Server made it with:

- NodeJS
- Express
- Mongoose
- MongoDB

The api has regular signIn using JWT and google signIn.
CRUD of Users

# Steps & packages

## 1. Init the project -> creates package.json
~~~
npm init
~~~
## 2. Init typescript -> creates tsconfig.json
~~~
tsc --init
~~~
## 3. Install express & types
~~~
npm i express
npm i -D @types/express
~~~
## 4. Install dotenv & types
~~~
npm i dotenv
npm i -D @types/dotenv
~~~
## 5. Install tslint to add typescript rules
~~~
npm i -D tslint
~~~
### 5.1. In order to create the tslint config file we have to install typescript locally
~~~
npm i -D typescript
~~~
### 5.2. Run tslint -> creates tslint.json
~~~
./node_modules/.bin/tslint --init
~~~
## 6. Install CORS
~~~
npm install cors --save
npm install @types/cors --save-dev
~~~
## 7. Install Mongoose as ODM
~~~
npm i mongoose
npm i -D @types/mongoose
~~~
## 8. To encrypt passwords
~~~
npm install @types/bcryptjs --save-dev
npm install bcryptjs
~~~
## 9. To validate requests
~~~
npm install express-validator
npm install @types/express-validator --save-dev
~~~
## 10. To work with JWT
~~~
npm install jsonwebtoken
npm install @types/jsonwebtoken --save-dev
~~~
## 11. To validate google token
~~~
npm install google-auth-library
~~~
