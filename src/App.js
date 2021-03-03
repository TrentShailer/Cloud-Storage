import "./App.css";
import "rsuite/dist/styles/rsuite-dark.css";
import { Button } from "rsuite";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
	return (
		<Router>
			<div className="App">
					<Button appearance="primary"> Hello world </Button>
				<Switch>
					<Route path="/about">
						<Test />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Test() {
	return (<h2>Test</h2>)
}

export default App;
