const data = require('../data/posts.json');
const { connect } = require('./mongo');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'posts';


async function collection() {
    const client = await connect();
    return client.db('fittrack').collection(COLLECTION_NAME);
}

async function getPosts() {
    const db = await collection();
    const data = await db.find().toArray()
    return { 
        total: data.length, 
        limit: data.length, 
        posts: data };
}

async function getPost(id) {
    const db = await collection();
    const data = await db.findOne({ _id: new ObjectId(id) })
    return data;
}

async function searchPosts(q) {
    const db = await collection();
    const data = await db.find({ username: {$regex: q, $options: 'i'} }).toArray();
    return { total: data.length, limit: data.length, posts: data };
}

async function addPost(post) {
    const db = await collection();
    const result = await db.insertOne(post)
    return result;
}

async function updatePost(id, post){
    const db = await collection();
    delete post._id;
    const result = await db.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: post },
        { returnDocument: 'after' })
    return result.value;
}

async function deletePost(id) {
    const db = await collection();
    const result = await db.deleteOne({ _id: new ObjectId(id) })
    return result;
}

async function getTag() {
    const db = await collection();
    const data = await db.distinct('postTag')
    return data;
}

async function getUsername() {
    const db = await collection();
    const data = await db.distinct('username')
    return data;
}

async function seed() {
    const db = await collection();
    db.insertMany(data.posts);
    return 'Seed successful!';
}

module.exports = {
    COLLECTION_NAME,
    collection,
    getPosts,
    getPost,
    searchPosts,
    addPost,
    updatePost,
    deletePost,
    getTag,
    getUsername,
    seed
};