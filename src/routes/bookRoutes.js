const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app: bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genres: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    },
    {
      title: 'Les Miserables',
      genres: 'Historical Fiction',
      author: 'Victor Nugo',
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

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from books');

        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books: recordset
          }
        );
      }());
    });

  bookRouter.route('/:id')
    .all(async (req, res, next) => {
      const { id } = req.params;
      const request = new sql.Request();

      const { recordset } = await request
        .input('id', sql.Int, id)
        .query('select * from books where id = @id');

      [req.book] = recordset;
      next();
    }).get((req, res) => {
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: req.book
        }
      );
    });

  return bookRouter;
}

module.exports = router;
