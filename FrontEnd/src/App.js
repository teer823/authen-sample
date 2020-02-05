import React from "react";
import Router from './Router.jsx'
import axios from 'axios'
import { connect } from "react-redux";

import { exchangeAuthCode, clearSession } from "./redux/actions/session.js";
import { getSession } from "./redux/selectors";

class App extends React.Component {
  componentDidMount() {
    //Call to get XSRF-Token
    const initialUrl = `${process.env.REACT_APP_TARGET_SERVER}`
    
    axios.get(initialUrl, {
      withCredentials: true
    }).then((result) => {
      this.props.exchangeAuthCode().then(() => {
        console.log('existing login')
      }).catch((error) => {
        window.localStorage.removeItem('auth_code')
        this.props.clearSession()
      })
    }).catch((error) => {
      console.log(error)
    })

    window.addEventListener('message', (event) => {
      if(event.origin !== window.origin) {
        return;
      }
      switch(event.data) {
        case "EVENT_GET_AUTH_CODE":
          this.props.exchangeAuthCode().then(() => {
            console.log('login success')
          }).catch((error) => {
            console.log(error)
          })
          break;
        default:
          break;
      }
    });
  }
  render() {
    return (
      <Router />
    )
  }
}

const mapStateToProps = store => {
  const session = getSession(store);
  return { session };
};

export default connect(
  mapStateToProps,
  { exchangeAuthCode, clearSession }
)(App)