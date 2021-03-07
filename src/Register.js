import "./App.css";
import "rsuite/dist/styles/rsuite-dark.css";
import { Form, FormGroup, ControlLabel, FormControl, Button, Modal, Schema, Alert } from "rsuite";
import React from "react";
import axios from "axios";

const { StringType } = Schema.Types;

const model = Schema.Model({
	email: StringType()
		.isEmail("Please enter a valid email address.")
		.isRequired("This field is required."),
	password: StringType()
		.addRule((value, data) => {
			if (!value.match(/^(?=.*[a-z]).+$/gm)) {
				return false;
			}
			return true;
		}, "The password must contain lower case characters.")
		.addRule((value, data) => {
			if (!value.match(/^(?=.*[0-9]).+$/gm)) {
				return false;
			}
			return true;
		}, "The password must contain at least 1 number.")
		.addRule((value, data) => {
			if (!value.match(/^(?=.*[A-Z]).+$/gm)) {
				return false;
			}
			return true;
		}, "The password must contain upper case characters.")
		.addRule((value, data) => {
			if (!value.match(/^(?=.*[^a-zA-Z0-9]).+$/gm)) {
				return false;
			}
			return true;
		}, "The password must contain at least 1 special character.")
		.minLength(8, "Password is too short.")
		.maxLength(40, "Password is too long.")
		.isRequired("This field is required."),
	verifyPassword: StringType()
		.addRule((value, data) => {
			if (value !== data.password) {
				return false;
			}

			return true;
		}, "The two passwords do not match")
		.isRequired("This field is required."),
	first_name: StringType()
		.minLength(2, "Name must be at least 2 characters.")
		.maxLength(32, "Name must be less than 32 characters.")
		.isRequired("This field is required."),
	last_name: StringType()
		.minLength(2, "Name must be at least 2 characters.")
		.maxLength(32, "Name must be less than 32 characters.")
		.isRequired("This field is required."),
});

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formValue: {
				email: "",
				password: "",
				verifyPassword: "",
				first_name: "",
				last_name: "",
			},
		};
		this.resetForm = this.resetForm.bind(this);
	}

	resetForm = () => {
		this.setState({ formValue: { email: "", password: "", verifyPassword: "" } });
	};

	submit = () => {
		const { formValue } = this.state;
		if (!this.form.check()) {
			return;
		}
		axios
			.post("/register", formValue)
			.then((res) => {
				if (res.data.success) {
					Alert.success("Successfully registered, you may now login.", 3000);
					this.props.close();
				} else {
					Alert.error("An account already exists with this email.", 3000);
				}
			})
			.catch((err) => {
				Alert.error("Unable to contact server.", 3000);
			});
	};

	render() {
		const { formValue } = this.state;
		return (
			<Modal
				show={this.props.show}
				onHide={() => {
					this.resetForm();
					this.props.close();
				}}
			>
				<Modal.Header>
					<Modal.Title>Forgot Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
							<ControlLabel>Name</ControlLabel>
							<FormControl type="text" name="first_name" placeholder="First Name" />
							<FormControl type="text" name="last_name" placeholder="Last Name" />
						</FormGroup>
						<FormGroup>
							<ControlLabel>Password</ControlLabel>
							<FormControl type="password" name="password" />
						</FormGroup>
						<FormGroup>
							<ControlLabel>Verify Password</ControlLabel>
							<FormControl type="password" name="verifyPassword" />
						</FormGroup>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.submit} appearance="primary">
						Register
					</Button>
					<Button
						onClick={() => {
							this.resetForm();
							this.props.close();
						}}
						appearance="subtle"
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default Register;
