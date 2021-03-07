import "./App.css";
import "rsuite/dist/styles/rsuite-dark.css";
import {
	Form,
	Loader,
	FormGroup,
	ControlLabel,
	FormControl,
	Button,
	Modal,
	Schema,
	Alert,
} from "rsuite";
import React from "react";
import axios from "axios";

const { StringType } = Schema.Types;

const model = Schema.Model({
	email: StringType()
		.isEmail("Please enter a valid email address.")
		.isRequired("This field is required."),
});

class Forgot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formValue: {
				email: "",
			},
			loading: false,
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
		this.setState({ loading: true });
		axios
			.post("/register", formValue)
			.then((res) => {
				if (res.data.success) {
					Alert.success(
						"An email has been sent with instructions on how to reset your password.",
						3000
					);
					this.setState({ loading: false });
					this.props.close();
				} else {
					Alert.error("An account does not exist with this email.", 3000);
					this.setState({ loading: false });
				}
			})
			.catch((err) => {
				this.setState({ loading: false });
				Alert.error("Unable to contact server.", 3000);
			});
	};

	render() {
		const { formValue } = this.state;
		return (
			<Modal
				show={this.props.show}
				onHide={() => {
					this.props.close();
					this.resetForm();
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
							<FormControl errorPlacement="topEnd" type="email" name="email" />
						</FormGroup>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.submit} appearance="primary">
						Reset Password
					</Button>
					<Button
						onClick={() => {
							this.props.close();
							this.resetForm();
						}}
						appearance="subtle"
					>
						Cancel
					</Button>
				</Modal.Footer>
				{this.state.loading && <Loader backdrop size="lg" content="Verifying..." vertical />}
			</Modal>
		);
	}
}

export default Forgot;
