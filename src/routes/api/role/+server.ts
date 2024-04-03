import { MongoClient } from "mongodb";
import {SECRET_MONGO_URL} from '$env/static/private'

const client = new MongoClient(SECRET_MONGO_URL);

export async function POST({request}){
    const collection = client.db('sesameOuvreToi').collection('roles');

    const data = await request.json();

    const {"role": role, "buildings": buildings} = data;

    const req = await collection.insertOne({"role":role, "buildings":buildings});

    const responseBody = JSON.stringify(req);

    return new Response(responseBody);
}

export async function GET({request}){
    const collection = client.db('sesameOuvreToi').collection('roles');

    const roles = await collection.find().toArray();

    const responseBody = JSON.stringify(roles);

    return new Response(responseBody);
}

export async function DELETE({request}){
    const collection = client.db('sesameOuvreToi').collection('roles');

    const data = await request.json();

    const {"role": role} = data;

    const req = await collection.deleteOne({"role":role});

    const responseBody = JSON.stringify(req);

    return new Response(responseBody);
}