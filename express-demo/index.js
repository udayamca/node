const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const courses = require('./routes/courses');

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

const app = express();

console.log('Node environment: ' + process.env.NODE_ENV);
console.log('Express environment: ' + app.get('env'));
if (app.get('env') === 'production') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use('/api/courses', courses);

// app.use(function (req, res, next) {
//     console.log('Logging...');
//     next();
// });

app.use(function (req, res, next) {
    console.log('Authenticating...');
    next();
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Express Demo', message: 'Hello, World!' });
} );


app.use('/api', (req, res) => {
    res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`);
});



// PORT
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
