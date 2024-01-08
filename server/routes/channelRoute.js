const express = require('express');
const router = express.Router();
const channelModel = require('../model/ChannelModel');
router.post('/new/channel',async(req,res)=>{
    try{
        const {channelName} = req.body;
        const existingChannel = await channelModel.findOne({ channelName });
        if (existingChannel) {
            return res.status(400).json({ error: 'Channel with this name already exists' });
        }
        const newChannel = new channelModel({
            channelName,
            conversation: [],
        });
        const savedChannel = await newChannel.save();
        res.status(201).json(savedChannel);
    }catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ error: 'Error while creating channel' });
    }
})
module.exports = router;