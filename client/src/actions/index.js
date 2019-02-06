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
        return axios.get('http://localhost:3001/auth/getUser', {headers: {"Access-Control-Allow-Origin": "*"}})
            .then(json => dispatch(receiveUser(json)));
    };
};




