# API Testing Report

## Tested API endpoints

- **GET /api/cities** — retrieves the list of cities and a city by ID. Tested without browser interaction using Playwright APIRequestContext.
- **POST /api/signin** — authenticates a user using credentials stored in `.env`. Includes positive and negative login scenarios.
- **GET /api/user/{id}** — retrieves the user profile and verifies the updated profile data.
- **PUT /api/user/{id}** — updates the user phone number. The update is verified with a subsequent GET request.

## API + UI integration

The hybrid test performs the following steps:
1. Authenticates the user through the API using `POST /api/signin`.
2. Retrieves the user profile and saves the original phone number.
3. Updates the phone number through `PUT /api/user/{id}`.
4. Verifies the updated phone number through `GET /api/user/{id}`.
5. Passes the authentication data returned by the API to the browser using `page.addInitScript()` before navigating to the application.

The following values are stored in browser `localStorage`:

- `accessToken`
- `refreshToken`
- `id`
- `role` (mapped from the API response `roleName`)

The browser then opens the user profile page, where the displayed phone number is compared with the value returned by the API.

The original phone number is restored in a `finally` block to avoid leaving modified test data.

## Test results

- **Total tests:** 6
- **Passed:** 6
- **Failed:** 0
- **Skipped:** 0

See the `playwright-report` folder for the HTML report and `playwright-report-screenshot.png` for a screenshot of the results.
