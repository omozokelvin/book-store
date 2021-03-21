const express = require('express');

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
      // res.sendFile(path.join(__dirname, '/views/', 'index.html'));
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books
        }
      );
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;

      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        }
      );
    });

  return bookRouter;
}

module.exports = router;
