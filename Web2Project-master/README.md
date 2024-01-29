# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the required extensions from package.json dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



### REST-api

`POST: localhost:8080/api/new/project/:name/:userID`
Creates new project into project table with parameters name (string) and userID (integer)
Example: `localhost:8080/api/new/project/project/1`


`POST: localhost:8080/api/new/list/:name/:projectID`
Creates new list into list table. Requires name (string) and projectID (integer)
Example: `localhost:8080/api/new/list/TODO/1`


`POST: localhost:8080/api/new/card/:name/:listID`
Creates new card into card table. Requires name (string) and listID (integer)
Example: `localhost:8080/api/new/card/Opiskele/1`


`DELETE: localhost:8080/api/project/delete/:id`
Deletes project from project table by projectID (integer)
Example: `localhost:8080/api/project/delete/1`


`DELETE: localhost:8080/api/list/delete/:id`
Deletes list from list table by listID (integer)
Example: `localhost:8080/api/list/delete/1`


`DELETE: localhost:8080/api/card/delete/:id`
Deletes card from card table by cardID (integer)
Example: `localhost:8080/api/card/delete/1`


`GET: localhost:8080/api/get/project/:id`
Fetches all projects by userID (integer) from project table'
Example: `localhost:8080/api/get/project/1`


`GET: localhost:8080/api/get/lists/:id`
Fetches all lists by projectID (integer) from list table
Example: `localhost:8080/api/get/lists/1`


`GET: localhost:8080/api/get/cards/:id`
Fetches all cards by listID (integer) from card table
Example: `localhost:8080/api/get/cards/1`


`PUT: localhost:8080/api/editProject/:id/:name`
Updates projects name (string) by projectID (integer) in project table
Example: `localhost:8080/api/editProject/1/updatedname`


`GET: localhost:8080/api/get/projectName/:id`
Fetches project by projectID (integer) from project table
Example: `localhost:8080/api/get/projectName/1`


`PUT: localhost:8080/api/editList/:id/:name`
Updates lists name (string) by listID (integer) in list table
Example: `localhost:8080/api/editList/1/newname`


`GET: localhost:8080/api/get/listName/:id`
Fetches lists by listID (integer) from list table
Example: `localhost:8080/api/get/listName/1`


`PUT: localhost:8080/api/editCard/:id/:name`
Updates cards name (string) by cardID (integer) in card table
Example: `localhost:8080/api/editCard/1/newname`


`GET: localhost:8080/api/get/cardName/:id`
Fetches card name by cardID (integer) from card table
Example: `localhost:8080/api/get/cardName/1`


`POST: localhost:8080/api/user/register`
Creates new user into database must contain username and password
Example: `{"username":"newuser","password":"1234"}`


`GET: localhost:8080/api/getUserID/:name`
Fetches userID by name (string)
Example: `localhost:8080/api/getUserID/username`


`POST: localhost:8080/api/user/login`
Requires username and password, will return token on success
Example: `{"username":"newuser","password":"1234"}`


`POST: localhost:8080/api/user/verify`
Verifies token
