import { MongoClient } from "mongodb";
import {SECRET_MONGO_URL} from '$env/static/private'

const client = new MongoClient(SECRET_MONGO_URL);

export async function PUT({request}){
    const db = client.db('sesameOuvreToi').collection('users');

    const data = await request.json();

    const {"name" : username, "surname": familly, "enabled" : status} = data;

    const req = await db.updateOne({"name":username, "surname":familly},{$set:{"enabled":status}});

    const responseBody = JSON.stringify(req);

    return new Response(responseBody);
}