
const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Pusher = require("pusher");
const userRoute = require('./routes/UserRoute');
const channelRoute = require('./routes/channelRoute')
const PORT = process.env.PORT || 6001;
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
    appId: "1740143",
    key: "a67ee38d224d6d46bad7",
    secret: "b07287c208ef31b5096f",
    cluster: "ap2",
    useTLS: true
});

app.get('/', (req, res) => {
    res.send('Running !!!');
});
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Db connection done")})
.catch((error)=>{console.log("Db connection Error")});
mongoose.connection.once('open',()=>{
    console.log('Db is connected');
    const changeStream = mongoose.connection.collection('conversations').watch();
    changeStream.on('change',(change)=>{
        if(change.operationType==='insert'){
            pusher.trigger('channels','newChannel',{
                'change':change
            });
        }else if(change.operationType==='update'){
            pusher.trigger('conversation','newMessage',{
                'change':change
            });
        }else{
            console.log('Error Triggering Pusher');
        }

    })
})

app.use('/api/users',userRoute);
app.use('/api/users',channelRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on : ${PORT}`);
})
