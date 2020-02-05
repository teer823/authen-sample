import React from 'react'
import { connect } from "react-redux";
import { login, logout } from "../redux/actions/session.js";
import { getSession, isLoadingSession } from "../redux/selectors";

import {
  Button
} from 'react-bootstrap'

class SignInButton extends React.Component {

  handleLogin = () => {
    if(this.props.session) {
      this.props.logout()
    } else {
      this.props.login()
    }
  }

  render () {
    return (
      <Button variant="success" onClick={this.handleLogin}>
        {this.props.isLoading ? 'Loading' : (this.props.session ? 'Sign Out' : 'Sign In')}
      </Button>
    )
  }
}

const mapStateToProps = state => {
  const session = getSession(state);
  const isLoading = isLoadingSession(state)
  return { session, isLoading };
};

export default connect(
  mapStateToProps,
  { login, logout }
)(SignInButton);
//export default SignInButton