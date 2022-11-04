const app = require("./app");
const connectDB = require("./db/connect");

(async () => {
  try
  {
    await connectDB();
    app.listen(5000, console.log('Server is listening on port 5000'));
  }
  catch(error)
  {
    console.log(error);
  }
})();
