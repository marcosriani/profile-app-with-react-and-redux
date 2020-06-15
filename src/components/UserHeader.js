import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchUser } from '../actions'; - could be case in the solution 1

class UserHeader extends Component {
  //   componentDidMount() { - could be case in the solution 1
  //     //   Passing the user ID to be fetched
  //     this.props.fetchUser(this.props.userId);
  //   }

  render() {
    // Return null when the component is first loaded
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <div className='header'>
        Author: {user.name} id: {user.id}
      </div>
    );
  }
}

// this function also have a second argument called ownPorps
// ownProps is a reference to the props that are about to go into the component
// In this case ownProps is a reference to the props userID passed in PostList
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find((user) => user.id === ownProps.userId),
  };
};

export default connect(mapStateToProps)(UserHeader);

// In the solution 1 I should add the { fetchUser } action creator
