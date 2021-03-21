const sql = require('mssql');
const debug = require('debug')('app: sql');

const config = {
  user: 'omozokelvin',
  password: 'Manchester@7',
  server: 'omozokelvinlibray.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'PSLibrary',

  options: {
    // encrypt: true, // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch((err) => debug(err));
