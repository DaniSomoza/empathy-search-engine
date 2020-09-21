This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000/empathy-search-engine/](http://localhost:3000/empathy-search-engine/) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches unit and integration tests, generating 2 coverage reports `coverage-jest` and `coverage-cypress`.<br />
after execute all tests a combined `coverage` report will be generated

### `npm run test:jest:local`

Launches unit tests, developed in jest and react testing library

### `npm run test:cypress:local`

Launches integration tests, developed in cypress<br />
NOTE: Server has to be running!, so make sure that you are running `npm run start` before to launch integration tests with this command.

### `npm run build`

Builds the app for production to the `build` folder.<br />

## Environment variables

make sure that you create a `.env` file with:

REACT_APP_SPOTIFY_URL=https://api.spotify.com
REACT_APP_BACKEND_URL=https://accounts.spotify.com
REACT_APP_TOKEN_SECRET={{YOUR_CLIENT_SECRET}}
