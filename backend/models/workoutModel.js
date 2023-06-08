const mongoose = require('mongoose')

//a function to create a new schema
const Schema = mongoose.Schema
// this creates a new schema for us the first arg describes how the object looks
// the second arg is a time stamp property. what this does is when a doc is created it lets us know whe the doc was created
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
      // this will reflect the id of the user who has added the workout
    // this is the first step for assigning the individual page and workout and all that you get it Gerald lol 
    // so basically every workout must be associated with a user 
  user_id: {
    type: String,
    required: true
  }
}, 
  // to get the created at feature
{ timestamps: true })
// now we are making a module based on the schema a module applies the schema to a particular model
// so we use that model to interact with a collection of that name
// creating a new model first arg name of the model second is the schema name
module.exports = mongoose.model('Workout', workoutSchema)