# Express App Configuration Fixes

This document records the app and server configuration bugs addressed in `src/app.js` and `src/server.js`.

| Bug | Issue | Implementation |
|-----|-------|----------------|
| 1 | JSON request bodies were not parsed. | Added `bodyParser.json()` so JSON payloads are available on `req.body`. |
| 2 | Cross-origin requests lacked CORS headers. | Added middleware that allows cross-origin requests, common request headers, and API methods; `OPTIONS` preflight requests receive `204 No Content`. |
| 3 | The order routes were mounted at the misspelled `/api/v1/ordrs` path. | Corrected the prefix to `/api/v1/orders`. |
| 4 | No global Express error-handling middleware was registered. | Added error middleware that logs the stack and returns a JSON error response, using the supplied status where available and `500` otherwise. |
| 5 | The server port was hardcoded. | The server now uses `process.env.PORT`, falling back to `3000`. |
| 6 | The server did not handle termination signals gracefully. | The server now closes its listener on `SIGINT` and `SIGTERM`, exiting after the close callback. |

## Validation

The configured Jest command was attempted, but the repository currently contains no tests. A direct app startup smoke check is also blocked by a pre-existing route configuration error: `src/routes/orderRoutes.js` registers a controller method that is undefined. That route/controller issue is outside the scope of these app configuration fixes.
