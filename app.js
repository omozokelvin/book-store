const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
// require('./src/db/sql');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.use((req, res, next) => {
  debug('my middleware');
  next();
});

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '/views/', 'index.html'));
  res.render(
    'index',
    {
      title: 'Library'
    }
  );
});

app.listen(port, () => {
  debug(`listening at port ${chalk.green(port)}`);
});
