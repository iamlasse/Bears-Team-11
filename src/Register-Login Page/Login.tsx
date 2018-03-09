import * as React from 'react';
import '../styles/Register-Login.css';
import { PassedProps, State, Props } from '../types/Login.d';

const fetch = require('isomorphic-fetch');

class Login extends React.Component<PassedProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userLoggedIn: false,
      error: ''
    };
  }
  handleEmail = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      email: e.currentTarget.value
    });
  };

  handlePassword = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      password: e.currentTarget.value
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    var referenceToThis = this;
    var error;

    var apiBaseUrl = 'http://localhost:8080/api/login';

    var payload = {
      email: this.state.email,
      password: this.state.password
    };

    let data = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    fetch(apiBaseUrl, data)
      /* tslint:disable-next-line */
      .then(function(response: any) {
        if (response.status === 200) {
          referenceToThis.setState({ userLoggedIn: true });
        } else if (response.status === 204) {
          error = 'Username password do not match';
          referenceToThis.setState({ error: error });
        } else {
          error =
            'Status Code: ' + response.status + ' - ' + response.statusText;
          referenceToThis.setState({ error: error });
        }
      })
      /* tslint:disable-next-line */
      .catch(function(error: any) {
        alert(error);
      });
  };
  render() {
    return (
      <div className="popupScreen">
        <br />

        <div className="logo">project match</div>

        <br />

        <img
          className="extAuthIcon"
          src={require('../assets/google icon.png')}
        />
        <button className="extAuthBtn">Sign in with Google</button>

        <br />

        <hr className="horizontalDivider" />

        <form>
          <label className="form-label">Your Email</label>
          <input
            className="emailDiv"
            type="email"
            name="email"
            value={this.state.email}
            onChange={e => this.handleEmail(e)}
            placeholder="Email"
          />
          <br />
          <label className="form-label">Password</label>
          <input
            className="passwordDiv"
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handlePassword(e)}
            placeholder="Password"
          />
          <br />
          <input
            type="submit"
            className="signUpBtn"
            value="Submit"
            onClick={e => this.handleSubmit(e)}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects
  };
}

//   function mapDispatchToProps(dispatch: Dispatch<Action>) {
//     return {

//     };
//   }

//   export default connect(mapStateToProps, mapDispatchToProps)(Login);
