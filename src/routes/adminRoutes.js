const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genres: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false
  },
  {
    title: 'Les Miserables',
    genres: 'Historical Fiction',
    author: 'Victor Nugo',
    bookId: 24280,
    read: false
  },
  {
    title: 'The Time Machine',
    genres: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genres: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genres: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost"27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);

          const db = client.db(dbName);

          const response = await db.collection('books')
            .insertMany(books);

          res.json(response);

          debug('connected correctly to the server');
        } catch (error) {
          debug(error.stack);
        }

        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
