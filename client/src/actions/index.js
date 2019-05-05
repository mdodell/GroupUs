import axios from 'axios';

export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

//User Actions
export const fetchUserBegin = () => ({
    type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = user => ({
    type: FETCH_USER_SUCCESS,
    payload: { user }
});

export const fetchUserFailure = error => ({
    type: FETCH_USER_FAILURE,
    payload: { error }
});

export const fetchEventsEnd = () => ({
    type: 'EVENTS_SUCCESSFULLY_ADDED'
});

export const fetchUserAndEvents = () => {
    return dispatch => {
        dispatch(fetchUserBegin());
        return axios.get('/auth/getUser', {
            headers: {"Access-Control-Allow-Origin": "http://localhost:3001"},
            withCredentials: true
        }
        ).then(json => {
            if(json.data === ""){
                dispatch(fetchUserFailure(true))
            } else {
                dispatch(fetchUserSuccess(json.data));
                (json.data.events).forEach(event =>
                    axios.get('/event/getEvent', {
                        params: {
                            id: event
                        }
                    }).then(eventRes => dispatch(addEvent(eventRes.data))).then(() => dispatch(fetchEventsEnd())).catch(err => console.log(err)));
            }
            return json.data;
        }).catch(error => dispatch(fetchUserFailure(error)));
    }
};

export const addEventDispatch = (event) => {
    return dispatch => dispatch(addEvent(event))
};

export const addEvent = newEvent => {
    return {
        type: 'ADD_EVENT',
        payload: newEvent
    }
};

export const addPropertiesAndRequiredDispatch = event => {
    return dispatch => dispatch(addPropertiesAndRequired(event));
};

export const addPropertiesAndRequired = updatedEvent => {
    return {
        type: 'UPDATE_EVENT',
        payload: updatedEvent
    }
};

export const addRegistrationDispatch = registration => {
    return dispatch => dispatch(addRegistration(registration));
};

export const addRegistration = registrationId => {
    return {
        type: 'ADD_REGISTRATION',
        payload: registrationId
    }
};

export const addRequiredToCurrEvent = key => {
    return dispatch => dispatch({
        type: 'ADD_REQUIRED',
        payload: key
    })
};

export const deleteRequiredFromCurrEvent = key => {
    return dispatch => dispatch({
        type: 'DELETE_REQUIRED',
        payload: key
    })
};

export const updateCurrEventTitle = title => {
    return dispatch => dispatch({
        type: 'UPDATE_TITLE',
        payload: title
    })
};

export const updateCurrEventDescription = description => {
    return dispatch => dispatch(
        {
        type: 'UPDATE_DESCRIPTION',
        payload: description
    })
};

export const addPropertyToCurrEvent = property => {
    return dispatch => dispatch({
            type: 'ADD_PROPERTY',
            payload: property
        });
};

export const removePropertyFromCurrEvent = property => {
    return dispatch => ({
        type: 'REMOVE_PROPERTY',
        payload: property
    })
};






