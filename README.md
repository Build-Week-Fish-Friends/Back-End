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

- `GET` to `/api/logs/:id` with a token attached as an `Authorization` header. The id should be the desired log
  - Will return a single log object.

<br/>

- `GET` to `/api/logs/user/:id` with the associated user token attached as an `Authorization` header. Gets all logs by user id.
  - Will return an array of log objects.

<br/>  

- `GET` to `/api/logs/area/:id` with the associated user token attached as an `Authorization` header. Gets all logs by area id.
  - Will return an array of log objects.

<br/>

- `POST` to `/api/logs` with the associated user token attached as an `Authorization` header.
  - Will return an array of log objects.
  -  Must include the following log object attached to body of request:  

```js
{	
	"name": "Secret Spot", // required
	"description": "Lots of good shade, very buggy",
	"latitude": null,
	"longitude": null,
	"duration": "1h 17m",
	"bait": "Lure",
	"num_catch": 2,
	"species": "Catfish",
	"photo_url": "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=",
	"user_id": 1, // required, associates this log with a user
	"area_id": 2 // required, associates this log with an area
}  	
```

<br/>

- `PUT` to `/api/logs/:id` with the associated user token attached as an `Authorization` header.
  - Edits log, sepcified by id	
  - Will return an array of log objects.
  - Must include the following log object attached to body of request:  

```js
{	
	"name": "Secret Spot", // required, all other fields optional
	"description": "Lots of good shade, very buggy",
	"latitude": null,
	"longitude": null,
	"duration": "1h 17m",
	"bait": "Lure",
	"num_catch": 2,
	"species": "Catfish",
	"photo_url": "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=",
	"user_id": 1, // required, associates this log with a user
	"area_id": 2 // required, associates this log with an area
}  	
```

<br/>

- `DELETE` to `/api/logs/:id` with the associated user token attached as an `Authorization` header.
  - Deletes log, sepcified by id	
  - Will return the number of logs deleted.
  
<br/>
<br/>
    

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