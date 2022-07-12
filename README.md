```js
    POST /register          // adds new user
     GET /login             // (basic auth) responses with jwt
     GET /users             // (jwt auth) responses with list of users based on caller role
     PUT /users/:username   // (jwt auth) update the  user
```
