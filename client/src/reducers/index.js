import { combineReducers } from 'redux';

import { FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../actions";

const userInitialState = {
    user: null,
    loading: false,
    error: null
};

const eventsInitialState = {
    events: []
};

// //User Reducers
const currUser = (user = userInitialState, action) => {
    switch(action.type) {
        case FETCH_USER_BEGIN:
            return {
                ...userInitialState,
                loading: true,
                error: null
            };

        case FETCH_USER_SUCCESS:
            console.log(action.payload.user);
            return {
                ...userInitialState,
                loading: false,
                user: action.payload.user
            };

        case FETCH_USER_FAILURE:
            return {
                ...userInitialState,
                loading: false,
                error: action.payload.error,
                user: null
            };

        default:
            return user;
    }
};

//Events Reducers
const events = (state = eventsInitialState, action) => {
  if(action.type === 'ADD_EVENT'){
      return {
          events: [...state.events, action.payload]
      }
  }
  return state;
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
