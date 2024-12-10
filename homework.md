# Episode 03: Creating our Express Server

- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install Express server via npm
- Create a server
- Listen to port 7777
- write request handlers for /home , /login , /dashboard
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install 
- Difference between caret and tilde (^ vs ~)




# Episode 04: Routing and Request Handlers

- Play with routes and route extensions  ex. hello, /, helloo/z, /xyz
- Order of the routes matter a lot
- Install Postman app and create account and create a workspace
- create a collection and then make a HTTP Request GET Call
- write logi to handle GET, POST, DELETE API calls and test them on Postman
- Explore routing and use of different types of special charectors in routes
     ? 
     +
     ()
     *
- Use of regex in routes /a/ and /.*fly$/
- Reading the query params in the routes




# Episode 05 Middlewares & Error Handlers

- Route Handlers
- Multiple Route Handlers
- next() method
- Handling Multiple Route Handlers with next() method
- Handling Array of Multiple Route Handlers & played with code 
- Middleware (next() method)
- How ExpressJS basically handles the requests behind the scenes
- Difference between app.use() and app.all
- Written a Dummy Auth Middleware for admin
- Written a Dummy Auth Middleware for all user routes except user/login




# Episode 06 DataBase, Schema & Models | Mongoose

- Create a free cluster on mongoDB official website (Mongo Atlas)
- Install Mongoose library
- Connect application to the  Database "connection-url/schigurupatis"
- Call the connectDB function and conneect to database before starting application on 7777 port
- Create User Schema & User Model
- Create a /signup API to add Data to DataBase
- Push some douments(users) using API calls through POSTMAN





# Episode 07 Diving into the API's

- Find difference between Javascript Object & JSON Object
- Automated Adding user(posting user) with json object from client in postman post request



# Episode 08 Data Sanitization & Schema Validation

- 