import { MongoClient } from "mongodb";
import {SECRET_MONGO_URL} from '$env/static/private'

const client = new MongoClient(SECRET_MONGO_URL);

export async function GET({request}){
    const collection = client.db('sesameOuvreToi').collection('roles');

    const data = await request.json();

    const {"role": role} = data;

    const roles = await collection.findOne({"role":role});

    const responseBody = JSON.stringify(roles);

    return new Response(responseBody);
}