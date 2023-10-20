import mongoose from 'mongoose';

const dbURI = 'mongodb://localhost:27017/pageManagerDB';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB database...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export const closeDatabase = () => {
  mongoose.connection.close(() => {
    console.log('Disconnected from MongoDB');
  });
  process.on('SIGINT', () => {
    closeDatabase();
    process.exit();
  });
};
