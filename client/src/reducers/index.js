import { combineReducers } from 'redux';

//User Reducers
const currUser = (user = null, action) => {
    if(action.type === 'RECEIVE_USER'){
        if(action.payload.user === "") { //if no user data is returned
            return null
        }
        return action.payload;
    }
    return user;
};

//Events Reducers
const events = (oldListOfEvents = [], action) => {
  if(action.type === 'ADD_EVENT'){
      return [...oldListOfEvents, action.payload];
  }
  return oldListOfEvents;
};

//Database Reducers
const database = (oldListOfDatabases = [], action) => {
    if(action.type === 'ADD_DATABASE'){
        return [...oldListOfDatabases, action.payload]
    }
    return oldListOfDatabases;
};

//combineReducers
export default combineReducers({
    currUser: currUser,
    events: events,
    databases: database
});
