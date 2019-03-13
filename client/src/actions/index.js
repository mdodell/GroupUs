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

export const fetchUserAndEvents = () => {
    return dispatch => {
        dispatch(fetchUserBegin());
        return axios.get('http://localhost:3001/auth/getUser', {
            headers: {"Access-Control-Allow-Origin": "http://localhost:3001"},
            withCredentials: true
        }
        ).then(json => {
            if(json.data === ""){
                dispatch(fetchUserFailure(true))
            } else {
                dispatch(fetchUserSuccess(json.data));
                (json.data.events).forEach(event =>
                    axios.get('http://localhost:3001/event/getEvent', {
                        params: {
                            id: event
                        }
                    }).then(eventRes => dispatch(addEvent(eventRes.data))).catch(err => console.log(err)));
            }
            return json.data;
        }).catch(error => dispatch(fetchUserFailure(error)));
    }
};

export const addEvent = newEvent => {
    return {
        type: 'ADD_EVENT',
        payload: {
            newEvent
        }
    }
};

export const createEvent = () => {
    return dispatch => {
        return axios.get('http://localhost:3000/event/createEvent', {
            headers: {"Access-Control-Allow-Origin": "http://localhost:3000"},
            withCredentials: true
        }).then(json => dispatch(addEvent(json.data)));
    };
};





