import React, { Component } from 'react';
import UserDataService from '../user.service';
import "../global.css"
import { Form, Button } from 'react-bootstrap';

export default class SignUp extends Component {  
    constructor(props) {
        super(props);

        this.state = {
         username: '',
         password: '',
         email: '',
         created: false,
         errorMessage: '',
         userId: 0
    };
    this.saveUser = this.saveUser.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);


}

saveUser() {
  var data = {
    username: this.state.username,
    password: this.state.password,
    email: this.state.email,
  };

  UserDataService.create(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email, 
        password: response.data.password, 
        created: true,
        userId: response.data.id
      });
      console.log(response.data);
    })
    .catch(e => {
      alert("Username and/or email already taken.")
    });
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

onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  } 


    render () {
        const { email, username, password } = this.setState;
        return (
        <div className="submit-form">
        {this.state.created ? (
          <div>
            <br />
            <h4>User created successfully!</h4>
            <Button variant="primary" href="/login" className="success">
              Log in to your account
            </Button>
          </div>
        ) : (
            <div>
                <Form>
                < br />
            <h2> Create account </h2>
            <br/> 
                    <Form.Group>
                    <Form.Label htmlFor="email">Email address: </Form.Label>
                    <Form.Control
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => this.onChangeEmail(e)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="username">Username:</Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => this.onChangeUsername(e)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="username">Password: </Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => this.onChangePassword(e)} />
                </Form.Group>
                < br/>
                <Button variant="primary" size="md" onClick={this.saveUser}>
                   Submit
                </Button>
                </Form>
            </div>
        )
     } 
     </div>
        )
    }
}