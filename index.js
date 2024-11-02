import dotenv from 'dotenv';
dotenv.config();
// import 'dotenv/config'; // For ES6 modules
import connectDB from './src/db/index.js';
import { app } from './src/app.js';



connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
