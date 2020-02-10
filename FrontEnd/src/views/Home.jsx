import React, { Component } from 'react'
import { connect } from "react-redux";
import { getUserInfo, getData } from "../redux/selectors";

import LoginForm from "../components/LoginForm.jsx"
import RequestButton from '../components/RequestButton'

class Home extends Component {

  constructor(props) {
    super(props)
    this.message = 'Home'
  }

  render() {
    if(!this.props.userInfo) {
      return <LoginForm />
    } else {
      return (
        <>
              <h1> Greeting ! {this.props.userInfo.name}</h1>
              <div>
                <RequestButton />
                <pre>
                  <code>{JSON.stringify(this.props.data, null, 4)}</code>
                </pre>
              </div> 
            </>
      )
    }
  }
}

const mapStateToProps = store => {
  const userInfo = getUserInfo(store);
  const data = getData(store);
  return { userInfo, data };
};

export default connect(
  mapStateToProps
)(Home)

//export default Home