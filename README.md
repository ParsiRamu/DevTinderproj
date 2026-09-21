DEVTINDER-APPLICATION---DEVELOPERS CAN COMMUNICATE

- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)

- initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- play with the routes -/hello,/,/hello/2,/xyz
- order of the routes Matters A lot
- Install the Postman App and create a Workspace/collection >> test the API calls
- Make Sure to write the logic and test the GET,POST,PUT,PATCH,DELETE API Calls
- Explore the routing And use of the ?,+,\*,()
- Explore the Routing with use of regex-/a/ ,/.fly$/
- Reading the query Params and Dynamic Routes

- Multiple Route Handlers and play with the code
- next()--refers the next Route Handler
- next() and Errors with the res.send().....
- app.use("/route",[rh1,rh2,rh3,rh4])

- Difference between app.use() and app.all()
- Authentication with middllewares -admin,user
- Create a clean midleware/auth.js in the src folder and import in the app.js
- check the authentication and play with the code
- Error Handling With the midleWares---app.use("/", (err, req, res, next) => {})-prefer to place at the end of the code
-
- Create A Database connection to the existed cluster or create a free new cluster from the mongodb atlas
- npm install Mongoose
- write the connectDB async()-function with containing the <"Connection URL"/devtindet(DatabaseName)>
- export the function from config/database.js
- import in the app.js and make sure to initially connect the database(before) and make then only server listens the port.
- Create the userSchema & UserModel
- Create A POST /signup Api to add the data to the database
- push some documents using Api calls from the postman
- Error handling using the try and catch

- Difference between the Js object and JSON
- Add the express.json middleware to the app
- Make your sighup api dynamic to recieve the data from the end user
- which Document(older/newer) will be returned when we find out the findOne() using the sample emailId of the user from the Api call
- API -get user by EmailId
- API -get one user by emailId
- Api -feed/get all the users in the database
- Create a delete Api - DELETE the user by findByIdandDelete()
- Create a updata Api - update the user by findByIdandUpdate()
- Mandatory to read the MONGOOSE Documentation
- Difference between the Put and Patch
- Make a Clean code based on the requests which are coming from the endUsers

- Explore the Schema type options from the Documentations
- Add required,unique,lowercase,min,minLength,trim,max,maxLength
- Add default
- create a custome Validate function for the gender field in the schema
- Improve the DB schema for all Appropiate Validate functions for the fields in the schema
- Add TimeStamp for the mongoose builtin given in the schema
- Add Api level Validation -(patch Api)
- Data Sanitization Add Api level validation for the Each Field
- install the validator -npm i validator
- add the strong Validation for the -Email,Password,Photourl by the (validator.isEmail/isStrongpassword....) function givenby npmValidator
- Explore the validator Library in the gogle and read the docs
- NEVER TRUST THE req.body

- READ THE MONGOOSE LIBRARY DOCS

- Add the extra field in the schema-models/user.js

- Validate thedata in the signup Api
- install the bycrypt library -npm i bcrypt
- Create the passwordHash using the bcrypt.hash() & save the user with the encrypted password in the database
- Create the login Api
- Validate the EmailId
- Compare the Password entered and existed password in the database by bcrypt.compare()

- Install the cookie-parser
- just send the dummy cookie to the user
- Create the GET/profile API and check if you get the cookie back
- install jsonwebtoken
- In Login Api after email and password Validation ,create a JWT token and send it the user in the cookies
- read the cookies inside your profile API and find the LoggedIn User
- user Auth Midleware
- Add the userAuth middleWare in the profile API and a new sendConnectionRequest API
- set the Expiry of the JWT Token and cookies to the 7 days
- create a userSchema method to getJWT()
- create a userSchema method to comparepassword(passwordInputByuser)

- Explore the tinder Api's
- Create a list of the Api's Just think of
- group those Api's As per relates to the respective routing category
- Read the documentation for the Express.Router
- create the routes folder for managing the auth,profile, requests routes
- create the authRouter ,profileRouter,requestsRouter
- import these routes in app.js
- Create the POST /logout Api
- create the PATCH -/profile/edit Api
- create the PATCH -/profile/password Api
- make you validate all the data in the POST ,PATCH Api's

- Create the Coonnection request Schema
- Send Connection request Api
- Proper Validation of the Api
- Think about the all corner cases
- $OR and $and and also $Logical queries in the mongoose Docs
- Schema.prev("save")-function
- Read More about the indexes.
- Why do we need the index?
- What are the Advantages and diasadvantages of creating the indexes.
- Read this Article About the Compound indexes- https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/

- optimized the connectioRequest API
- Dive on mongoose Pre("save",fn) & post("save",fn) functions

- Written the code for the POST-/request/review/:status/:requestId with proper Validation
- Read about the ref&populate from mongoose https://mongoosejs.com/docs/populate.html
- Created a /user/request/received request with all the checks for getting all the interested connection Requests
