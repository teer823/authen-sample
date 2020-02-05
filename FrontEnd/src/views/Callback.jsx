import React from 'react'
import QueryString from 'query-string'

class Callback extends React.Component {
  constructor(props) {
    super(props)
    this.queries = QueryString.parse(props.location.search)
  }

  componentDidMount() {
    if(this.queries && this.queries.code) {
      if(this.queries.code) {
        window.opener.localStorage.setItem('auth_code', this.queries.code)
        window.opener.postMessage("EVENT_GET_AUTH_CODE", window.opener.origin)
        //window.close()
      } else {
        //Case of error
      }
    }
  }

  render() {
    return (
      <>
        <h3>Callback</h3>
        <div>
          <h5>Code Login</h5>
          <pre>
            <code>{JSON.stringify(this.queries, null, 4)}</code>
          </pre>
        </div>
        <div>
          <h5>Token Login</h5>
          <pre>
            <code>{JSON.stringify(this.hashes, null, 4)}</code>
          </pre>
        </div>
      </>
    )
  }
  
}

export default Callback