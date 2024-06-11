## API Endpoints

### Authentication

- **Register User**

  - `POST /api/v1/users/register`
  - Request body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: `{ "success": boolean, "message": "User Created successfully", "data":{"user" : User Object, "token" : "JWT Token"} }`

- **Login User**

  - `POST /api/v1/users/login`
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: `{  "success": boolean, "message": "User Logged in Successfully", "data":{"user" : User Object, "token" : "JWT Token"} " }`

- **Logout User**
  - `GET /api/v1/users/logout`
  - Response: `{ "success": boolean, "message": "User Logged in Successfully", }`

## Steps to Run Project

1. Unzip the MEAN-Authentication Project.
2. Install the Node Modules for both Frontend and Backend Folders. (`command: npm i`)
3. Run Backend using Command `authentication-mean\backend> npm run dev`.
4. Run Frontend using Command `authentication-mean\frontend> npm start`.
5. Open any Browser and hit the Url `http://localhost:4200/`.
6. Register or Login user.
7. JWT token can be seen in Cookies of Browser.
