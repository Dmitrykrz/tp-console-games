import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.DATABASE_URL);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('consolegames');
    const collection = db.collection('consolegames');

    
    console.log('Afficher les jeux 3DS sortis');
    const games3DS = await collection.find({ Platform: '3DS' }).toArray();
    console.log(games3DS);
    console.log();

   
    console.log('Afficher les jeux 3DS sortis en 2011');
    const games3DS2011 = await collection.find({ 
      Platform: '3DS', 
      Year: '2011' 
    }).toArray();
    console.log(games3DS2011);
    console.log();

    
    console.log('Afficher le nom et le global_sales des jeux 3DS sortis en 2011');
    const nameAndSales = await collection.find(
      { Platform: '3DS', Year: '2011' },
      { projection: { Name: 1, Global_Sales: 1, _id: 0 } }
    ).toArray();
    console.log(nameAndSales);
    console.log();

    console.log('Afficher le nom et le global_sales des 3 jeux les plus vendus sur 3DS sortis en 2011');
    const top3Games = await collection.find(
      { Platform: '3DS', Year: '2011' },
      { projection: { Name: 1, Global_Sales: 1, _id: 0 } }
    )
    .sort({ Global_Sales: -1 })
    .limit(3)
    .toArray();
    console.log(top3Games);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

main();