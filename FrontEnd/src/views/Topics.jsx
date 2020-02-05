import React from 'react'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Story from './Topics/Story.jsx';
import Sample from './Topics/Sample.jsx';

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/story`}>Story</Link>
        </li>
        <li>
          <Link to={`${match.url}/sample`}>
            Sample
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/random`}>
            Random
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/story`} component={Story} />
        <Route path={`${match.path}/sample`} component={Sample} />
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

export default Topics