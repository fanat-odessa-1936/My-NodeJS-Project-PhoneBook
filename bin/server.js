const app = require('../app');
require("dotenv").config();

const { PORT = 5678 } = process.env;

app.listen(PORT, () => {
  console.log(`Database connection successful`)
});
