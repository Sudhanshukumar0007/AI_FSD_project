const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const { type } = require('node:os');

const signupSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            unique: true,
            required: true
        },
        password:{
            type: String,
            minLenngth: 6,
            required: true
        }
    }
    ,{
            timestamps: true
    }
)

const signup = mongoose.model('signup', signupSchema);
module.exports = signup;

