# 1: Iniciar proyecto de node -> crea package.json

npm init

# 2: Iniciar typescript -> crea tsconfig.json

tsc --init

# 3: Instalar express & types

npm i express
npm i -D @types/express

# 4: Instalar dotenv & types

npm i dotenv
npm i -D @types/dotenv

# 5: Instalar tslint para añadir reglas de desarrollo con typescript

npm i -D tslint

## 5.1: Para crear el archivo de config de tslint hay que tener typescript local

npm i -D typescript

## 5.2: Ejectura el tslint -> crea el tslint.json

./node_modules/.bin/tslint --init

# 6: Instalar CORS

npm install cors --save
npm install @types/cors --save-dev

# 7: Instalar Mongoose

npm i mongoose
npm i -D @types/mongoose

# 8 - npm install bcryptjs

npm install @types/bcryptjs --save-dev
Para encriptar las contraseñas

# 9 - Para realizar las validaciones del request

npm install express-validator
npm install @types/express-validator --save-dev

# 10 - Para encriptar las contraseñas

npm install jsonwebtoken
npm install @types/jsonwebtoken --save-dev

# 11 - Para validar token de google

npm install google-auth-library
