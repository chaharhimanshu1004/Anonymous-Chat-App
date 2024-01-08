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
});
router.get('/get/channelList',async(req,res)=>{
    try{
        const channels = await channelModel.find({}, '_id channelName'); // it will be an array
        res.json(channels);
    }catch (error) {
        console.error('Error getting channelList:', error);
        res.status(500).json({ error: 'Error while getting channelList' });
    }
});

router.post('/addMessage',async(req,res)=>{
    try{
        const channelId = req.query.id;
        const { message, timestamp, user } = req.body;
        const updatedChannel = await channelModel.findByIdAndUpdate(
            channelId,
            {
              $push: {
                conversation: {
                  message,
                  timestamp,
                  user,
                },
              },
            },
            { new: true } // Return the modified document
          );
      
          if (!updatedChannel) {
            return res.status(404).json({ error: 'Channel not found' });
          }
      
          res.json(updatedChannel);
    }catch(err){
        console.error('Error adding the Message in the Channel:', error);
        res.status(500).json({ error: 'Error adding the message' });
    }
});

router.get('/allData',async(req,res)=>{
    try{
        const data = await channelModel.find();
        res.json(data);

    }catch(err){
        console.error('Error fetching the data:', error);
        res.status(500).json({ error: 'Error fetching the data' });
    }
});

router.get('/get/conversation',async(req,res)=>{
    try{
        const channelId = req.query.id;
        const channel = await channelModel.findById(channelId, 'conversation');
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' });
        }
        res.json(channel.conversation);
    }catch(err){
        console.error('Error fetching the conversations:', error);
        res.status(500).json({ error: 'Error fetching the conversations' });
    }
})



module.exports = router;