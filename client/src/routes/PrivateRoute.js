import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class PrivateRoute extends React.Component {
  render() {
    console.log(this.props.currUser);
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.props.currUser ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
    ...state,
    ...ownProps
});
export default connect(mapStateToProps)(PrivateRoute);
