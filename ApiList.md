
# DEV TINDER API'S
AuthRouter
- POST -/signup
- POST -/login
- POST -/logout

ProfileRouter
- GET -/profile/view
- PATCH -/profile/edit
- PATCH -/profile/password

ConnectionRouter
- POST -/request/send/interested/:userId
- POST -/request/send/ignored/:userId
- POST -/request/review/accepted/:requestId
- POST -/request/review/rejected/:requestId

UserRouter
- GET -/user/connections
- GET -/user/request/received
- GET -/user/feed  -gets yot the profiles of the other users on platform


- status:ignored,interested Accepted,rejected