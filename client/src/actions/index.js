import axios from 'axios';

export const receiveUser = (user) => {
    return {
        type: 'RECEIVE_USER',
        payload: {
            user
        }
    };
};

export const fetchUser = () => {
    return dispatch => {
        return axios.get('http://localhost:3001/auth/getUser', {
            headers: {"Access-Control-Allow-Origin": "http://localhost:3001"},
            withCredentials: true
        }).then(json => dispatch(receiveUser(json.data)));
    };
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





