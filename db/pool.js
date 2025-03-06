const { Pool } = require("pg");
require("dotenv").config();

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: process.env.HOST,
  ssl: {
    rejectUnauthorized: false,
  },
});
