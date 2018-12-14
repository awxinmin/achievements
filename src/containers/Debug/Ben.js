import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { firebaseConnect } from "react-redux-firebase";

class Ben extends React.PureComponent {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
            <Fragment>
                <h1>Ben's route</h1>
                <div>This portion will be replaced by some charts</div>
            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    uid: state.firebase.auth.uid,
    completedActivities : state.firebase.ordered.completedActivities,
    publicPaths : state.firebase.ordered.publicPaths,
    unsolvedPublicActivities : state.problem.unsolvedPublicActivities || [],
    publicActivitiesFetched : state.problem.publicActivitiesFetched
  });


export default compose(
    firebaseConnect((ownProps, store) => {
      const state = store.getState();
      const firebaseAuth = state.firebase.auth;

      if (!firebaseAuth.uid) {
        return [];
      }

      return [
        {
          path: "/ben",
          storeAs: "benPath",
          queryParams: ["orderByChild=owner", `equalTo=${firebaseAuth.uid}`]
        }
      ];
    }),
    connect(mapStateToProps)
  )(Ben)