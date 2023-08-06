const mongoose =require('mongoose')

// Schema for user
const User = new mongoose.Schema(
    {
        first_name: { type: String, default: null },
        last_name: { type: String, default: null },
        email: { type: String, unique: true },
        password: { type: String },
        role:{type: String, default: 'user'},
        token: { type: String },
    },
    {collection : 'user-data'}
)
const model = mongoose.model('userData', User)
module.exports = model;