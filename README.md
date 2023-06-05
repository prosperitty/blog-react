# Blog Client (Front End)

This is the frontend clientside codebase for the blog app. Technology used includes React, React Hooks, React Router, and TinyMCE text editor. Hosting by [Railway](https://railway.app). 

Backend API repository [here](https://github.com/alex-lvl/blog-api?).

## Functionality

The main functionality of this frontend client is to utilize the backend API to handle various tasks. The frontend utilizes the backend to authenticate users when registering or logging in, CRUD operations, query for data in the database, and form validation/upload.

If a user wants to begin writing blogs, or comment below a blog, the user must first create an account. Once registered, the user should be authenticated with passport.js to begin using the app. Users are allowed to sign out if chosen to.

Using React with React Router, the user is able to navigate the app to different routes. Navigating to a route will call the API using fetch which calls the backend URI and returns a response. If creating, updating, or deleting, the client will call the backend server to handle these operations. Authentication is also handled by the backend. 

## Learning Objectives

- React
- React Router
- useContext
- Fetch API 
- Dynamic Pages
- Buffer 
- Authentication
- TinyMCE
- POST/PUT formData
- Form Validation
- Passport.js
- Cookies
- Sessions
- CRUD
- REST API
- REST API Structure
- REST API Endpoint Naming Conventions
- HTTP Methods (GET,POST,PUT,DELETE)
- CORS
- Same Origin Policy
- Configuring CORS origin
- CORS Headers
- Frontend Development/Backend Development
- Railway

## References

[The Odin Project](https://www.theodinproject.com/lessons/nodejs-blog-api)

[Live Demo](https://alex-lvl.github.io/blog-react/)