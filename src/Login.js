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
	Loader,
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
			loading: false,
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
		this.setState({ loading: true });
		axios
			.post("/login", formValue)
			.then((res) => {
				if (res.data.success) {
					window.location.href = "/";
					this.setState({ loading: false });
				} else {
					Alert.error("Username or password is incorrect.", 3000);
					this.setState({ loading: false });
				}
			})
			.catch((err) => {
				Alert.error("Unable to contact server.", 3000);
				this.setState({ loading: false });
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
											<FormControl errorPlacement="topEnd" type="email" name="email" />
										</FormGroup>
										<FormGroup>
											<ControlLabel>Password</ControlLabel>
											<FormControl
												errorPlacement="topEnd"
												onChange={this.UpdateEmail}
												name="password"
												type="password"
											/>
										</FormGroup>
										<FormGroup>
											<ButtonGroup justified>
												<Button
													disabled={this.state.loading}
													onClick={this.OpenRegister}
													color="cyan"
												>
													Register
												</Button>

												<Button
													disabled={this.state.loading}
													onClick={this.OpenForgot}
													appearance="link"
												>
													Forgot password?
												</Button>
												<Button disabled={this.state.loading} onClick={this.SignIn} color="green">
													Sign in
												</Button>
											</ButtonGroup>
										</FormGroup>
									</Form>
									{this.state.loading && (
										<Loader backdrop size="lg" content="Verifying..." vertical />
									)}
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
