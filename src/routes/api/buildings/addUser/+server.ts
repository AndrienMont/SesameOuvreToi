import { MongoClient } from "mongodb";
import {SECRET_MONGO_URL} from '$env/static/private'

const client = new MongoClient(SECRET_MONGO_URL);

export async function POST({request}){
    const collection = client.db('sesameOuvreToi').collection('buildings');
    const data = await request.json();
    const {"name": name, "user": user} = data;
    const req = await collection.updateOne({"name":name}, {$addToSet: {"users": user}});
    const responseBody = JSON.stringify(req);
    return new Response(responseBody);
}