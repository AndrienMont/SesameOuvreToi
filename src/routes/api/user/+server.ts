import { MongoClient } from "mongodb";
import {SECRET_MONGO_URL} from '$env/static/private'

const client = new MongoClient(SECRET_MONGO_URL);

export async function POST({request}){

    const db = client.db('sesameOuvreToi').collection('users');

    const {username, identifiant, buildings} = request.body;

    
}



export async function GET({request}){
    const db = client.db('sesameOuvreToi').collection('users');
}