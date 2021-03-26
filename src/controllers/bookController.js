const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:bookController');

const bookController = (bookService, nav) => {
  const getIndex = (req, res) => {
    // res.sendFile(path.join(__dirname, '/views/', 'index.html'));

    const url = 'mongodb://localhost"27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;

      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const collection = await db.collection('books');

        const books = await collection.find().toArray();

        res.render('bookListView', {
          nav,
          title: 'Library',
          books
        });
      } catch (error) {
        debug(error.stack);
      }

      client.close();
    }());
  };

  const getById = async (req, res) => {
    const { id } = req.params;

    const url = 'mongodb://localhost"27017';
    const dbName = 'libraryApp';

    let client;

    try {
      client = await MongoClient.connect(url);
      debug('Connected correctly to server');

      const db = client.db(dbName);

      const collection = await db.collection('books');

      const book = await collection.findOne({ _id: new ObjectId(id) });

      debug(book);

      book.details = await bookService.getBookById(book.bookId);

      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book
        }
      );
    } catch (error) {
      debug(error.stack);
    }
  };

  const middleware = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  };

  return {
    getIndex,
    getById,
    middleware
  };
};

module.exports = bookController;
