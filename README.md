# 🎣 Fish Friends Back-End 🐟
Backend Server and Node REST API for Fish Friends

## Maintainer(s)
[@thisbenrogers](https://github.com/thisbenrogers)


## Table of Contents

- [Mission](#mission)
- [Technologies](#technologies)
- [API](#API)
- [License](#license)

---

## Mission
Our mission is to make the world more fishable

Fish Friends enables users to find the best fishing spots in their area. We let anglers perform better by giving them an intuitive way to record and analyze data about their fishing trips. Keep track of you favorite spots with Fish Friends.

---

## Technologies
This REST API was built using the following tools/libraries:
- Nodejs
- Express
- Knex
- JSON Web Tokens
- PostgreSQL

---

<br/>

## API
The leading URI for all endpoints provided below is: `https://fish-friends-resources.herokuapp.com`, simply add the endpoint URL and any relevant body JSON, headers, or queries to access resources.

### 🔐 Auth

<br/>

- `POST` to `/api/register` with the following user object attached to the request body:
> ```js
> {
>   "username": "someUsername", // must be at least 2 characters long
>   "password": "somePassword" // must be at least 4 characters long
> }
> ```

<br/>

- `POST` to `/api/login` with the following user object attached to the request body:
> ```js
> {
>   "username": "someUsername", // must be at least 2 characters long
>   "password": "somePassword" // must be at least 4 characters long
> }
> ```

<br/>

Both the `/register` and `/login` endpoints return an object containing a token _if_ the request is sent correctly. That object will look like this:
>  ```js
>  {
>    "id": 0,
>    "username": "someUsername",
>    "token": "aReallyLongStringOfJibberishThatNeedsToBeSentToTheAPIAsAnAuthorizationHeaderOnEveryRequestToRestrictedRoutes"
>  }
>  ```
The Id and Username are made availble immediately to the client on successful login or register, as well as the token that must be sent as an Authorization header on conesecutive requests.

---
❗ ALL ROUTES BELOW ARE PROTECTED AND MUST USE A TOKEN ❗
  
---

> There is a single login that is the main reference point for all seeded data. Feel free to add logs using this user, or register a new one. Simply keep track of any passwords you create.
> > Login >>> username: "Lambda" password: "1234"




### 👥 Users
The anglers who use our app

<br/>

- `GET` to `/api/users` with the associated user token attached as an `Authorization` header. 
  - Will return an array of user objects.

<br/>

- `GET` to `/api/users/:id` with a token attached as an `Authorization` header. 
  - Will return a single user object.

<br/>

---

### 🌐 Logs
The records of fishing spots

<br/>

- `GET` to `/api/logs` with the associated user token attached as an `Authorization` header. 
  - Will return an array of log objects.

<br/>

- `GET` to `/api/logs/:id` with a token attached as an `Authorization` header. 
  - Will return a single log object.

----

### 🗺️ Areas
The areas where our app is used. Fish Friends is used in only 4 areas so far.

<br/>

- `GET` to `/api/areas` with the associated user token attached as an `Authorization` header. 
  - Will return an array of area objects.

<br/>

- `GET` to `/api/areas/:id` with a token attached as an `Authorization` header. 
  - Will return a single area object.

----

<br/>

## License

MIT © 2019 Fish Friends