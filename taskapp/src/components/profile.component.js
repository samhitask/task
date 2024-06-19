import React, { Component } from 'react';
import { Button, Stack, Row, Col } from 'react-bootstrap';
import TaskDataService from '../task.service';
import UserDataService from '../user.service';
import { UserContext } from '../UserContext';

export default class Profile extends Component {
  static contextType = UserContext;

  async deleteUser(userId) {
    const { logoutUser } = this.context;

    try {
      await TaskDataService.deleteAll(userId);
      await UserDataService.delete(userId);
      logoutUser();
    } catch (error) {
      alert('Error deleting user and tasks:', error);

  }
}

  render() {
    const { username, userId } = this.context;

    return (
      <div>
         <Row className="justify-content-center">
          <Col md={9} className="rounded-pill p-3 text-center mb-3">
            <h1>Account actions</h1>
            <h4>User: {username} </h4>
          </Col>
        </Row>

        <Stack gap={3}>
          <Button href='/login' variant='danger' onClick={() => this.context.logoutUser()} style={{ width: '100%' }}>
            Log out
          </Button>
          <Button variant='danger' onClick={() => this.deleteUser(userId)} style={{ width: '100%' }}>
            Delete account
          </Button>
        </Stack>
      </div>
    );
  };
}
