import * as React from 'react';
import axios from 'axios';
import './styles/Header.css';

class Header extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props);
        this.state = {
          loginScreen: false,
          Email: '',
          Password: ''
        };
        this.loginPressed = this.loginPressed.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleEmail(event: any) {
        this.setState({
          Email: event.target.value
        });
      }

      handlePassword(event: any) {
        this.setState({
            Password: event.target.value
          });
      }

      handleSubmit(event: any) {
        var apiBaseUrl = 'http://localhost:3000/api/';
        var payload = {
        Email: this.state.Email,
        Password: this.state.Password
        };
        axios.post(apiBaseUrl + 'login', payload)
        .then(function (response: any) {
        if (response.data.code === 200) {
        alert('good job');
        } else if (response.data.code === 204) {
        alert('Username password do not match');
        } else {
        alert('Username does not exist');
        }
        })
        .catch(function (error: any) {
        alert(error);
        });
        }

      loginPressed() {
          this.setState({
              loginScreen: !this.state.loginScreen
          });
      }

    render() {
        const login = (
            <div className="loginScreen">
            <div className="loginScreen-inner">
            <div>
            <h1 className="loginScreen-header">project match</h1>
            </div>
            <div>
            <button className="loginScreen-button-google">Sign in with Google</button>
            </div>
            <div>
            <button className="loginScreen-button-facebook">Sign in with Facebook</button>
            </div>
            <form>
            <div className="emailDiv">
            <input
                type="text" 
                name="email"
                value={this.state.Email}
                onChange={this.handleEmail}
                placeholder="Email" 
            />
            </div>
            <div className="passwordDiv">
            <input 
                type="text"
                name="password"
                value={this.state.Password}
                onChange={this.handlePassword}
                placeholder="Password" 
            />
            </div>
            <input type="submit" value="Submit" />
            </form>
            </div>
            </div>
        );
        return (
            <div>
                <div className="header-container">
                    <h1>EmailState:{this.state.Email} PasswordState:{this.state.Password}</h1>
                    {this.state.loginScreen === true ? login : null}
                    <div className="logo">
                        <h1>project match</h1>
                    </div>
                    <div className="login">
                        <a onClick={this.loginPressed}><h2 className="loginText">LOG IN</h2></a>
                    </div>
                    <div className="signUp">
                        <button className="signUpButton">
                        <h2 className="signUpText">SIGN UP FOR FREE</h2></button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;