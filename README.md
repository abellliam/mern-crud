# mern-crud
A financial bookkeeping and report generating application written on the MERN (MongoDB, Express, React and NodeJS)
stack. This application can keep track of accounts, transactions between accounts and process interest
as well as generate printable client and general reports.

Given the framework in which the application is built, a user authentication service could easily be added
and the application converted to an online client-server app for the benefit of multiple users, use outside of office etc.
However, the client for whom this application was made was happier with a local version for the benefit of security.

To use the application follow these steps:
* Create and use a mongoDB database 'crud'
* Run 'npm install' in root project directory to install necessary node modules
* In one terminal window, navigate to the backend folder and run 'node server' to start the back end
* In another, run 'npm start' in the root project directory

A new window should appear on your default browser showing the application
If it doesn't, navigate to localhost on port 3000


Note: in order to use the application an initial interest rate must be sent to the backend of the
application through use of postman or similar as shown below 
![Postman rate posting](scr-post.PNG)

# Screenshots

## Client entry form
![New Client](scr-1.PNG)   

## Client list
![Client List](scr-2.PNG)

## Transaction list
![Transaction List](scr-3.PNG)

## Processing
![Monthly Processing](scr-4.PNG)

## General report
![General Report](scr-5.PNG)

## Client-specific report
![Client Report](scr-6.PNG)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
