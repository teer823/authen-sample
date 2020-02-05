import React, { Component } from 'react'
import { connect } from "react-redux";
import { getSession } from "../redux/selectors";

import SignInButton from '../components/SignInButton'

class Home extends Component {

  constructor (props) {
    super(props)
    this.message = 'Home'
  }

  render () {
    return (
      <>
        <h2>{this.message}</h2>
        <div>
          <SignInButton />
        </div>
        <div>
          <pre>
            <code>
              {this.props.session ? JSON.stringify(this.props.session, null, 4) : ''}
            </code>
          </pre>
        </div>
      </>
    )
  }
}

const mapStateToProps = store => {
  const session = getSession(store);
  return { session };
};

export default connect(
  mapStateToProps
)(Home)

//export default Home