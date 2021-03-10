import React from "react";

class Redirect extends React.Component {
	render() {
		window.location.href = this.props.path;
		return <div></div>;
	}
}

export default Redirect;
