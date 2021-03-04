import "./App.css";
import "rsuite/dist/styles/rsuite-dark.css";
import {} from "rsuite";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login.js";
import Home from "./Home.js";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
