import React, { Component } from 'react';
import UserDataService from '../user.service';
import { UserContext } from '../UserContext';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export default class LoginForm extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { updateUser } = this.context;

    try {
      const response = await UserDataService.getUsername(username);
      const user = response.data;

      if (user) {
        if (user.username === username && user.password === password) {
          updateUser(user.id, user.username, true);
        } else {
          this.setState({ errorMessage: 'Incorrect password' });
        }
      } else {
        this.setState({ errorMessage: 'No user found with this username' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      this.setState({ errorMessage: 'Error logging in. Please try again later.' });
    }
  }

  render() {
    const { username, password, errorMessage } = this.state;
    const { loggedIn } = this.context;

    if (loggedIn) {
      return <Navigate to='/home' />;
    }

    return (
      <div className="submit-form">
        <br />
        <h2>Log in</h2>
        <br />
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">Username:</Form.Label>
            <Form.Control
              type="text"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
          </Form.Group>
          {errorMessage && <p>{errorMessage}</p>}

          <br />
          <Button type="submit" size="md">
            Log in
          </Button>
          <br />
          <br />
          <Button href="/sign-up">Create New Account</Button>
        </Form>
      </div>
    );
  }
}
