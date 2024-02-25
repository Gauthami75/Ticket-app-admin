import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas', error);
  }
}
// Multer configuration for handling file uploads

export default async function handler(req, res) {
  await connectToDatabase()
 if(req.method === 'GET'){
  try {
    const db = client.db('ticketUpskill');
    const collection = db.collection('ticket');

    // Retrieve all data from the database
    const tickets = await collection.find({}).toArray();

    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    console.error('Error retrieving tickets:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve tickets' });
  } finally {
    await client.close();
  }
 }
};


