const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name']
    },
    email:{
        type: String,
        required: [true, 'Please enter a email'],
        unique: [true, 'Duplicate'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password should be at least 6 characters long']
    }
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if(user){
        const isAuthenticated = await bcrypt.compare(password, user.password)
        if(isAuthenticated){
            return user
        }
        throw Error('incorrect password')
    }else{
        throw Error('incorrect email')
    }
}

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next()
})

const User = mongoose.model('user', userSchema)
module.exports = User