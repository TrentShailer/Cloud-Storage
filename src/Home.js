import {
	Alert,
	Navbar,
	Nav,
	Icon,
	Drawer,
	Button,
	IconButton,
	Sidenav,
	Divider,
	Progress,
	Uploader,
	Container,
	Content,
	Tree,

} from "rsuite";
import { ToReadable } from "./Util.js";
import React from "react";
import axios from "axios";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showProfile: false,
			first_name: "",
			last_name: "",
			email: "",
			max_storage: 0,
			used_storage: 0,
			storagePercent: 0,
			strokeColor: "default",
			file_data: ""
		};
		this.ShowProfile = this.ShowProfile.bind(this);
		this.CoseProfile = this.CoseProfile.bind(this);
		this.SetProgress = this.SetProgress.bind(this);
		this.StorageModule = this.StorageModule.bind(this);
	}
	componentDidMount() {
		this.setState({file_data: ``})
		axios
			.post("/getUserData")
			.then((res) => {
				this.setState(
					{
						first_name: res.data.first_name,
						last_name: res.data.last_name,
						email: res.data.email,
						max_storage: res.data.max_storage,
						used_storage: res.data.used_storage,
						file_data: res.data.file_data
					},
					() => {
						this.SetProgress();
					}
				);
			})
			.catch((err) => {
				Alert.error("Unable to contact server.", 3000);
			});
	}
	ShowProfile = () => {
		this.setState({ showProfile: true });
	};

	CoseProfile = () => {
		this.setState({ showProfile: false });
	};

	SetProgress = () => {
		var percent = (this.state.used_storage / this.state.max_storage) * 100;
		this.setState({ storagePercent: percent });
		var color = "default";
		if (percent >= 95) {
			color = "red";
		} else if (percent >= 90) {
			color = "orange";
		} else {
			color = "default";
		}
		this.setState({ strokeColor: color });
	};
	StorageModule = () => {
		return (
			<div>
				<Divider />
				<div style={{ display: "inline-block", width: "100%", textAlign: "center" }}>
					<h4 style={{ fontWeight: 300 }}>Storage</h4>
				</div>
				<Progress.Line
					strokeWidth={5}
					percent={this.state.storagePercent}
					showInfo={false}
					strokeColor={this.state.strokeColor}
				/>
				<div style={{ display: "inline-block", width: "100%", textAlign: "center" }}>
					<p style={{ fontSize: 12 }}>
						{ToReadable(this.state.used_storage)} used of {ToReadable(this.state.max_storage)}
					</p>
				</div>
				<div style={{ display: "inline-block", width: "100%", textAlign: "center" }}>
					<a style={{ fontSize: 12 }} href="/upgrade">
						Click here to buy more.
					</a>
				</div>
			</div>
		);
	};

	FillSpace = () => {
		return (
			<div>
				<div style={{ height: "100vh" }}></div>
			</div>
		);
	};

	FileInfo = () =>{
		return (
			<div></div>
		)
	}

	SetFileData = () => {

	}

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
				<Container style={{ marginTop: "20px", marginLeft:"300px", marginRight: "100px" }}>
					<Content>
						<div>
							<Uploader action="/upload" draggable>
								<div style={{lineHeight: '100px'}}>Click or Drag files to this area to upload</div>
							</Uploader>
						</div>
						<div>
							<Tree
								data={this.state.file_data}
								draggable
								defaultExpandAll
								onDrop={({ createUpdateDataFunction }, event) =>
									this.SetFileData(createUpdateDataFunction, event)
								}
							/>
						</div>
					</Content>
				</Container>
				<Drawer style={{ width: 250}} show={this.state.showProfile} onHide={this.CoseProfile}>
					<Drawer.Header>
						<Drawer.Title>
							{this.state.first_name} {this.state.last_name}
							<p style={{ fontWeight: 200, fontSize: 12 }}>{this.state.email}</p>
						</Drawer.Title>
					</Drawer.Header>
					<Drawer.Body>
						<p>Your account has {ToReadable(this.state.max_storage)} of storage.</p>
						<a href="/upgrade">Click here to buy more.</a>
					</Drawer.Body>
					<Drawer.Footer>
						<Button
							block
							style={{ marginBottom: 30 }}
							onClick={() => {
								window.location.href = "/logout";
							}}
							color="red"
						>
							<Icon icon="sign-out" /> Sign Out
						</Button>
					</Drawer.Footer>
				</Drawer>
				<div style={{ width: 250, position: "absolute", top: "55px" }}>
					<Sidenav activeKey="1">
						<Sidenav.Body>
							<Nav>
								<Nav.Item eventKey="1" icon={<Icon icon="home" />}>
									All Files
								</Nav.Item>
								<Nav.Item eventKey="2" icon={<Icon icon="star" />}>
									Starred Files
								</Nav.Item>
								<Nav.Item eventKey="3" icon={<Icon icon="trash2" />}>
									Deleted Files
								</Nav.Item>
								<Nav.Item renderItem={this.StorageModule}></Nav.Item>
								<Nav.Item renderItem={this.FillSpace}></Nav.Item>
							</Nav>
						</Sidenav.Body>
					</Sidenav>
				</div>
				
			</div>
		);
	}
}

export default Home;
