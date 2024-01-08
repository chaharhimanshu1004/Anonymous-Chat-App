
const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/UserRoute');
const channelRoute = require('./routes/channelRoute')
const PORT = process.env.PORT || 6001;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Running !!!');
});
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Db connection done")})
.catch((error)=>{console.log("Db connection Error")});

app.use('/api/users',userRoute);
app.use('/api/users',channelRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on : ${PORT}`);
})
