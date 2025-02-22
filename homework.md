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



# Episode 05: Middlewares & Error Handlers

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



# Episode 06: DataBase, Schema & Models | Mongoose

- Create a free cluster on mongoDB official website (Mongo Atlas)
- Install Mongoose library
- Connect application to the  Database "connection-url/schigurupatis"
- Call the connectDB function and conneect to database before starting application on 7777 port
- Create User Schema & User Model
- Create a /signup API to add Data to DataBase
- Push some douments(users) using API calls through POSTMAN



# Episode 07: Diving into the API's

- Find difference between Javascript Object & JSON Object
- Add the express.json middleware to your app
- Make Signup API Dynamic to receive data from the end user
- User.findOne with duplicate email ids, which object retun
- API Get user by email
- API Feed API - Get all users data
- DELETE API   
- PATCH API  (Update API)
- Difference between PATCH and PUT
- Explore all API Methods of Mongoose
- Automated Adding user(posting user) with json object from client in postman post request



# Episode 08: Data Sanitization & Schema Validation

- Explore SchemaType options from the documentation
- Add the options like required, unique, lowercase, min, minLength, trim
- Add the option Default
- Create a custom validate function for gender
- Improve the DB Schema - PUT all appropriate validations on each field in Schema
- Add timestamps to the userSchema




# Episode 09: Encrypting Psswords

- Validate data in Signup API
- Install bcrypt npm package
- Create a PasswordHash using bcrypt.hash method & save the user with encrypted password in DB
- Create Login API
- Compare passwords and throw errors if email or password is invalid





# Episode 10: Authentication, JWT & Cookies

- Install CookieParser
- Send Dummy Cookie to user
- Create GET /Profile API and check if you get the cookie back
- Install jsonwebtoke package
- Login API, after email and password validation, create a JWT Token and send it to user in cookie
- Read the cookies inside your profile API to find the loggedIn user
- userAuth Middleware
- Add teh userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT Token and cookies to 7 days
- Create user schema method to getJWT()
- Create user schema method to compare passwords





# Episode 11: Diving into the APIs and express Router

- Go and Explore Tinder API's
- Create a list of all API's you can think of in DevTinder 
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile & request routers
- Create authRouter, profileRouter and requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit API
- Create PATCH /profile/password API => forgot password API
- Make sure you validate all data in every POST, PATCH API's



# Episode 12: Logical DB Query & Compound Indexces

- Read more about indexes in MongoDB
- Why do we need index in DB?
- What is the advantages and disadvantages of creating indexes?
- Compound Indexes in Mongo DB
- Send Connection Request API
- Proper validations Data of API
- Schema.pre function
- $or function


# Episode 13: ref, Populate & Thought process of writing APIs

- write code with proper validations for "REVIEW POST API" /request/review/:status/:requestId
- POST & GET API thought process
- Read about ref & populate
- Create GET /user/requests/received with all the checks
- Create GET /user/connections


# Episode 14: Building Feed API & Pagination

- Login for GET /feed API
- Explore the $nin, $and, $ne and other query operators
- Pagination
     ###  Pagination Notes
     - /feed?page=1&limit=10 => 1-10   =>  .skip(0) & limit(10)
     - /feed?page=2&limit=10 => 11-20  =>  .skip(10) & limit(10)
     - /feed?page=3&limit=10 => 21-30  =>  .skip(20) & limit(10) 
     skip = (page - 1) * limit;


