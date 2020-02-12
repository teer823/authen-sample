import React from 'react'
import { connect } from "react-redux";
import { refresh } from "../redux/actions/user.js"
import { requestData } from "../redux/actions/data.js";
import { getData, isLoadingData } from "../redux/selectors";

import {
  Button
} from 'react-bootstrap'

class RequestButton extends React.Component {

  handleRequestData = (retry) => {
    this.props.requestData().then(() => {
      console.log(this.props.data)
    }).catch((error) => {
      if(error.action === 'refresh') {
        this.props.refresh().then(() => {
          console.log('-refresh success-')
          this.props.requestData()
        }).catch(() => { 
          console.log('-refresh-failed')
        })
      }
    })
  }

  render () {
    return (
      <Button variant="warning" onClick={this.handleRequestData}>
        {this.props.isLoading ? 'Loading' : 'Request Data'}
      </Button>
    )
  }
}

const mapStateToProps = state => {
  const data = getData(state);
  const isLoading = isLoadingData(state)
  return { data, isLoading };
};

export default connect(
  mapStateToProps,
  { requestData, refresh}
)(RequestButton);
//export default RequestButton