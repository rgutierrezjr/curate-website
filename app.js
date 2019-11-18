const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mustache = require('mustache-express');

const indexRouter = require('./routes/index');

const port = process.env.PORT || 3000;
const app = express();

app.engine('html', mustache());
app.set('view engine', 'html')
app.set('views', __dirname + '/views')
app.use('/css', express.static('/public/css'))
app.use('/js', express.static('/public/js'))
app.use('/lib', express.static('/public/lib'))
app.use('/img', express.static('/public/img'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(port, () => {
    console.log("Server started at http://localhost:%s", port);
});
