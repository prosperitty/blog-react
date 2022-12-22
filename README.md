# Blog Client (Front End)

This is the frontend clientside codebase for the blog app. Technology used includes React, React Hooks, React Router, and TinyMCE text editor. Hosting by [Railway](https://railway.app). 

## Functionality

The main functionality of this blog app is to allow users to call the blog API to create articles, comments, or categories if they are authenticated. Articles and comments use the basic operations of CRUD. Users are only allowed to create categories for now. 

If a user wants to begin writing blogs, or comment below a blog, the user must first create an account. Once registered, the user should be authenticated with passport.js to begin using the app. Users are allowed to sign out if chosen to.

Using React with React Router, the user is able to navigate the app to different routes. Navigating to a route will call the API using fetch which calls the backend URI and returns a response. If creating, updating, or deleting, the client will call the backend server to handle these operations. Authentication is also handled by the backend. 

# Learning Objectives

- React
- React Router
- useContext
- Fetch API 
- Dynamic Pages
- Buffer 
- Authentication
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