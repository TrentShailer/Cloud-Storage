import "./App.css";
import "rsuite/dist/styles/rsuite-dark.css";
import {} from "rsuite";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login.js";
import Home from "./Home.js";
import Redirect from "./Redirect.js";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/">
						<Redirect path="login" />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
