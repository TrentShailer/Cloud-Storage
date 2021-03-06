import "./App.css";
import "rsuite/dist/styles/rsuite-dark.css";
import {
	Container,
	Content,
	FlexboxGrid,
	Panel,
	Form,
	FormGroup,
	ControlLabel,
	FormControl,
	ButtonGroup,
	Button,
	Schema,
	Alert,
} from "rsuite";
import React from "react";
import axios from "axios";
import Forgot from "./Forgot.js";
import Register from "./Register.js";

const { StringType } = Schema.Types;

const model = Schema.Model({
	email: StringType()
		.isEmail("Please enter a valid email address.")
		.isRequired("This field is required."),
	password: StringType()
		.maxLength(40, "Password is too long.")
		.minLength(8, "Password is too short.")
		.isRequired("This field is required."),
});

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formValue: {
				email: "",
				password: "",
			},
			showForgot: false,
			showRegister: false,
		};
		this.SignIn = this.SignIn.bind(this);
		this.OpenForgot = this.OpenForgot.bind(this);
		this.OpenRegister = this.OpenRegister.bind(this);
		this.CloseForgot = this.CloseForgot.bind(this);
		this.CloseRegister = this.CloseRegister.bind(this);
	}

	SignIn = () => {
		const { formValue } = this.state;
		if (!this.form.check()) {
			return;
		}
		axios
			.post("/login", formValue)
			.then((res) => {
				if (res.data.success) {
					window.location.href = "/";
				} else {
					Alert.error("Username or password is incorrect.", 3000);
				}
			})
			.catch((err) => {
				Alert.error("Unable to contact server.", 3000);
			});
	};

	LoginWidth = () => {
		if (window.innerWidth < 600) {
			return 22;
		} else if (window.innerWidth < 1000) {
			return 12;
		} else {
			return 8;
		}
	};

	CloseForgot = () => {
		this.setState({ showForgot: false });
	};

	OpenForgot = () => {
		this.setState({ showForgot: true });
	};

	CloseRegister = () => {
		this.setState({ showRegister: false });
	};

	OpenRegister = () => {
		this.setState({ showRegister: true });
	};

	render() {
		const { formValue } = this.state;
		return (
			<div>
				<Forgot show={this.state.showForgot} close={this.CloseForgot}></Forgot>
				<Register show={this.state.showRegister} close={this.CloseRegister}></Register>
				<Container style={{ marginTop: "150px" }}>
					<Content>
						<FlexboxGrid justify="center">
							<FlexboxGrid.Item colspan={this.LoginWidth()}>
								<Panel header={<h3>Cloud Storage Login</h3>} bordered>
									<Form
										ref={(ref) => (this.form = ref)}
										onChange={(formValue) => {
											this.setState({ formValue });
										}}
										onCheck={(formError) => {
											this.setState({ formError });
										}}
										formValue={formValue}
										model={model}
										fluid
									>
										<FormGroup>
											<ControlLabel>Email address</ControlLabel>
											<FormControl type="email" name="email" />
										</FormGroup>
										<FormGroup>
											<ControlLabel>Password</ControlLabel>
											<FormControl onChange={this.UpdateEmail} name="password" type="password" />
										</FormGroup>
										<FormGroup>
											<ButtonGroup justified>
												<Button onClick={this.SignIn} appearance="primary">
													Sign in
												</Button>
												<Button onClick={this.OpenForgot} appearance="link">
													Forgot password?
												</Button>
												<Button onClick={this.OpenRegister} color="green">
													Register
												</Button>
											</ButtonGroup>
										</FormGroup>
									</Form>
								</Panel>
							</FlexboxGrid.Item>
						</FlexboxGrid>
					</Content>
				</Container>
			</div>
		);
	}
}

export default Login;
