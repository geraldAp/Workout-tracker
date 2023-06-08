const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// hashing the passwords before saving them to the database

// static signup method
// to create this we take the already made schema and add a property called static
// this to mean the Model name 
// using the this keyword we cannot use arrow functions but a reqular one 
userSchema.statics.signup = async function(email, password) {

  // validation
    // 1)checking to see if we do not have a value for email and password
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  // if not valid 
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
    // if not strong 
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }
 // bcrypt forces as to use something called salt 
  // salt is a random string of characters added to a users password before it gets hashed 

  // generating the salt the argument is  number of rounds or cost of the salt the higher the number the longer it takes for hackers to crack it same with it being longer to sign up the user
  const salt = await bcrypt.genSalt(10)   //10 is th default value 
  const hash = await bcrypt.hash(password, salt)  // creating the hash that takes two argument the password and the salt 

  const user = await this.create({ email, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }
// trying to find the user in that data base with the email provided 
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }
// comparing the password hashes to enable login 
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)