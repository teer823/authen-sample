import React from "react";
import Router from './Router.jsx'
import { connect } from "react-redux";
import Cookie from 'universal-cookie'

import { setUser } from "./redux/actions/user.js";

class App extends React.Component {
  componentDidMount() {
    //Call to get XSRF-Token
    const cookies = new Cookie()
    const cookieUser = cookies.get('user')
    console.log(cookieUser)
    if(cookieUser) {
      this.props.setUser(cookieUser)
    }
    
    /*axios.get(initialUrl, {
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
    })*/

    /* window.addEventListener('message', (event) => {
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
    }); */
  }
  render() {
    return (
      <Router />
    )
  }
}

/*const mapStateToProps = store => {
  const userToken = getUserToken(store);
  const userInfo = getUserInfo(store)
  return { userToken, userInfo };
};*/

export default connect(
  null,
  { setUser }
)(App)