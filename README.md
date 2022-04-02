# Project Note

- Started on Mar 30 and finished on Apr 01 2022.
- Started following the tutorial and added all the additional feature suggested in the tutorial:

* Display the location for each move in the format (col, row) in the move history list: is added by having an additional function with switch case to convert the square id into row-col coordinate;
* Bold the currently selected item in the move list: is added by having an additional state: bold, stored in an array of 9, each with a value of false to represent each button/move in the chronology. Whenever it's clicked, the onClick function will trigger the array at that index/step to turned into true, and the corresponding button (same index) will show text as bold;
* Rewrite Board to use two loops to make the squares instead of hardcoding them: self explanatory;
* Add a toggle button that lets you sort the moves in either ascending or descending order: is added by having another state: asc(ending) with a value of true. Whenever the button clicked, the onClick function will trigger for that state to switch into false, thus the if/else statement will trigger the CSS style for that block to do flex-direction: column-reverse. It's not worth it to have a state and a reversing algorithm just to show the order in reverse;
* When someone wins, highlight the three squares that caused the win: is added by having another state, i.e. win(ner) with [] as value, which will change whenever the invoked function in the render method returns a value [x/o, index1, index2, index3]. I just need to add conditional in the Square rendering to have CSS style triggered to be bold whenever that Square id matched any one of those indices;
* When no one wins, display a message about the result being a draw: is added just by checking the state.stepNumber. If it is 10 and the state.winner is still [], for sure it is a draw. For the display, just need to add a ternary statement whether to show Next player ... or ..is a draw;

- On top of the abovementioned feature, I added the undo button so that user can undo their move on specific point in time: is added simply by having a method undo that slice the state.history from zero to the specific moves already clicked by the user, and return the state since everything else has already been changed by the jumpTo method.

## 20220401

Problem:
Getting React - uncaught TypeError: Cannot read property 'setState' of undefined when
Reverse the Order button got clicked.
Cause: the this.reverseOrder must be bound in the constructor.
Solution: adding this.reverseOrder = this.reverseOrder.bind(this)
Reference: https://stackoverflow.com/questions/32317154/react-uncaught-typeerror-cannot-read-property-setstate-of-undefined

Problem:
Getting "Uncaught TypeError: this.undo is not a function" on undo function that mimics jumpTo function in placing and binding across the whole app.
Cause: this.undo = this.undo(this) suppose to be ...this.undo.bind(this)
Solution: completely use arrow syntax on function expression or add 'bind'

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

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
