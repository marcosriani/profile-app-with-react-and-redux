import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceHolder';

// Calling an action creator inside an action creator
// Need to make sure that we dispatch manually this action creator
// Second argument getState is from the redux store that give access to all the data inside of redux
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  //   Call fetch posts - the await makes sure the request is done
  //   before moving on to the next line
  await dispatch(fetchPosts());
  //   Get the list of posts - using lodash version of map to
  //   to get just the unique user ids call _.uniq from lodash
  const userIds = _.uniq(_.map(getState().posts, 'userId'));

  //   Calling fetchUser for every ID
  userIds.forEach((id) => {
    dispatch(fetchUser(id));
  });
};

// 1 way of doing things to work, with the use of memoize from lodash
// Action creator FETCH POSTS
export const fetchPosts = () => {
  // Redux thunk return a function to make async action work
  return async (dispatch) => {
    // Make an API request
    const response = await jsonPlaceholder.get('/posts');

    // returns an action
    dispatch({ type: 'FETCH_POSTS', payload: response.data });
  };
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  // dispatch an action
  dispatch({ type: 'FETCH_USER', payload: response.data });
};

// Action creator FETCH USER (Fetch the user just one time)
// First possible solution has one down side
// You can only call this action creator just one time - fetch each user one time inside the application
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

// Memoize from lodash library
// Makes it able to call our action creator with with it's unique id one time
// Fetch each user just one time

// Private function
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   // dispatch an action
//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });
