import { MongoClient } from 'mongodb';
import { Collection, ObjectId } from "mongodb"; // Import ObjectId from the mongodb package

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
export default async function handler(req, res) {
    await connectToDatabase();
    const { id } = req.query;
     
    if (req.method === 'GET') {
      try {
        const db = client.db('ticketUpskill');
        const collection = db.collection('ticket');

        await collection.findOneAndUpdate(
            {_id: new ObjectId(id)}, 
            { $set: { status: 'RESOLVED' } }, 
          );
      res.status(200).json({ success: true, message: 'Ticket resolved successfully' });
    } catch (error) {
      console.error('Error retrieving or updating ticket:', error);
      res.status(500).json({ success: false, error: 'Failed to retrieve or update ticket' });
    } finally {
      await client.close();
    }
  }
}
