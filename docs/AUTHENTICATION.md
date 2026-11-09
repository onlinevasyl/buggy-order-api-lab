# Authentication

Protected order update and delete routes require a signed JWT in the
`Authorization` header:

```text
Authorization: Bearer <token>
```

Set `JWT_SECRET` in the server environment to the secret used to sign tokens.
The middleware verifies HS256 signatures and token expiration, then attaches
the verified claims to `req.user`. Do not commit the secret to the repository.
