import { MongoClient } from "mongodb";
import {SECRET_MONGO_URL} from '$env/static/private'

const client = new MongoClient(SECRET_MONGO_URL);

export async function POST({request}){

    const db = client.db('sesameOuvreToi').collection('users');

    const data = await request.json();

    const {"name" : username, "uid" : identifiant, "role": role} = data;

    const req = await db.insertOne({"username":username, "identifiant":identifiant, "role":role});

    const responseBody = JSON.stringify(req);

    return new Response(responseBody);
}



export async function GET({request}){
    const db = client.db('sesameOuvreToi').collection('users');

    const users = await db.find().toArray();

    return new Response(JSON.stringify(users));
}