import { MongoClient } from "mongodb";
import {SECRET_MONGO_URL} from '$env/static/private'

const client = new MongoClient(SECRET_MONGO_URL);

export async function POST({request}){
    const collection = client.db('sesameOuvreToi').collection('buildings');

    const data = await request.json();

    const {"name": name} = data;

    const req = await collection.insertOne({"name":name});

    const responseBody = JSON.stringify(req);

    return new Response(responseBody);
}

export async function GET({request}){
    const collection = client.db('sesameOuvreToi').collection('buildings');

    const buildings = await collection.find().toArray();

    return new Response(JSON.stringify(buildings));
}


export async function DELETE({request}){
    const collection = client.db('sesameOuvreToi').collection('buildings');

    const data = await request.json();

    const {"name" : name} = data;
    console.log(name);

    const req = await collection.deleteOne({"name":name});

    const responseBody = JSON.stringify(req);

    return new Response(responseBody);
}