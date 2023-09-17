import mongoose from 'mongoose';

// Define a schema for the "pages" collection
const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  meta_description: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true }, // Add the slug field
});


// Create a Mongoose model for the "pages" collection
const Page = mongoose.model('Page', pageSchema);

export default Page;
