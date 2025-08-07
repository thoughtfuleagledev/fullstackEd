const express = require('express');
const morgan = require('morgan');
const app = express();

// Runs on every req:

// app.use(() => {
//     console.log('hey');
// });

app.use(morgan('tiny'));

// app.use((req, res) => {
//     console.log('middleware');
//     res.send('hijacked');
// })

// Remember send will cause the function to stop.
// It is not calling the next middleware.
// In order to do that:

// app.get('/', function(req, res, next) {
//     next();
// });

// You can use return to ensure nothing is called after calling next.

// app.get('/', function(req, res, next) {
//     return next();
//     console.log('will not log');
// });

// app.get('/', function(req, res, next) {
//     next();
//     console.log('will log after last next');
// });

// This will function similar to morgan:

app.use((req, res, next) => {

    // This would force all req to be GET:
    // req.method = 'GET';

    // Give access to all following routes to req.requestTime:
    req.requestTime = Date.now();

    console.log(req.method, req.path);
    next();
});

// This will only execute on ALL routes with a path that is /dogs:

// app.use('/dogs', (req, res, next) => {
//     console.log('I love dogs.');
//     next();
// });


// '/secret?food=chicken' will log { food: 'chicken' }:

// app.use((req, res, next) => {
//     console.log(req.query);
//     next();
// });

// This will only display pages when the query string is 'password=chickennugget': DON'T DO

// app.use((req, res, next) => {
//     const { password } = req.query;
//     if(password === 'chickennugget') {
//         next();
//     }
//     res.send('sorry, you need a password');
// });

// This will only display pages for route '/secret', when the query string is 'password=chickennugget':

// app.use((req, res, next) => {
//     if(req.path === '/secret') {
//     const { password } = req.query;
//         if(password === 'chickennugget') {
//         next();
//         }
//     }
//     res.send('sorry, you need a password');
// });

app.get('/', (req, res) => {
    console.log(`request date: ${req.requestTime}`);
    res.send('home page');
});

app.get('/dogs', (req, res) => {
    console.log(`request date: ${req.requestTime}`);
    res.send('woof');
});

// Best practices suggest using environment variables, secure code repositories, etc..
// Hardcoding passwords is a bad practice. DON'T DO
// You can create a function to verify password: PLACE ABOVE ROUTE(S)

const verifyPass = (req, res, next) => {
    const { password } = req.query;
    if(password === 'chickennugget') {
        next();
    }
    res.send('sorry, you need a password');
};

// And put it in the route (verifyPass is the defined middleware):

app.get('/secret', verifyPass, (req, res) => {
    res.send('secret');
});

// Will send back 'not found' if nothing else was sent, because other routes with send prevent execution:

app.use((req, res, next) => {
    res.status(404).send('not found');
});

app.listen(3000, () => {
    console.log('running on localhost 3000');
});