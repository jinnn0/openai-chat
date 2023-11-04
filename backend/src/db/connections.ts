import { connect, disconnect } from 'mongoose';

const connectToDatabase = async () => {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log('ERROR => ', error);
    throw new Error('Could not connect to MongoDB');
  }
};

const disconnectFromDatabase = async () => {
  try {
    await disconnect();
  } catch (error) {
    console.log('ERROR => ', error);
    throw new Error('Could not disconnect from MongoDB');
  }
};

export { connectToDatabase, disconnectFromDatabase };
