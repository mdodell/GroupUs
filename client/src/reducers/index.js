import { combineReducers } from 'redux';

import { FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../actions";

const userInitialState = {
    user: null,
    loading: false,
    error: null
};

const eventsInitialState = {
    events: [],
    gettingList: false
};

const createEventInitialState = {
    title: "Event Title",
    description: "Event Description",
    type: "object",
    required: [],
    properties: {}
};

//User Reducers
const currUser = (user = userInitialState, action) => {
    switch(action.type) {
        case FETCH_USER_BEGIN:
            return {
                ...userInitialState,
                loading: true,
                error: null
            };

        case FETCH_USER_SUCCESS:
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
    switch(action.type) {
        case 'ADD_EVENT': {
            return {
                events: [...state.events, action.payload],
                gettingList: true
            };
        }

        case 'EVENTS_SUCCESSFULLY_ADDED': {
            return {
                ...state,
                gettingList: false
            };
        }

        case 'ADD_REGISTRATION': {
            let actionId = action.payload._id;
            let eventPayloadId = action.payload.eventId;
            return {
                events: state.events.map(event => event._id === eventPayloadId ? {
                    ...event,
                    registrations: [...event.registrations, actionId]
                } : event)
            };
        }

        case 'UPDATE_EVENT': {
            let required = action.payload.required;
            let properties = action.payload.properties;
            let eventPayloadId = action.payload._id;
            return {
                events: state.events.map(event => event._id === eventPayloadId ? {
                    ...event,
                    required,
                    properties
                } : event)
            }
        }

        default:
            return state;
    }
};

//Database Reducers
const database = (oldListOfDatabases = [], action) => {
    if(action.type === 'ADD_DATABASE'){
        return [...oldListOfDatabases, action.payload]
    }
    return oldListOfDatabases;
};


const newEvent = (state = createEventInitialState, action) => {
    switch(action.type){
        case 'ADD_PROPERTY':
            return {
                ...state,
                properties: {...state.properties, ...action.payload}
            };
        case 'REMOVE_PROPERTY':
            return {
                ...state,
                properties: state.properties.filter(property => property !== action.payload)
            };
        case 'ADD_REQUIRED':
            let newRequiredArray = [...state.required, action.payload];
            return {
                ...state,
                required: newRequiredArray
            };

        case 'DELETE_REQUIRED':
            return {
                ...state,
                required: state.required.filter(requiredKey => requiredKey !== action.payload)
            };

        case 'UPDATE_TITLE':
            return {
                ...state,
                title: action.payload
            };

        case 'UPDATE_DESCRIPTION':
            return {
                ...state,
                description: action.payload
            };

        default: return state;
    }
};

//combineReducers
export default combineReducers({
    currUser: currUser,
    events: events,
    databases: database,
    newEvent: newEvent
});
