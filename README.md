# React TypeScript Project Template

This is a template repository for a front-end application built using React with TypeScript.
This template was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This template includes the following:

* React Router (react-router-dom) for application routing
* Private routing component
* Simple authentication hook for OAuth2 authentication using the Authorization Code Flow with PKCE
* Sass Compiler
* Bootstrap

## The **`useAuth()`** Hook
The `useAuth()` hook returns a global authentication context object containing:

* **`authenticated`**: `true` if authenticated, `false` if not, and `undefined` during the loading state
* **`login()`**: function which redirects to the OAuth2 provider server logging in to an account
* **`signup()`**: function which redirects to the OAuth2 provider server for creating an account
* **`logout()`**: function which revokes your tokens and removes your authentication
* **`getRefreshToken()`**: function which fetches a refresh token from the OAuth2 provider's API
* **`refreshAccessToken()`**: function which fetches a new access token from the OAuth2 provider's API
* **`checkAuth()`**: function which checks if the application has access to the resource server

It is most likely you will want to use this hook via object destructuring assignment, to access the specific elements you need. For example:

```ts
const { getRefreshToken, refreshAccessToken } = useAuth();
```

## The **`PrivateRoute`** Component
The `PrivateRoute` component is used exactly like a normal `Route` component from the React Router library. However, this component hooks into the global authentication context and only renders the component if the `authentication` variable is true. Otherwise, it redirects to a specified page. 

An example usage of this component may be:

```tsx
<PrivateRoute exact path="/account/settings">
    <AccountSettings />
</PrivateRoute>
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
