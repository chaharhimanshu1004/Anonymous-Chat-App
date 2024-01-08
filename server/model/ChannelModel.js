const mongoose = require('mongoose');
const channelSchema = new mongoose.Schema({
    channelName:String,
    conversation:[
        {
            message:String,
            timestamp:String,
            user:{
                name:String,
                photo:String,
                uid:String,
            }
        }
    ]
});

const conversations = mongoose.model('conversations', channelSchema);
module.exports = conversations;
