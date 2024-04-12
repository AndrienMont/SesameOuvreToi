import { MongoClient } from "mongodb";
import {SECRET_MONGO_URL} from '$env/static/private'

const client = new MongoClient(SECRET_MONGO_URL);

export async function POST({request}){
    const collection = client.db('sesameOuvreToi').collection('buildings');
    const data = await request.json();
    const {"name": name, "user": userDelete} = data;
    const req = await collection.updateOne({name}, {$pull: {users: userDelete}});
    const responseBody = JSON.stringify(req);
    return new Response(responseBody);
}

export async function DELETE({request}){
    const collection = client.db('sesameOuvreToi').collection('buildings');
    const url = new URL(request.url);
    const userDelete = url.searchParams.get('user');
    const building = url.searchParams.get('building');
    const req = await collection.find({name: building}).toArray();
    const users = req[0].users;
    const newUsers : any[] = []; 
    users.forEach(user => {
        if(user.name !== userDelete){
            newUsers.push(user);
        }
    });
    const req2 = await collection.updateOne({name: building}, {$set: {users: newUsers}});

    const responseBody = JSON.stringify(req);
    return new Response(responseBody);
}