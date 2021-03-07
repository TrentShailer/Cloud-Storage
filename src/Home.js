import { Navbar, Nav, Icon, Drawer, Button, IconButton } from "rsuite";
import React from "react";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showProfile: false,
			first_name: "",
			last_name: "",
		};
		this.ShowProfile = this.ShowProfile.bind(this);
		this.CoseProfile = this.CoseProfile.bind(this);
	}

	ShowProfile = () => {
		this.setState({ showProfile: true });
	};

	CoseProfile = () => {
		this.setState({ showProfile: false });
	};

	render() {
		return (
			<div>
				<Navbar>
					<Navbar.Header>
						<b className="navbar-brand logo">Cloud Storage</b>
					</Navbar.Header>
					<Navbar.Body>
						<Nav pullRight>
							<IconButton
								onClick={this.ShowProfile}
								className="navbar-profile"
								icon={<Icon size="lg" icon="user-circle" />}
								circle
								size="lg"
							/>
						</Nav>
					</Navbar.Body>
				</Navbar>
				<Drawer size="xs" show={this.state.showProfile} onHide={this.CoseProfile}>
					<Drawer.Header>
						<Drawer.Title>
							{this.state.first_name} {this.state.last_name}
						</Drawer.Title>
					</Drawer.Header>
					<Drawer.Body></Drawer.Body>
					<Drawer.Footer>
						<Button onClick={this.CoseProfile} appearance="primary">
							Confirm
						</Button>
						<Button onClick={this.CoseProfile} appearance="subtle">
							Cancel
						</Button>
					</Drawer.Footer>
				</Drawer>
			</div>
		);
	}
}

export default Home;
