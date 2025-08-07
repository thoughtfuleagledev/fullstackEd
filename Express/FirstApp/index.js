const express = require('express');
const app = express();
const port = 3000;

// listens for requests
app.listen(port, () => {
    console.log('listening on port 3000');

});

// runs any time we get an incoming request
// any time we call res.send we are done for that one req
// 
// app.use((req, res) => {
//     console.log('we got a new request')
    // res.send('hello, we got your request')
    // res.send({color: 'red'})
    // res.send('<h1>This is my web page.</h1>')
// });

// routing
app.get('/', (req, res) => {
    res.send('this is the home page')
})

app.get('/cats', (req, res) => {
    res.send('meow');
});

app.get('/dogs', (req, res) => {
    res.send('woof');
});

app.post('/cats', (req, res) => {
    res.send('post req to /cats')
})

// define a generic pattern
// /r/somethinghere
// use a colon to designate something as a path variable

// any path beginning with /r/ will result in 'this is a subreddit.'
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit.`)
});

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing post ID: ${postId} of the ${subreddit} subreddit.`)
});

app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('Nothing searched.');
    }
    res.send(`<h1>Search results for ${q}:</h1>`);
});

app.get(/(.*)/, (req, res) => {
// '*' returned an error in Node, so I replaced with /(.*)/
// needs to be listed last, or it will not work for following gets
    res.send('i don\'t know that route or path.');
})
