import * as React from 'react';
import '../styles/Register-Login.css';
import { LoginState } from '../types/Login.d';
import { LoginProps } from '../types/Redux.d';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';
import { GoogleSignIn } from '../GoogleSignIn/index';
class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    var { name, value } = e.currentTarget;

    /*
     * There is a current bug in typescript that does not correctly identify the string literal
     * type in a computed property key.
     * 
     * ref: https://github.com/Microsoft/TypeScript/issues/15534
     * ref: https://github.com/Microsoft/TypeScript/issues/13948
     * ref: https://github.com/Microsoft/TypeScript/pull/21070
     */
    this.setState({
      [name]: value
      // tslint:disable-next-line
    } as any);
  };

  handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    this.props.login(this.state.email, this.state.password);
  };
  render() {
    return (
      <div className="popupScreen">
        <br />

        <div className="logo-login_register">project match</div>

        <br />

        <GoogleSignIn />

        <hr className="horizontalDivider" />

        <form>
          <label className="form-label">Your Email</label>
          <input
            className="emailDiv"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <br />
          <label className="form-label">Password</label>
          <input
            className="passwordDiv"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <br />
          <input
            type="submit"
            className="loginBtn"
            value="Log In"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default connect<{}, LoginProps, {}>(null, { login })(Login);
