const mongoose = require('mongoose')


const campgroundSchema = new mongoose.Schema({
    'name': String,
    'image': String,
    'price':Number,
    'description':String,
    'author':{
        'id':{
           type:mongoose.Schema.Types.ObjectId,
           ref:'user'
        },
        'username':String
  
     },
    'comment':[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"comment"
        }
    ]
})
module.exports = mongoose.model('campground', campgroundSchema)