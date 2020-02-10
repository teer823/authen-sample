import React from 'react'
import { Container, Row, Col, Alert, Form, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import { login, logout } from "../redux/actions/user.js";
import { getUserInfo } from "../redux/selectors";

class LoginForm extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
        this.props.login(email, password);
    }
  }

  render() {
    return (
      <Container>
        { this.props.alert &&
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Alert variant="danger">Login Required</Alert>
          </Col>
        </Row>
        }
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
              </Form.Group>
  
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
  
}

const mapStateToProps = state => {
  const userInfo = getUserInfo(state)
  return { userInfo };
};

export default connect(
  mapStateToProps,
  { login, logout }
)(LoginForm);