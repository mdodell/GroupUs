const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:3001' }));
    app.use(proxy('/auth/facebook', { target: 'http://localhost:3001' }));
    app.use(proxy('/auth/signup', { target: 'http://localhost:3001' }));
    app.use(proxy('/auth/login', { target: 'http://localhost:3001' }));
    app.use(proxy('/auth/logout', { target: 'http://localhost:3001' }));
};