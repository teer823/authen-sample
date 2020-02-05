import React from 'react'
import { connect } from "react-redux";
import { requestData } from "../redux/actions/data.js";
import { getData, isLoadingData } from "../redux/selectors";

import {
  Button
} from 'react-bootstrap'

class RequestButton extends React.Component {

  handleRequestData = () => {
    this.props.requestData().then(() => {
      console.log('load data completed')
      console.log(this.props.data)
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
  { requestData }
)(RequestButton);
//export default RequestButton