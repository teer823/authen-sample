import React from 'react'
import { connect } from 'react-redux'
import { getData } from '../redux/selectors'
import RequestButton from '../components/RequestButton'

function About(props) {
  return (
    <>
      <h2>About</h2>
      <div>
        <RequestButton />
        <pre>
          <code>{JSON.stringify(props.data, null, 4)}</code>
        </pre>
      </div> 
    </>
  )
}

const mapStateToProps = state => {
  const data = getData(state);
  return { data };
};

export default connect(
  mapStateToProps
)(About)
//export default About