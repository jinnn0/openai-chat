import { config } from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './db/connections.js';
config();

const PORT = process.env.PORT || 3000;

// Connections and listeners
connectToDatabase()
  .then(() => {
    // Only open the server when we connect to database
    app.listen(PORT, () => {
      console.log('Server is open and app is connected to database');
    });
  })
  .catch((err) => console.log(err));
