# Spacebook Assignment

This repository contains the code for the 2022 Mobile Application Development assignment as part of my degree. The nodes_modules folder has been ignored by Git as set out in the .gitignore file.

### Link to the assignment repository (For assignment submission)

---

https://github.com/SamVain/MAD.Coursework.Spacebook.git

### Spacebook API Endpoints

---

All the endpoints set out below have been fully implemented.

User Management:

- POST /user - Add new user

- POST /user/login - Log into an account

- POST /logout - Log out of an account

- GET /user/{user_id} - Get user information

- PATCH /user/{user_id} - Update user information

- GET /user/{user_id}/photo - get a users profile photo

Friend Management:

- GET /user/{user_id}/friends - Get list of friends for a given user

- POST /user/{user_id}/friends - Add a new friend

- GET /friendrequests - Get a list of outstanding friend requests

- POST /friendrequests/{user_id} - Accept friend request

- DELETE /friendrequests/{user_id} - Reject a friend request

- GET /search - Find friends

Post Management:

- GET /user/{user_id}/post - Get a list of posts for a given user

- POST /user/{user_id}/post - Add a new post

- DELETE /user/{user_id}/post/{post_id} - Delete a post

- PATCH /user/{user_id}/post/{post_id} - Update a post

- POST /user/{user_id}/post/{post_id}/like - Like a post

- DELETE /user/{user_id}/post/{post_id}/like - Remove a like from a post

### Features of the Spacebook App

---

- Ability to create, log into and log out of an account
- Ability to view account details and edit these details
- Search for other users and send them a friend request
- Ability to either accept or reject these friend requests
- Ability to view posts from yourself and your friends
- Like or unlike these posts
- Edit your own posts
- Delete your own posts

### How to run

---

1. Clone the repository
2. Run npm install --legacy-peer-deps to install nodes_modules and the required dependencies
3. In your server folder (Not included), create your .env file and enter your MMU Mudfoot detauils
4. Run the server using npm run dev
5. Run npm start in the MAD.Coursework.Spacebook folder to launch the application
