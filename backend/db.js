const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 20
    },
    password_hash: {
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true, 
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    lastName:{
        type: String,
        required: true, 
        trim: true,
        minLength: 3,
        maxLength: 20
    },
});

userSchema.methods.createHash = async function (password) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password_hash);
};

const User =  mongoose.model('User', userSchema);


const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    balance:{
        type: Number,
        required: true,
        default: 0
    }
    });

const Account =  mongoose.model('Account', accountSchema);

module.exports = {User,Account};  