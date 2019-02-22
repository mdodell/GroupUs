import axios from 'axios';

export const receiveUser = (user) => {
    return {
        type: 'RECEIVE_USER',
        payload: {
            user
        }
    };
};

// export const checkIfUserIsAuthenticated = (isAuthenticated) => {
//     return {
//         type: 'AUTHENTICATE_USER',
//         payload: {
//             isAuthenticated
//         }
//     }
// };

export const fetchUser = () => {
    return dispatch => {
        return axios.get('http://localhost:3001/auth/getUser', {
            headers: {"Access-Control-Allow-Origin": "http://localhost:3001"},
            withCredentials: true
        }).then(json => dispatch(receiveUser(json.data)));
    };
};

// export const authenticateUser = () => {
//     return dispatch => {
//         return axios.get('http://localhost:3001/auth/isAuthenticated', {
//             headers: {"Access-Control-Allow-Origin": "http://localhost:3001"},
//             withCredentials: true
//         }).then(json => dispatch(checkIfUserIsAuthenticated(json.data)));
//     };
// };




