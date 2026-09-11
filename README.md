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
- Install the Postman  App and create a Workspace/collection >> test the API calls
- Make Sure to write the logic and test the  GET,POST,PUT,PATCH,DELETE API Calls
- Explore the routing And use of the ?,+,*,()
- Explore the Routing with use of regex-/a/ ,/.fly$/
- Reading the query Params and Dynamic Routes

- Multiple Route Handlers and play with the code
- next()--refers the  next Route Handler
- next() and Errors with the res.send().....
- app.use("/route",[rh1,rh2,rh3,rh4])

- Difference between app.use() and app.all()
- Authentication with middllewares -admin,user
- Create a clean  midleware/auth.js in the src folder and import in the app.js
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
- Make your sighup api dynamic  to recieve the data from the end user 
- which Document(older/newer) will be returned when  we find out the findOne() using the sample emailId of the user from the Api call
- API -get user by EmailId
- API -get one user by emailId
- Api -feed/get all the users in the database
- Create a delete Api - DELETE the user by findByIdandDelete() 
- Create a updata Api - update the user by findByIdandUpdate() 
- Mandatory to read the MONGOOSE Documentation 
- Difference between the Put and Patch
- Make a Clean code based on the requests which are coming from the endUsers
