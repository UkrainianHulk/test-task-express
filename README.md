## Working instance

https://dev.yarka.ml

## Routes

```js
POST /register          // adds new user
 GET /login             // (basic auth) responses with jwt
 GET /users             // (jwt auth) responses with list of users based on caller role
 PUT /users/:username   // (jwt auth) update user's boss
```

## Environment variables

| Variable   | Description   | Required | Default |
| ---------- | ------------- | -------- | ------- |
| APP_PORT   | app port      | no       | 3000    |
| DB_URI     | database URI  | yes      |         |
| DB_NAME    | database name | yes      |         |
| JWT_SECRET | JWT secret    | yes      |         |
