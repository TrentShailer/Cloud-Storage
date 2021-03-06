import "./App.css";
import "rsuite/dist/styles/rsuite-dark.css";

import React from "react";

class Login extends React.Component {
	render() {
		window.location.href = this.props.path;
		return <div></div>;
	}
}

export default Login;
